// Shared className tokens for the admin portal so every page can support
// light/dark without re-deriving the same conditional strings everywhere.

export function adminTheme(isDarkMode: boolean) {
  return {
    isDarkMode,
    pageBg: isDarkMode ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-gray-900",
    sidebarBg: isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-gray-200",
    navActive: isDarkMode
      ? "bg-gradient-to-r from-orange-500/20 to-blue-500/20 text-white border border-blue-500/30"
      : "bg-gradient-to-r from-orange-100 to-blue-100 text-gray-900 border border-blue-300",
    navInactive: isDarkMode
      ? "text-slate-400 hover:text-white hover:bg-slate-800/60"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
    card: isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-white border-gray-200 shadow-sm",
    cardMuted: isDarkMode ? "bg-slate-800/40 border-slate-700/60" : "bg-gray-50 border-gray-200",
    input:
      "w-full rounded-lg px-3 py-2 text-sm focus:outline-none " +
      (isDarkMode
        ? "bg-slate-800/60 border border-slate-700 text-slate-100 focus:border-blue-500/60"
        : "bg-white border border-gray-300 text-gray-900 focus:border-blue-500"),
    subtleText: isDarkMode ? "text-slate-400" : "text-gray-500",
    mutedText: isDarkMode ? "text-slate-500" : "text-gray-400",
    tableWrap: isDarkMode ? "border-slate-800" : "border-gray-200",
    tableHead: isDarkMode
      ? "bg-slate-900/60 text-slate-400 border-slate-800"
      : "bg-gray-100 text-gray-500 border-gray-200",
    rowBorder: isDarkMode ? "border-slate-800/80" : "border-gray-200",
    rowHover: isDarkMode ? "hover:bg-slate-900/40" : "hover:bg-gray-50",
    btnSecondary:
      "text-xs font-semibold px-3 py-2 rounded-lg border transition-colors " +
      (isDarkMode
        ? "bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200"
        : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"),
    btnPrimary:
      "text-xs font-semibold px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white transition-all",
    modalOverlay: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4",
    modalCard: isDarkMode
      ? "bg-slate-900 border border-slate-800"
      : "bg-white border border-gray-200 shadow-xl",
    pill: isDarkMode ? "bg-slate-800/60 border-slate-700 text-slate-200" : "bg-gray-100 border-gray-300 text-gray-700",
  };
}

export type AdminThemeTokens = ReturnType<typeof adminTheme>;
