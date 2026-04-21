"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { AccountState, MockupData, Platform } from "@/lib/mockups/types";
import { createMockupId, defaultMockup } from "@/lib/mockups/defaults";
import { normalizeMockupData } from "@/lib/mockups/normalizeMockup";
import { getUsageLimit } from "@/lib/usage/limits";
import { createDemoSession, demoAccountStates } from "@/lib/auth/demoSession";
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
  locale: Locale;
};

export function GeneratorPage({ dictionary }: GeneratorPageProps) {
  const [mockup, setMockup] = useState<MockupData>(defaultMockup);
  const [recent, setRecent] = useState<MockupData[]>([]);
  const [saved, setSaved] = useState(false);
  const [exportError, setExportError] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setRecent(readRecentMockups());
    });
  }, []);

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

  function handleAccountChange(accountState: AccountState) {
    updateMockup({ accountState });
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

  const session = createDemoSession(mockup.accountState);
  const isAuthenticated = session.status === "logged_in" || session.status === "premium";

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
            <div className="grid grid-cols-2 gap-2">
              {demoAccountStates.map((state) => (
                <Button
                  key={state}
                  onClick={() => handleAccountChange(state)}
                  type="button"
                  variant={
                    mockup.accountState === state ? "primary" : "secondary"
                  }
                >
                  {state === "anonymous"
                    ? dictionary.generator.anonymous
                    : dictionary.generator.loggedIn}
                </Button>
              ))}
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
                  label={dictionary.generator.usage}
                  limit={getUsageLimit(mockup.accountState)}
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
            onReuse={(item) => setMockup(normalizeMockupData(item))}
          />
        </section>
      </div>
    </div>
  );
}
