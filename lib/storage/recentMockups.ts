import type { MockupData } from "@/lib/mockups/types";
import { normalizeMockupData } from "@/lib/mockups/normalizeMockup";

const storageKey = "scg:recent-mockups";
const maxRecentMockups = 5;

export function readRecentMockups(): MockupData[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(storageKey);
    const parsed = value ? (JSON.parse(value) as Partial<MockupData>[]) : [];
    return parsed.map(normalizeMockupData);
  } catch {
    return [];
  }
}

export function writeRecentMockup(mockup: MockupData): MockupData[] {
  const current = readRecentMockups();
  const next = [
    mockup,
    ...current.filter((item) => item.id !== mockup.id),
  ].slice(0, maxRecentMockups);

  window.localStorage.setItem(storageKey, JSON.stringify(next));
  return next;
}

export function clearRecentMockups() {
  window.localStorage.removeItem(storageKey);
}
