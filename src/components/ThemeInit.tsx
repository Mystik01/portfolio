"use client";

import { useEffect } from "react";
import { style, dataStyle } from "@/resources";

export default function ThemeInit() {
  useEffect(() => {
    try {
      const root = document.documentElement;

      const config = {
        brand: style.brand,
        accent: style.accent,
        neutral: style.neutral,
        solid: style.solid,
        "solid-style": style.solidStyle,
        border: style.border,
        surface: style.surface,
        transition: style.transition,
        scaling: style.scaling,
        "viz-style": dataStyle.variant,
      } as Record<string, string>;

      for (const [key, value] of Object.entries(config)) {
        if (value != null) root.setAttribute(`data-${key}`, String(value));
      }

      const resolveTheme = (themeValue: string | null) => {
        if (!themeValue || themeValue === "system") {
          return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return themeValue;
      };

      const savedTheme = localStorage.getItem("data-theme");
      const resolvedTheme = resolveTheme(savedTheme);
      root.setAttribute("data-theme", resolvedTheme);

      // Apply any saved style overrides
      const styleKeys = Object.keys(config);
      for (const key of styleKeys) {
        const value = localStorage.getItem(`data-${key}`);
        if (value) root.setAttribute(`data-${key}`, value);
      }
    } catch (e) {
      // Fail silently; set a sensible default
      try {
        document.documentElement.setAttribute("data-theme", "dark");
      } catch {}
    }
  }, []);

  return null;
}
