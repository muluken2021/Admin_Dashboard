import { Menu, Search, Bell, ChevronDown } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="h-20 bg-white border-b px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 w-full">
      
      {/* LEFT SIDE: Hamburger + Search */}
      <div className="flex items-center gap-4">
        
        {/* HAMBURGER BUTTON - Visible ONLY on Mobile/Tablet (< 1024px) */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-slate-600 border border-gray-200 transition-colors"
          aria-label="Open Menu"
        >
          <Menu size={28} /> 
        </button>

        {/* SEARCH BAR - Hidden on small mobile, shows from 'sm' breakpoint up */}
        <div className="relative hidden sm:block w-48 md:w-64 lg:w-96">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      {/* RIGHT SIDE: Profile & Notifications */}
      <div className="flex items-center gap-2 md:gap-6">
        <button className="p-2 text-gray-500 hover:text-teal-600 relative">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-gray-100">
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Danel+Kassaw&background=0D9488&color=fff" alt="User" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-800 leading-none">Danel</p>
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Admin</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;