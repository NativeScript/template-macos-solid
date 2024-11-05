export function useColorScheme() {
  const colorScheme =
    NSApp.effectiveAppearance.bestMatchFromAppearancesWithNames([
      NSAppearanceNameDarkAqua,
      NSAppearanceNameVibrantDark,
    ]);

  return colorScheme ? "dark" : "light";
}
