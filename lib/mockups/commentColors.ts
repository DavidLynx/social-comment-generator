import type { CommentColorPreset } from "./types";

export type CommentColorTheme = {
  id: CommentColorPreset;
  label: string;
  background: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  shadow: string;
};

export const commentColorThemes: CommentColorTheme[] = [
  {
    id: "white",
    label: "White",
    background: "#f8fafc",
    border: "rgba(15, 23, 42, 0.08)",
    text: "#0f172a",
    muted: "#64748b",
    accent: "#2563eb",
    shadow: "0 24px 70px rgba(2, 6, 23, 0.28)",
  },
  {
    id: "black",
    label: "Black",
    background: "#101114",
    border: "rgba(255, 255, 255, 0.1)",
    text: "#f8fafc",
    muted: "#8b929e",
    accent: "#67e8f9",
    shadow: "0 24px 70px rgba(0, 0, 0, 0.42)",
  },
  {
    id: "periwinkle",
    label: "Periwinkle",
    background: "#dfe6ff",
    border: "rgba(99, 102, 241, 0.2)",
    text: "#202448",
    muted: "#59617f",
    accent: "#4f46e5",
    shadow: "0 24px 70px rgba(79, 70, 229, 0.22)",
  },
  {
    id: "mint",
    label: "Mint",
    background: "#d9fbef",
    border: "rgba(20, 184, 166, 0.22)",
    text: "#0d332d",
    muted: "#3c766c",
    accent: "#0d9488",
    shadow: "0 24px 70px rgba(13, 148, 136, 0.2)",
  },
  {
    id: "sunset",
    label: "Sunset",
    background: "#ffe1cf",
    border: "rgba(249, 115, 22, 0.22)",
    text: "#431407",
    muted: "#9a4f29",
    accent: "#ea580c",
    shadow: "0 24px 70px rgba(249, 115, 22, 0.22)",
  },
  {
    id: "lavender",
    label: "Lavender",
    background: "#efe4ff",
    border: "rgba(168, 85, 247, 0.2)",
    text: "#32154d",
    muted: "#74528f",
    accent: "#9333ea",
    shadow: "0 24px 70px rgba(147, 51, 234, 0.2)",
  },
  {
    id: "red",
    label: "Red",
    background: "#f43f5e",
    border: "rgba(255, 255, 255, 0.18)",
    text: "#fff7f8",
    muted: "#ffe4e8",
    accent: "#fecdd3",
    shadow: "0 24px 70px rgba(244, 63, 94, 0.26)",
  },
  {
    id: "orange",
    label: "Orange",
    background: "#fb923c",
    border: "rgba(255, 255, 255, 0.18)",
    text: "#231005",
    muted: "#5f2d12",
    accent: "#7c2d12",
    shadow: "0 24px 70px rgba(251, 146, 60, 0.24)",
  },
  {
    id: "green",
    label: "Green",
    background: "#16a34a",
    border: "rgba(255, 255, 255, 0.16)",
    text: "#f0fdf4",
    muted: "#dcfce7",
    accent: "#bbf7d0",
    shadow: "0 24px 70px rgba(22, 163, 74, 0.24)",
  },
  {
    id: "blue",
    label: "Blue",
    background: "#2563eb",
    border: "rgba(255, 255, 255, 0.16)",
    text: "#eff6ff",
    muted: "#dbeafe",
    accent: "#bfdbfe",
    shadow: "0 24px 70px rgba(37, 99, 235, 0.24)",
  },
  {
    id: "purple",
    label: "Purple",
    background: "#7c3aed",
    border: "rgba(255, 255, 255, 0.16)",
    text: "#faf5ff",
    muted: "#ede9fe",
    accent: "#ddd6fe",
    shadow: "0 24px 70px rgba(124, 58, 237, 0.24)",
  },
];

export function getCommentColorTheme(preset: CommentColorPreset) {
  return (
    commentColorThemes.find((theme) => theme.id === preset) ??
    commentColorThemes[1]
  );
}
