"use client";

import { useState } from "react";
import { cropAvatarImage, type AvatarCrop } from "@/lib/avatar/cropImage";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/Button";

type AvatarCropModalProps = {
  dictionary: Dictionary;
  imageSource: string;
  onCancel: () => void;
  onConfirm: (dataUrl: string) => void;
};

export function AvatarCropModal({
  dictionary,
  imageSource,
  onCancel,
  onConfirm,
}: AvatarCropModalProps) {
  const [crop, setCrop] = useState<AvatarCrop>({
    offsetX: 0,
    offsetY: 0,
    zoom: 1.25,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    try {
      setIsSaving(true);
      setError("");
      const dataUrl = await cropAvatarImage(imageSource, crop);
      onConfirm(dataUrl);
    } catch (caughtError) {
      console.error("Avatar crop failed", caughtError);
      setError(dictionary.generator.avatarCropError);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 backdrop-blur-sm"
      role="dialog"
    >
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-zinc-950 p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {dictionary.generator.avatarCropTitle}
            </h3>
            <p className="mt-1 text-sm leading-6 text-zinc-400">
              {dictionary.generator.avatarCropHelp}
            </p>
          </div>
          <button
            aria-label={dictionary.generator.avatarCropCancel}
            className="rounded-md px-2 py-1 text-zinc-400 hover:bg-white/10 hover:text-white"
            onClick={onCancel}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="mt-5 grid place-items-center">
          <div className="relative size-72 overflow-hidden rounded-full border border-cyan-300/60 bg-black">
            <div
              aria-hidden="true"
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${imageSource})`,
                backgroundPosition: `${50 + crop.offsetX * 30}% ${
                  50 + crop.offsetY * 30
                }%`,
                backgroundSize: `${100 * crop.zoom}%`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/35" />
          </div>
        </div>
        <div className="mt-5 grid gap-4">
          <Control
            label={dictionary.generator.avatarZoom}
            max={3}
            min={1}
            onChange={(zoom) => setCrop((current) => ({ ...current, zoom }))}
            step={0.05}
            value={crop.zoom}
          />
          <Control
            label={dictionary.generator.avatarPositionX}
            max={1}
            min={-1}
            onChange={(offsetX) =>
              setCrop((current) => ({ ...current, offsetX }))
            }
            step={0.02}
            value={crop.offsetX}
          />
          <Control
            label={dictionary.generator.avatarPositionY}
            max={1}
            min={-1}
            onChange={(offsetY) =>
              setCrop((current) => ({ ...current, offsetY }))
            }
            step={0.02}
            value={crop.offsetY}
          />
        </div>
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button onClick={onCancel} type="button" variant="secondary">
            {dictionary.generator.avatarCropCancel}
          </Button>
          <Button disabled={isSaving} onClick={handleConfirm} type="button">
            {dictionary.generator.avatarCropApply}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Control({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-300">
      {label}
      <input
        className="accent-cyan-300"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}
