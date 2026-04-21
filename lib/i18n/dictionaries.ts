import "server-only";
import type { Locale } from "./config";
import { en } from "./en";
import { es } from "./es";

const dictionaries = {
  en,
  es,
};

export type Dictionary = typeof en;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
