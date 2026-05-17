import { loadImageSource } from "@/lib/avatar/cropImage";
import { getAvatar } from "@/lib/mockups/avatars";
import { getCommentColorTheme } from "@/lib/mockups/commentColors";
import type { MockupAuthor, MockupData } from "@/lib/mockups/types";

type ExportOptions = {
  data: MockupData;
  fileName: string;
  watermarkText: string;
  target: HTMLElement | null;
  scale?: number;
};

type ExportAssetAudit = {
  localImages: string[];
  remoteBackgrounds: string[];
  remoteImages: string[];
};

type ReplyLayoutMetrics = {
  authorHandle: string;
  authorLabel: string;
  textLines: string[];
};

type LayoutMetrics = {
  actionX: number;
  avatarSize: number;
  cardHeight: number;
  commentLines: string[];
  contentWidth: number;
  contentX: number;
  replies: ReplyLayoutMetrics[];
  title: string;
};

type DrawCardOptions = {
  mainAvatarImage?: HTMLImageElement;
  replyAvatarImages: Record<string, HTMLImageElement | undefined>;
  watermarkLogoImage?: HTMLImageElement;
};

const exportPadding = 28;
const maxCardWidth = 560;
const minCardWidth = 360;
const cardPadding = 20;
const columnGap = 12;
const actionColumnWidth = 24;

const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

function getVisibleReplies(data: MockupData) {
  return data.replies.filter((reply) => reply.text.trim().length > 0);
}

async function waitForFonts() {
  if ("fonts" in document) {
    await document.fonts.ready;
  }
}

async function waitForImages(element: HTMLElement) {
  const images = Array.from(element.querySelectorAll("img"));

  await Promise.all(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) {
        return Promise.resolve();
      }

      const waitForLoad = () =>
        new Promise<void>((resolve, reject) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => reject(), { once: true });
        });

      return image.decode().catch(() => {
        if (image.complete && image.naturalWidth > 0) {
          return;
        }

        return waitForLoad();
      });
    }),
  );
}

function isRemoteUrl(value: string) {
  return /^https?:\/\//i.test(value) || /^\/\//.test(value);
}

function auditExportAssets(element: HTMLElement): ExportAssetAudit {
  const audit: ExportAssetAudit = {
    remoteImages: [],
    remoteBackgrounds: [],
    localImages: [],
  };

  element.querySelectorAll("img").forEach((image) => {
    const source = image.currentSrc || image.src;

    if (!source) {
      return;
    }

    if (isRemoteUrl(source) && !source.startsWith(window.location.origin)) {
      audit.remoteImages.push(source);
      return;
    }

    audit.localImages.push(source);
  });

  element.querySelectorAll<HTMLElement>("*").forEach((node) => {
    const backgroundImage = window.getComputedStyle(node).backgroundImage;

    if (!backgroundImage || backgroundImage === "none") {
      return;
    }

    for (const match of backgroundImage.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
      const source = match[1];

      if (isRemoteUrl(source) && !source.startsWith(window.location.origin)) {
        audit.remoteBackgrounds.push(source);
      }
    }
  });

  return audit;
}

async function waitForExportReady(element: HTMLElement | null) {
  if (!element) {
    throw new Error("Export target is missing.");
  }

  await nextFrame();
  await waitForFonts();
  await waitForImages(element);
  await nextFrame();

  const rect = element.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) {
    throw new Error(
      `Export target has invalid dimensions: ${rect.width}x${rect.height}.`,
    );
  }

  const audit = auditExportAssets(element);
  console.info("PNG export asset audit", audit);

  if (audit.remoteImages.length || audit.remoteBackgrounds.length) {
    throw new Error(
      `Export target contains remote assets: ${[
        ...audit.remoteImages,
        ...audit.remoteBackgrounds,
      ].join(", ")}`,
    );
  }
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  try {
    anchor.href = url;
    anchor.download = fileName;
    anchor.rel = "noopener";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
  } finally {
    anchor.remove();
    URL.revokeObjectURL(url);
  }
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(x + width, y + height, x, y + height, safeRadius);
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + safeRadius, y, safeRadius);
  context.closePath();
}

function drawAvatar(
  context: CanvasRenderingContext2D,
  author: MockupAuthor,
  x: number,
  y: number,
  size: number,
  avatarImage?: HTMLImageElement,
) {
  if (avatarImage) {
    context.save();
    context.beginPath();
    context.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    context.clip();
    context.drawImage(avatarImage, x, y, size, size);
    context.restore();
    return;
  }

  const avatar = getAvatar(author.avatarPresetId ?? "avatar-01");
  const gradient = context.createLinearGradient(x, y, x + size, y + size);
  gradient.addColorStop(0, avatar.colors[0]);
  gradient.addColorStop(0.55, avatar.colors[1]);
  gradient.addColorStop(1, avatar.colors[2]);

  context.save();
  context.beginPath();
  context.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  context.clip();
  context.fillStyle = gradient;
  context.fillRect(x, y, size, size);
  context.restore();

  context.fillStyle = "#ffffff";
  context.font = avatar.symbol
    ? `${Math.round(size * 0.52)}px "Apple Color Emoji", "Segoe UI Emoji", Arial, sans-serif`
    : `800 ${Math.round(size * 0.34)}px Arial, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(
    avatar.symbol ?? avatar.initials,
    x + size / 2,
    y + size / 2 + (avatar.symbol ? 1.5 : 1),
  );
  context.textAlign = "left";
  context.textBaseline = "top";
}

function drawVerifiedBadge(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  context.fillStyle = "#38bdf8";
  context.beginPath();
  context.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#ffffff";
  context.font = `800 ${Math.round(size * 0.7)}px Arial, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("✓", x + size / 2, y + size / 2 + 1);
  context.textAlign = "left";
  context.textBaseline = "top";
}

function ellipsize(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  if (context.measureText(text).width <= maxWidth) {
    return text;
  }

  let next = text;

  while (next.length > 1 && context.measureText(`${next}…`).width > maxWidth) {
    next = next.slice(0, -1);
  }

  return `${next}…`;
}

function splitLongWord(
  context: CanvasRenderingContext2D,
  word: string,
  maxWidth: number,
) {
  const chunks: string[] = [];
  let chunk = "";

  for (const char of word) {
    const testChunk = `${chunk}${char}`;

    if (context.measureText(testChunk).width <= maxWidth || !chunk) {
      chunk = testChunk;
      continue;
    }

    chunks.push(chunk);
    chunk = char;
  }

  if (chunk) {
    chunks.push(chunk);
  }

  return chunks;
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const parts =
      context.measureText(word).width > maxWidth
        ? splitLongWord(context, word, maxWidth)
        : [word];

    parts.forEach((part) => {
      const testLine = line ? `${line} ${part}` : part;

      if (context.measureText(testLine).width <= maxWidth || !line) {
        line = testLine;
        return;
      }

      lines.push(line);
      line = part;
    });
  });

  if (line) {
    lines.push(line);
  }

  return lines.length ? lines : [""];
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
) {
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * lineHeight);
  });

  return lines.length * lineHeight;
}

function formatLikes(likes: number) {
  if (likes >= 1000) {
    return `${(likes / 1000).toFixed(1).replace(".0", "")}K`;
  }

  return likes.toString();
}

function measureLayout(
  context: CanvasRenderingContext2D,
  data: MockupData,
  cardWidth: number,
): LayoutMetrics {
  const avatarSize = data.platform === "tiktok" ? 56 : 44;
  const contentX = cardPadding + avatarSize + columnGap;
  const actionX = cardWidth - cardPadding - actionColumnWidth;
  const contentWidth = actionX - columnGap - contentX;
  const badgeReserve = data.verified ? 24 : 0;
  const titleSource =
    data.platform === "tiktok" ? data.mainAuthor.name : data.mainAuthor.handle;

  context.font = "700 16px Arial, sans-serif";
  const title = ellipsize(context, titleSource, contentWidth - badgeReserve);

  context.font = "400 15px Arial, sans-serif";
  const commentLines = wrapText(context, data.mainText, contentWidth);

  const replies = getVisibleReplies(data).map((reply) => {
    const authorLabel =
      data.platform === "tiktok" ? reply.author.name : reply.author.name;
    const authorHandle = `@${reply.author.handle}`;

    context.font = "700 14px Arial, sans-serif";
    const titleWidth = data.platform === "tiktok" ? contentWidth - 44 : contentWidth - 44;
    const replyTitle = ellipsize(context, authorLabel, titleWidth);

    context.font = "400 14px Arial, sans-serif";
    const textWidth = contentWidth - 44;
    const textLines = wrapText(context, reply.text, textWidth);

    return {
      authorHandle,
      authorLabel: replyTitle,
      textLines,
    };
  });

  const titleBlockHeight = data.platform === "tiktok" ? 38 : 38;
  const commentBlockHeight = commentLines.length * 22;
  const metaBlockHeight = 18;
  const repliesBlockHeight = replies.reduce((total, reply) => {
    return total + 16 + 16 + reply.textLines.length * 20 + 14;
  }, 0);
  const contentHeight =
    titleBlockHeight + 4 + commentBlockHeight + 10 + metaBlockHeight + repliesBlockHeight;

  return {
    actionX,
    avatarSize,
    cardHeight: cardPadding * 2 + Math.max(avatarSize, contentHeight),
    commentLines,
    contentWidth,
    contentX,
    replies,
    title,
  };
}

function drawCard(
  context: CanvasRenderingContext2D,
  data: MockupData,
  _watermarkText: string,
  x: number,
  y: number,
  cardWidth: number,
  options: DrawCardOptions,
) {
  const theme = getCommentColorTheme(data.colorPreset);
  const layout = measureLayout(context, data, cardWidth);
  const radius = data.platform === "tiktok" ? 28 : 24;
  const cardHeight = layout.cardHeight;

  context.save();
  context.shadowColor = "rgba(0, 0, 0, 0.28)";
  context.shadowBlur = 24;
  context.shadowOffsetY = 14;
  roundRect(context, x, y, cardWidth, cardHeight, radius);
  context.fillStyle = theme.background;
  context.fill();
  context.restore();

  context.lineWidth = 1;
  context.strokeStyle = theme.border;
  roundRect(context, x, y, cardWidth, cardHeight, radius);
  context.stroke();

  drawAvatar(
    context,
    data.mainAuthor,
    x + cardPadding,
    y + cardPadding,
    layout.avatarSize,
    options.mainAvatarImage,
  );

  let cursorY = y + cardPadding;
  const contentX = x + layout.contentX;
  const actionX = x + layout.actionX;

  context.textBaseline = "top";
  context.textAlign = "left";
  context.fillStyle = theme.text;
  context.font = "700 16px Arial, sans-serif";
  context.fillText(layout.title, contentX, cursorY);

  if (data.verified) {
    const titleWidth = Math.min(
      context.measureText(layout.title).width,
      layout.contentWidth - 24,
    );
    drawVerifiedBadge(context, contentX + titleWidth + 6, cursorY + 2, 16);
  }

  cursorY += 20;
  context.fillStyle = theme.muted;
  context.font = "400 12px Arial, sans-serif";
  context.fillText(`@${data.mainAuthor.handle}`, contentX, cursorY);

  cursorY += 18;
  context.fillStyle = theme.text;
  context.font = "400 15px Arial, sans-serif";
  cursorY += drawWrappedText(context, layout.commentLines, contentX, cursorY, 22);

  cursorY += 10;
  context.fillStyle = theme.muted;
  context.font = "600 12px Arial, sans-serif";
  const meta =
    data.platform === "tiktok"
      ? `${data.timestamp}    Reply    ${formatLikes(data.likes)}`
      : `${data.timestamp}    ${data.likes} likes    Reply`;
  context.fillText(ellipsize(context, meta, layout.contentWidth), contentX, cursorY);

  if (layout.replies.length) {
    cursorY += 24;

    layout.replies.forEach((replyLayout, index) => {
      const reply = getVisibleReplies(data)[index];
      const avatarY = cursorY;
      const replyX = contentX + (data.platform === "tiktok" ? 12 : 0);
      const replyContentX = replyX + 44;

      if (data.platform === "tiktok") {
        context.strokeStyle = theme.border;
        context.beginPath();
        context.moveTo(contentX, avatarY);
        context.lineTo(
          contentX,
          avatarY + 16 + 16 + replyLayout.textLines.length * 20 + 6,
        );
        context.stroke();
      }

      drawAvatar(
        context,
        reply.author,
        replyX,
        avatarY,
        32,
        options.replyAvatarImages[reply.id],
      );

      context.fillStyle = data.platform === "tiktok" ? theme.muted : theme.text;
      context.font = "700 14px Arial, sans-serif";
      context.fillText(replyLayout.authorLabel, replyContentX, avatarY);

      context.fillStyle = theme.muted;
      context.font = "400 12px Arial, sans-serif";
      context.fillText(replyLayout.authorHandle, replyContentX, avatarY + 16);

      context.fillStyle = theme.text;
      context.font = "400 14px Arial, sans-serif";
      drawWrappedText(context, replyLayout.textLines, replyContentX, avatarY + 34, 20);

      cursorY =
        avatarY + 34 + replyLayout.textLines.length * 20 + 14;
    });
  }

  context.fillStyle = theme.muted;
  context.font = "400 22px Arial, sans-serif";
  context.textAlign = "right";
  context.fillText("♡", actionX + actionColumnWidth, y + cardPadding + 2);
  context.textAlign = "left";

  if (data.accountState === "anonymous" && data.showWatermark && options.watermarkLogoImage) {
    const watermarkSize = 16;
    const watermarkX = x + cardWidth - watermarkSize - 12;
    const watermarkY = y + cardHeight - watermarkSize - 10;
    context.save();
    context.globalAlpha = 0.58;
    context.drawImage(
      options.watermarkLogoImage,
      watermarkX,
      watermarkY,
      watermarkSize,
      watermarkSize,
    );
    context.restore();
  }

  return cardHeight;
}

async function loadAuthorAvatarImage(author: MockupAuthor) {
  const source =
    author.avatarType === "uploaded"
      ? author.avatarUrl
      : author.avatarPresetUrl ??
        getAvatar(author.avatarPresetId ?? "avatar-01").imageSrc;

  if (!source) {
    return undefined;
  }

  try {
    return await loadImageSource(source);
  } catch (error) {
    console.error("Avatar image could not be loaded for export", {
      error,
      source,
    });
    return undefined;
  }
}

export async function exportElementToPng({
  data,
  fileName,
  scale = 2,
  target,
  watermarkText,
}: ExportOptions) {
  await waitForExportReady(target);

  if (!target) {
    throw new Error("Export target is missing.");
  }

  const rect = target.getBoundingClientRect();
  const cardWidth = Math.min(
    maxCardWidth,
    Math.max(minCardWidth, Math.round(rect.width)),
  );
  const measureCanvas = document.createElement("canvas");
  const measureContext = measureCanvas.getContext("2d");

  if (!measureContext) {
    throw new Error("Could not create canvas context.");
  }

  const cardHeight = measureLayout(measureContext, data, cardWidth).cardHeight;
  const mainAvatarImage = await loadAuthorAvatarImage(data.mainAuthor);
  const watermarkLogoImage = await loadImageSource("/assets/icons/commentra-logo.svg").catch(
    (error) => {
      console.error("Watermark logo could not be loaded for export", error);
      return undefined;
    },
  );
  const visibleReplies = getVisibleReplies(data);
  const replyAvatarEntries = await Promise.all(
    visibleReplies.map(async (reply) => [reply.id, await loadAuthorAvatarImage(reply.author)] as const),
  );
  const replyAvatarImages = Object.fromEntries(replyAvatarEntries);

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil((cardWidth + exportPadding * 2) * scale);
  canvas.height = Math.ceil((cardHeight + exportPadding * 2) * scale);

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create canvas context.");
  }

  context.scale(scale, scale);
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCard(context, data, watermarkText, exportPadding, exportPadding, cardWidth, {
    mainAvatarImage,
    replyAvatarImages,
    watermarkLogoImage,
  });

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (!result) {
        reject(new Error("Could not create PNG blob."));
        return;
      }

      resolve(result);
    }, "image/png");
  });

  downloadBlob(blob, fileName);
}
