export type AvatarCrop = {
  offsetX: number;
  offsetY: number;
  zoom: number;
};

export const avatarOutputSize = 256;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image file."));
    reader.readAsDataURL(file);
  });
}

export function loadImageSource(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load avatar image."));
    image.src = source;
  });
}

export async function cropAvatarImage(source: string, crop: AvatarCrop) {
  const image = await loadImageSource(source);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create avatar crop canvas.");
  }

  const zoom = clamp(crop.zoom, 1, 3);
  const baseSize = Math.min(image.naturalWidth, image.naturalHeight);
  const cropSize = baseSize / zoom;
  const maxOffsetX = Math.max(0, (image.naturalWidth - cropSize) / 2);
  const maxOffsetY = Math.max(0, (image.naturalHeight - cropSize) / 2);
  const centerX = image.naturalWidth / 2 + clamp(crop.offsetX, -1, 1) * maxOffsetX;
  const centerY = image.naturalHeight / 2 + clamp(crop.offsetY, -1, 1) * maxOffsetY;
  const sourceX = clamp(centerX - cropSize / 2, 0, image.naturalWidth - cropSize);
  const sourceY = clamp(centerY - cropSize / 2, 0, image.naturalHeight - cropSize);

  canvas.width = avatarOutputSize;
  canvas.height = avatarOutputSize;
  context.clearRect(0, 0, avatarOutputSize, avatarOutputSize);
  context.drawImage(
    image,
    sourceX,
    sourceY,
    cropSize,
    cropSize,
    0,
    0,
    avatarOutputSize,
    avatarOutputSize,
  );

  return canvas.toDataURL("image/png");
}
