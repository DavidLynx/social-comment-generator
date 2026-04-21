"use client";

import { useId, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { MockupData } from "@/lib/mockups/types";
import { readImageFile } from "@/lib/avatar/cropImage";
import { Button } from "@/components/ui/Button";
import { AvatarBubble } from "@/components/mockups/AvatarBubble";
import { AvatarCropModal } from "./AvatarCropModal";
import { AvatarPicker } from "./AvatarPicker";

const supportedAvatarTypes = ["image/png", "image/jpeg", "image/webp"];
const maxAvatarBytes = 4 * 1024 * 1024;

type AvatarControlsProps = {
  dictionary: Dictionary;
  mockup: MockupData;
  onChange: (update: Partial<MockupData>) => void;
};

export function AvatarControls({
  dictionary,
  mockup,
  onChange,
}: AvatarControlsProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingImage, setPendingImage] = useState("");
  const [error, setError] = useState("");

  async function handleFileChange(file: File | undefined) {
    if (!file) {
      return;
    }

    if (!supportedAvatarTypes.includes(file.type)) {
      setError(dictionary.generator.avatarUploadTypeError);
      return;
    }

    if (file.size > maxAvatarBytes) {
      setError(dictionary.generator.avatarUploadSizeError);
      return;
    }

    try {
      setError("");
      setPendingImage(await readImageFile(file));
    } catch (caughtError) {
      console.error("Avatar upload failed", caughtError);
      setError(dictionary.generator.avatarUploadGenericError);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div className="grid gap-4">
      <div>
        <div className="mb-2 text-sm font-medium text-zinc-300">
          {dictionary.generator.avatarSource}
        </div>
        <div className="grid grid-cols-2 rounded-md border border-white/10 bg-black/40 p-1">
          <button
            aria-pressed={mockup.avatarSource === "generated"}
            className={`rounded px-3 py-2 text-sm font-semibold transition ${
              mockup.avatarSource === "generated"
                ? "bg-white text-slate-950"
                : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => onChange({ avatarSource: "generated" })}
            type="button"
          >
            {dictionary.generator.avatarGenerated}
          </button>
          <button
            aria-pressed={mockup.avatarSource === "uploaded"}
            className={`rounded px-3 py-2 text-sm font-semibold transition ${
              mockup.avatarSource === "uploaded"
                ? "bg-white text-slate-950"
                : "text-zinc-400 hover:text-white"
            }`}
            disabled={!mockup.customAvatarDataUrl}
            onClick={() => onChange({ avatarSource: "uploaded" })}
            type="button"
          >
            {dictionary.generator.avatarUploaded}
          </button>
        </div>
      </div>
      <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
        <div className="flex items-center gap-3">
          <AvatarBubble
            avatarId={mockup.avatarId}
            customAvatarDataUrl={mockup.customAvatarDataUrl}
            source={mockup.avatarSource}
            size="lg"
          />
          <div className="min-w-0 flex-1">
            <label
              className="text-sm font-semibold text-white"
              htmlFor={inputId}
            >
              {dictionary.generator.avatarUpload}
            </label>
            <p className="mt-1 text-xs leading-5 text-zinc-500">
              {dictionary.generator.avatarUploadHelp}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            accept={supportedAvatarTypes.join(",")}
            className="sr-only"
            id={inputId}
            name="customAvatar"
            onChange={(event) => handleFileChange(event.target.files?.[0])}
            ref={fileInputRef}
            type="file"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            type="button"
            variant="secondary"
          >
            {dictionary.generator.avatarChooseFile}
          </Button>
          {mockup.customAvatarDataUrl ? (
            <Button
              onClick={() =>
                onChange({
                  avatarSource: "generated",
                  customAvatarDataUrl: undefined,
                })
              }
              type="button"
              variant="ghost"
            >
              {dictionary.generator.avatarRemove}
            </Button>
          ) : null}
        </div>
        {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
      </div>
      {mockup.avatarSource === "generated" ? (
        <AvatarPicker
          dictionary={dictionary}
          onChange={(avatarId) => onChange({ avatarId })}
          value={mockup.avatarId}
        />
      ) : null}
      {pendingImage ? (
        <AvatarCropModal
          dictionary={dictionary}
          imageSource={pendingImage}
          onCancel={() => setPendingImage("")}
          onConfirm={(customAvatarDataUrl) => {
            setPendingImage("");
            onChange({ avatarSource: "uploaded", customAvatarDataUrl });
          }}
        />
      ) : null}
    </div>
  );
}
