import { NavLink } from "react-router-dom";

// Icon helpers
const Icon = ({ d, d2 }) => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} />
    {d2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d2} />}
  </svg>
);

const DotsIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
);

const MENU_ITEMS = [
  {
    to: "/admin", end: true, label: "Dashboard",
    icon: <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  },
  {
    to: "/admin/menu", label: "Menu Items",
    icon: <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
  },
  {
    to: "/admin/categories", label: "Categories",
    icon: <Icon d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />,
  },
  {
    to: "/admin/qr", label: "QR Code",
    icon: <Icon d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />,
  },
];

const OTHER_ITEMS = [
  {
    to: "/admin/settings", label: "Settings",
    icon: <Icon
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      d2="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />,
  },
  {
    to: "/", label: "Preview Menu",
    icon: <Icon d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />,
  },
];

const Sidebar = ({ isExpanded, setIsExpanded, isHovered, setIsHovered, isMobileOpen }) => {
  const showFull = isExpanded || isHovered || isMobileOpen;
  const sidebarW = showFull ? "w-[260px]" : "w-[90px]";

  const NavItem = ({ item }) => (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
         transition-all duration-150
         ${!showFull ? "justify-center" : "justify-start"}
         ${isActive ? "bg-brand/10 text-brand" : "text-text-sub hover:bg-surface hover:text-text"}`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`flex-shrink-0 transition-colors
            ${isActive ? "text-brand" : "text-text-sub group-hover:text-text"}`}>
            {item.icon}
          </span>
          {showFull && <span className="truncate">{item.label}</span>}
          {!showFull && isActive && (
            <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-brand" />
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30
        flex flex-col bg-base border-r border-border
        transition-all duration-300 ease-in-out
        ${sidebarW}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className={`flex items-center py-6 px-5 border-b border-border
        ${!showFull ? "justify-center" : "justify-between"}`}>
        {showFull ? (
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-brand-light">
              <svg className="w-5 h-5 text-brand-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V12h6v9" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-text text-sm leading-tight truncate">Hotel Admin</p>
              <p className="text-text-sub text-[11px] mt-0.5 truncate">Addis Grand Hotel</p>
            </div>
          </div>
        ) : (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-brand-light">
            <svg className="w-5 h-5 text-brand-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V12h6v9" />
            </svg>
          </div>
        )}
        
        {showFull && (
          <button
            onClick={() => { setIsExpanded((e) => !e); setIsHovered(false); }}
            className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center
              text-text-sub hover:bg-surface hover:text-text transition-colors flex-shrink-0"
          >
            <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "" : "rotate-180"}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-5 px-3 space-y-6 no-scrollbar">
        <div>
          <div className={`flex mb-3 ${!showFull ? "justify-center" : "justify-start px-1"}`}>
            {showFull ? <span className="text-[11px] font-bold uppercase tracking-widest text-text-sub">Menu</span> : <DotsIcon />}
          </div>
          <ul className="space-y-1">
            {MENU_ITEMS.map((item) => (
              <li key={item.to} className="relative"><NavItem item={item} /></li>
            ))}
          </ul>
        </div>
        <div>
          <div className={`flex mb-3 ${!showFull ? "justify-center" : "justify-start px-1"}`}>
            {showFull ? <span className="text-[11px] font-bold uppercase tracking-widest text-text-sub">Others</span> : <DotsIcon />}
          </div>
          <ul className="space-y-1">
            {OTHER_ITEMS.map((item) => (
              <li key={item.to} className="relative"><NavItem item={item} /></li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Footer */}
      <div className={`px-3 py-4 border-t border-border flex items-center gap-3 ${!showFull ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
        {showFull && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text truncate">Admin</p>
            <p className="text-[11px] text-text-sub truncate">admin@hotel.com</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;