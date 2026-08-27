import { useRef, useEffect } from "react";
import NotificationDropdown from "./NotificationDropdown"; // Or keep dropdown components in separate files
import UserDropdown from "./UserDropdown";

const Header = ({ isMobileOpen, setIsMobileOpen, setIsAppMenuOpen, isAppMenuOpen, handleSidebarToggle }) => {
  const searchRef = useRef(null);

  // ⌘K / Ctrl+K → focus search
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-base border-b border-border">
      <div className="flex flex-col lg:flex-row items-center justify-between lg:px-6">
        
        {/* Row 1 — hamburger + mobile dots + desktop search */}
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3
          border-b border-border sm:gap-4
          lg:border-b-0 lg:px-0 lg:py-4 lg:justify-normal">

          {/* Hamburger / X */}
          <button
            onClick={handleSidebarToggle}
            className="flex items-center justify-center w-10 h-10 rounded-xl
              border border-border text-text-sub hover:bg-surface transition-colors
              lg:w-11 lg:h-11"
            aria-label="Toggle sidebar"
          >
            {isMobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M0 1C0 .448.448 0 1 0h18c.552 0 1 .448 1 1s-.448 1-1 1H1C.448 2 0 1.552 0 1zm0 12c0-.552.448-1 1-1h18c.552 0 1 .448 1 1s-.448 1-1 1H1c-.552 0-1-.448-1-1zM1 6c-.552 0-1 .448-1 1s.448 1 1 1h9c.552 0 1-.448 1-1s-.448-1-1-1H1z" />
              </svg>
            )}
          </button>

          {/* Three-dots app menu — mobile only */}
          <button
            onClick={() => setIsAppMenuOpen((o) => !o)}
            className="flex items-center justify-center w-10 h-10 rounded-xl
              text-text-sub hover:bg-surface transition-colors lg:hidden"
            aria-label="App menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>

          {/* Search — desktop only */}
          <div className="hidden lg:block flex-1 max-w-[430px]">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-text-sub" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search or type command..."
                className="w-full h-11 rounded-xl border border-border bg-transparent
                  pl-12 pr-16 text-sm text-text placeholder-text-sub
                  focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15
                  transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center
                gap-0.5 rounded-lg border border-border bg-surface px-1.5 py-1
                text-[11px] text-text-sub pointer-events-none select-none">
                <span>⌘</span><span>K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 — right-side actions (always desktop, toggleable mobile) */}
        <div className={`${isAppMenuOpen ? "flex" : "hidden"} lg:flex
          items-center justify-between w-full gap-4 px-4 py-3
          border-b border-border
          lg:justify-end lg:px-0 lg:py-0 lg:w-auto lg:border-b-0`}>
          <div className="flex items-center gap-2">
            <NotificationDropdown />
          </div>
          <UserDropdown />
        </div>

      </div>
    </header>
  );
};

export default Header;