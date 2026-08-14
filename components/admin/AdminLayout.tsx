"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiBarChart2, FiFileText, FiMenu, FiMoon, FiSun, FiTool, FiUsers, FiX } from "react-icons/fi";
import { MdBalance } from "react-icons/md";
import { getSession, logout, AdminSession } from "../../lib/adminAuth";
import { useTheme } from "../../contexts/ThemeContext";
import { adminTheme } from "../../lib/adminTheme";

const NAV = [
  { href: "/admin", label: "Monitoring", icon: FiBarChart2 },
  { href: "/admin/candidates", label: "Candidates", icon: FiUsers },
  { href: "/admin/results", label: "Results", icon: FiFileText },
  { href: "/admin/content", label: "Content & Scoring", icon: FiTool },
  { href: "/admin/declaration", label: "Declaration", icon: MdBalance },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null | undefined>(undefined);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const th = adminTheme(isDarkMode);

  useEffect(() => {
    const s = getSession();
    setSession(s);
    if (!s && router.pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [router.pathname]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [router.pathname]);

  if (router.pathname === "/admin/login") {
    return <div className={`min-h-screen ${th.pageBg}`}>{children}</div>;
  }

  if (session === undefined || !session) {
    return <div className={`min-h-screen ${th.pageBg}`} />;
  }

  return (
    <div className={`h-screen flex flex-col lg:flex-row overflow-hidden ${th.pageBg}`}>
      {/* Mobile top bar */}
      <div
        className={`lg:hidden flex items-center justify-between px-4 py-3 border-b shrink-0 ${th.sidebarBg} ${isDarkMode ? "border-slate-800" : "border-gray-200"}`}
      >
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
          className={`p-2 -ml-2 rounded-lg ${isDarkMode ? "text-slate-300 hover:bg-slate-800" : "text-gray-700 hover:bg-gray-100"}`}
        >
          <FiMenu className="w-5 h-5" />
        </button>
        <div className="text-base font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
          MNEXT Admin
        </div>
        <div className="w-9" />
      </div>

      {/* Mobile drawer backdrop */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 shrink-0 h-full border-r flex flex-col overflow-y-auto transform transition-transform duration-200 lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        } ${th.sidebarBg}`}
      >
        <div
          className={`px-5 py-5 border-b flex items-center justify-between ${isDarkMode ? "border-slate-800" : "border-gray-200"}`}
        >
          <div>
            <div className="text-lg font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
              MNEXT Admin
            </div>
            <div className={`text-xs mt-0.5 ${th.subtleText}`}>
              MNext Challenge platform
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
            className={`lg:hidden p-1.5 rounded-lg ${isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <FiX />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? router.pathname === "/admin"
                : router.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? th.navActive : th.navInactive
                }`}
              >
                <item.icon className="shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div
          className={`px-4 py-4 border-t space-y-3 ${isDarkMode ? "border-slate-800" : "border-gray-200"}`}
        >
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-slate-800/60 hover:bg-slate-800 text-slate-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <span>{isDarkMode ? "Dark mode" : "Light mode"}</span>
            {isDarkMode ? <FiMoon /> : <FiSun />}
          </button>
          <div>
            <div className="text-xs">{session.displayName}</div>
            <div className={`text-[11px] mb-2 ${th.mutedText}`}>
              {session.role}
            </div>
            <button
              onClick={() => {
                logout();
                router.replace("/admin/login");
              }}
              className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-slate-800/60 hover:bg-slate-800 text-slate-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</div>
      </main>
    </div>
  );
}
