import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { MockupData } from "@/lib/mockups/types";
import { AvatarControls } from "./AvatarControls";
import { CommentColorPicker } from "./CommentColorPicker";

type CommentEditorFormProps = {
  dictionary: Dictionary;
  isAuthenticated: boolean;
  mockup: MockupData;
  onChange: (update: Partial<MockupData>) => void;
};

export function CommentEditorForm({
  dictionary,
  isAuthenticated,
  mockup,
  onChange,
}: CommentEditorFormProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-zinc-950 p-4">
      <h2 className="text-lg font-semibold text-white">
        {dictionary.generator.formTitle}
      </h2>
      <div className="mt-4 grid gap-4">
        <Field label={dictionary.generator.username}>
          <input
            className="field"
            id="mockup-username"
            name="username"
            onChange={(event) => onChange({ username: event.target.value })}
            value={mockup.username}
          />
        </Field>
        <Field label={dictionary.generator.handle}>
          <input
            className="field"
            id="mockup-handle"
            name="handle"
            onChange={(event) => onChange({ handle: event.target.value })}
            value={mockup.handle}
          />
        </Field>
        <Field label={dictionary.generator.comment}>
          <textarea
            className="field min-h-24 resize-y"
            id="mockup-comment"
            name="comment"
            onChange={(event) => onChange({ comment: event.target.value })}
            value={mockup.comment}
          />
        </Field>
        <CommentColorPicker
          dictionary={dictionary}
          onChange={(colorPreset) => onChange({ colorPreset })}
          value={mockup.colorPreset}
        />
        <div className="grid grid-cols-2 gap-3">
          <Field label={dictionary.generator.timestamp}>
            <input
              className="field"
              id="mockup-timestamp"
              name="timestamp"
              onChange={(event) => onChange({ timestamp: event.target.value })}
              value={mockup.timestamp}
            />
          </Field>
          <Field label={dictionary.generator.likes}>
            <input
              className="field"
              id="mockup-likes"
              min={0}
              name="likes"
              onChange={(event) =>
                onChange({ likes: Number(event.target.value) || 0 })
              }
              type="number"
              value={mockup.likes}
            />
          </Field>
        </div>
        <label className="flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm text-zinc-300">
          <input
            checked={mockup.verified}
            className="mt-1 size-4 accent-cyan-300"
            disabled={!isAuthenticated}
            id="mockup-verified"
            name="verified"
            onChange={(event) => onChange({ verified: event.target.checked })}
            type="checkbox"
          />
          <span>
            <span className="block font-semibold text-white">
              {dictionary.generator.verified}
            </span>
            {!isAuthenticated ? dictionary.generator.verifiedLocked : null}
          </span>
        </label>
        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            checked={mockup.showReply}
            className="size-4 accent-cyan-300"
            id="mockup-show-reply"
            name="showReply"
            onChange={(event) => onChange({ showReply: event.target.checked })}
            type="checkbox"
          />
          {mockup.showReply
            ? dictionary.generator.removeReply
            : dictionary.generator.addReply}
        </label>
        {mockup.showReply ? (
          <Field label={dictionary.generator.reply}>
            <textarea
              className="field min-h-20 resize-y"
              id="mockup-reply"
              name="reply"
              onChange={(event) => onChange({ reply: event.target.value })}
              value={mockup.reply}
            />
          </Field>
        ) : null}
        <AvatarControls
          dictionary={dictionary}
          mockup={mockup}
          onChange={onChange}
        />
      </div>
    </section>
  );
}

function Field({ children, label }: { children: ReactNode; label: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-300">
      {label}
      {children}
    </label>
  );
}
