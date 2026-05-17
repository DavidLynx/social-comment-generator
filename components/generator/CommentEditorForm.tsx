import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  createDefaultReply,
  createReplyId,
} from "@/lib/mockups/defaults";
import type { MockupAuthor, MockupData, MockupReply } from "@/lib/mockups/types";
import { AvatarControls } from "./AvatarControls";
import { CommentColorPicker } from "./CommentColorPicker";
import { Button } from "@/components/ui/Button";

type CommentEditorFormProps = {
  dictionary: Dictionary;
  isAuthenticated: boolean;
  mockup: MockupData;
  onChange: (next: MockupData) => void;
};

export function CommentEditorForm({
  dictionary,
  isAuthenticated,
  mockup,
  onChange,
}: CommentEditorFormProps) {
  function updateMainAuthor(update: Partial<MockupAuthor>) {
    onChange({
      ...mockup,
      mainAuthor: { ...mockup.mainAuthor, ...update },
    });
  }

  function updateReply(replyId: string, update: Partial<MockupReply>) {
    onChange({
      ...mockup,
      replies: mockup.replies.map((reply) =>
        reply.id === replyId ? { ...reply, ...update } : reply,
      ),
    });
  }

  function updateReplyAuthor(replyId: string, update: Partial<MockupAuthor>) {
    onChange({
      ...mockup,
      replies: mockup.replies.map((reply) =>
        reply.id === replyId
          ? { ...reply, author: { ...reply.author, ...update } }
          : reply,
      ),
    });
  }

  function handleAddReply() {
    onChange({
      ...mockup,
      replies: [...mockup.replies, { ...createDefaultReply(), id: createReplyId() }],
    });
  }

  function handleRemoveReply(replyId: string) {
    onChange({
      ...mockup,
      replies: mockup.replies.filter((reply) => reply.id !== replyId),
    });
  }

  return (
    <section className="rounded-lg border border-white/10 bg-zinc-950 p-4">
      <h2 className="text-lg font-semibold text-white">
        {dictionary.generator.formTitle}
      </h2>
      <div className="mt-4 grid gap-4">
        <EditorCard title={dictionary.generator.mainAuthorTitle}>
          <div className="grid gap-4">
            <Field label={dictionary.generator.username}>
              <input
                className="field"
                id="mockup-main-username"
                name="mainUsername"
                onChange={(event) => updateMainAuthor({ name: event.target.value })}
                value={mockup.mainAuthor.name}
              />
            </Field>
            <Field label={dictionary.generator.handle}>
              <input
                className="field"
                id="mockup-main-handle"
                name="mainHandle"
                onChange={(event) => updateMainAuthor({ handle: event.target.value })}
                value={mockup.mainAuthor.handle}
              />
            </Field>
            <Field label={dictionary.generator.comment}>
              <textarea
                className="field min-h-24 resize-y"
                id="mockup-main-comment"
                name="mainComment"
                onChange={(event) => onChange({ ...mockup, mainText: event.target.value })}
                value={mockup.mainText}
              />
            </Field>
            <AvatarControls
              author={mockup.mainAuthor}
              dictionary={dictionary}
              onChange={(author) => onChange({ ...mockup, mainAuthor: author })}
            />
          </div>
        </EditorCard>

        <CommentColorPicker
          dictionary={dictionary}
          onChange={(colorPreset) => onChange({ ...mockup, colorPreset })}
          value={mockup.colorPreset}
        />

        <div className="grid grid-cols-2 gap-3">
          <Field label={dictionary.generator.timestamp}>
            <input
              className="field"
              id="mockup-timestamp"
              name="timestamp"
              onChange={(event) => onChange({ ...mockup, timestamp: event.target.value })}
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
                onChange({ ...mockup, likes: Number(event.target.value) || 0 })
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
            onChange={(event) => onChange({ ...mockup, verified: event.target.checked })}
            type="checkbox"
          />
          <span>
            <span className="block font-semibold text-white">
              {dictionary.generator.verified}
            </span>
            {!isAuthenticated ? dictionary.generator.verifiedLocked : null}
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm text-zinc-300">
          <input
            checked={!mockup.showWatermark}
            className="mt-1 size-4 accent-cyan-300"
            id="mockup-hide-watermark"
            name="hideWatermark"
            onChange={(event) =>
              onChange({ ...mockup, showWatermark: !event.target.checked })
            }
            type="checkbox"
          />
          <span>
            <span className="block font-semibold text-white">
              {dictionary.generator.hideWatermark}
            </span>
            <span>{dictionary.generator.hideWatermarkHint}</span>
          </span>
        </label>

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white">
                {dictionary.generator.replyAuthorsTitle}
              </h3>
              <p className="text-xs text-zinc-500">
                {dictionary.generator.replyAuthorsHint}
              </p>
            </div>
            <Button onClick={handleAddReply} type="button" variant="secondary">
              {mockup.replies.length
                ? dictionary.generator.addAnotherReply
                : dictionary.generator.addReply}
            </Button>
          </div>

          {mockup.replies.length ? (
            mockup.replies.map((reply, index) => (
              <EditorCard
                actions={
                  <Button
                    onClick={() => handleRemoveReply(reply.id)}
                    type="button"
                    variant="ghost"
                  >
                    {dictionary.generator.removeThisReply}
                  </Button>
                }
                key={reply.id}
                title={`${dictionary.generator.replyAuthorTitle} ${index + 1}`}
              >
                <div className="grid gap-4">
                  <Field label={dictionary.generator.username}>
                    <input
                      className="field"
                      id={`mockup-reply-username-${reply.id}`}
                      name={`replyUsername-${reply.id}`}
                      onChange={(event) =>
                        updateReplyAuthor(reply.id, { name: event.target.value })
                      }
                      value={reply.author.name}
                    />
                  </Field>
                  <Field label={dictionary.generator.handle}>
                    <input
                      className="field"
                      id={`mockup-reply-handle-${reply.id}`}
                      name={`replyHandle-${reply.id}`}
                      onChange={(event) =>
                        updateReplyAuthor(reply.id, { handle: event.target.value })
                      }
                      value={reply.author.handle}
                    />
                  </Field>
                  <Field label={dictionary.generator.reply}>
                    <textarea
                      className="field min-h-20 resize-y"
                      id={`mockup-reply-text-${reply.id}`}
                      name={`replyText-${reply.id}`}
                      onChange={(event) =>
                        updateReply(reply.id, { text: event.target.value })
                      }
                      value={reply.text}
                    />
                  </Field>
                  <AvatarControls
                    author={reply.author}
                    dictionary={dictionary}
                    onChange={(author) => updateReply(reply.id, { author })}
                  />
                </div>
              </EditorCard>
            ))
          ) : (
            <p className="rounded-md border border-dashed border-white/10 bg-white/[0.02] px-3 py-4 text-sm text-zinc-500">
              {dictionary.generator.replyAuthorsEmpty}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function EditorCard({
  actions,
  children,
  title,
}: {
  actions?: ReactNode;
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {actions}
      </div>
      {children}
    </div>
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
