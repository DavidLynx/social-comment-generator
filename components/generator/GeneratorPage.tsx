"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { MockupData, Platform } from "@/lib/mockups/types";
import { createMockupId, defaultMockup } from "@/lib/mockups/defaults";
import { normalizeMockupData } from "@/lib/mockups/normalizeMockup";
import { getUsageLimit } from "@/lib/usage/limits";
import { incrementAnonymousUsage, readAnonymousUsage } from "@/lib/usage/localUsage";
import type { AuthSession } from "@/lib/auth/types";
import {
  clearRecentMockups,
  readRecentMockups,
  writeRecentMockup,
} from "@/lib/storage/recentMockups";
import { exportElementToPng } from "@/lib/export/exportToPng";
import { mockupExportTargetId } from "@/lib/export/exportTarget";
import { Button } from "@/components/ui/Button";
import { PlatformTabs } from "./PlatformTabs";
import { CommentEditorForm } from "./CommentEditorForm";
import { PreviewCanvas } from "./PreviewCanvas";
import { RecentMockups } from "./RecentMockups";
import { UsageCounter } from "./UsageCounter";

type GeneratorPageProps = {
  dictionary: Dictionary;
  initialSession: AuthSession;
  locale: Locale;
};

type UsageState = {
  count: number;
  limit: number;
};

export function GeneratorPage({ dictionary, initialSession }: GeneratorPageProps) {
  const initialAccountState =
    initialSession.status === "anonymous" ? "anonymous" : "logged_in";
  const [mockup, setMockup] = useState<MockupData>({
    ...defaultMockup,
    accountState: initialAccountState,
  });
  const [recent, setRecent] = useState<MockupData[]>([]);
  const [saved, setSaved] = useState(false);
  const [exportError, setExportError] = useState("");
  const [usage, setUsage] = useState<UsageState>({
    count: 0,
    limit: getUsageLimit(initialAccountState),
  });
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setRecent(readRecentMockups());
      const anonymousUsage = readAnonymousUsage();
      setUsage((current) =>
        initialAccountState === "anonymous"
          ? { count: anonymousUsage.count, limit: getUsageLimit("anonymous") }
          : current,
      );
    });
  }, [initialAccountState]);

  useEffect(() => {
    if (initialAccountState === "anonymous") {
      return;
    }

    fetch("/api/usage")
      .then((response) => response.json())
      .then((payload) => {
        if (payload.usage) {
          setUsage({
            count: payload.usage.count ?? 0,
            limit: payload.usage.limit ?? getUsageLimit("logged_in"),
          });
        }
      })
      .catch((error) => console.error("Usage read failed", error));
  }, [initialAccountState]);

  function updateMockup(update: Partial<MockupData>) {
    setSaved(false);
    setMockup((current) => {
      const next = { ...current, ...update };

      if (update.accountState === "anonymous") {
        next.verified = false;
      }

      return next;
    });
  }

  function handlePlatformChange(platform: Platform) {
    updateMockup({ platform });
  }

  function handleSave() {
    const next = {
      ...mockup,
      id: createMockupId(),
      createdAt: Date.now(),
    };
    setRecent(writeRecentMockup(next));
    setSaved(true);
  }

  async function handleExport() {
    const target =
      previewRef.current ??
      (document.getElementById(mockupExportTargetId) as HTMLDivElement | null);

    try {
      setExportError("");
      if (!target || target.id !== mockupExportTargetId) {
        throw new Error("The mockup export target is not mounted.");
      }

      if (mockup.accountState === "logged_in") {
        const response = await fetch("/api/usage", { method: "POST" });
        const payload = await response.json();

        if (!response.ok || !payload.allowed) {
          setExportError(dictionary.generator.usageLimitReached);
          return;
        }

        if (payload.usage) {
          setUsage({
            count: payload.usage.count ?? usage.count,
            limit: payload.usage.limit ?? getUsageLimit("logged_in"),
          });
        }
      } else {
        const nextUsage = incrementAnonymousUsage(getUsageLimit("anonymous"));

        if (!nextUsage.allowed) {
          setExportError(dictionary.generator.usageLimitReached);
          return;
        }

        setUsage({ count: nextUsage.count, limit: nextUsage.limit });
      }

      await exportElementToPng({
        data: mockup,
        fileName: `${mockup.platform}-comment-${Date.now()}.png`,
        target,
        watermarkText: dictionary.generator.watermark,
      });
      handleSave();
    } catch (error) {
      console.error("PNG export failed", error);
      setExportError(dictionary.generator.exportFailed);
    }
  }

  function handleClearRecent() {
    clearRecentMockups();
    setRecent([]);
  }

  const isAuthenticated = initialSession.status === "logged_in" || initialSession.status === "premium";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
          {dictionary.generator.title}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          {dictionary.generator.subtitle}
        </h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="space-y-4">
          <section className="rounded-lg border border-white/10 bg-zinc-950 p-4">
            <PlatformTabs
              dictionary={dictionary}
              onChange={handlePlatformChange}
              value={mockup.platform}
            />
          </section>
          <section className="rounded-lg border border-white/10 bg-zinc-950 p-4">
            <div className="mb-3 text-sm font-semibold text-white">
              {dictionary.generator.accountState}
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
              <div className="text-sm font-semibold text-white">
                {mockup.accountState === "anonymous"
                  ? dictionary.generator.anonymous
                  : dictionary.generator.loggedIn}
              </div>
              <p className="mt-1 text-xs leading-5 text-zinc-500">
                {mockup.accountState === "anonymous"
                  ? dictionary.generator.anonymousHint
                  : initialSession.email}
              </p>
            </div>
          </section>
          <CommentEditorForm
            dictionary={dictionary}
            isAuthenticated={isAuthenticated}
            mockup={mockup}
            onChange={updateMockup}
          />
        </aside>
        <section className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-zinc-950 p-4">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {dictionary.generator.preview}
                </h2>
                <UsageCounter
                  count={usage.count}
                  label={dictionary.generator.usage}
                  limit={usage.limit}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleSave} type="button" variant="secondary">
                  {saved
                    ? dictionary.generator.saved
                    : dictionary.generator.saveRecent}
                </Button>
                <Button onClick={handleExport} type="button">
                  {dictionary.generator.export}
                </Button>
              </div>
            </div>
            <PreviewCanvas
              dictionary={dictionary}
              mockup={mockup}
              previewRef={previewRef}
            />
            {exportError ? (
              <p className="mt-3 text-sm text-rose-300">{exportError}</p>
            ) : null}
          </div>
          <RecentMockups
            dictionary={dictionary}
            items={recent}
            onClear={handleClearRecent}
            onReuse={(item) => {
              const normalized = normalizeMockupData(item);
              setMockup({
                ...normalized,
                accountState: initialAccountState,
                verified:
                  initialAccountState === "anonymous" ? false : normalized.verified,
              });
            }}
          />
        </section>
      </div>
    </div>
  );
}
