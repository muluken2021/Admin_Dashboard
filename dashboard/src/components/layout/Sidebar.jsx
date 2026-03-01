import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Box, Heart, Inbox, 
  ListOrdered, BarChart3, Settings, LogOut, X 
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/products', icon: <Box size={20} /> },
    { name: 'Favorites', path: '/favorites', icon: <Heart size={20} /> },
    { name: 'Inbox', path: '/inbox', icon: <Inbox size={20} /> },
    { name: 'Order Lists', path: '/order-lists', icon: <ListOrdered size={20} /> },
    { name: 'Product Stock', path: '/stock', icon: <BarChart3 size={20} /> },
  ];

  const activeStyle = "bg-teal-600 text-white shadow-md";
  const inactiveStyle = "text-gray-500 hover:bg-gray-100 hover:text-teal-600";

  return (
    <>
      {/* Mobile Overlay (Backdrop) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-teal-600">Dash</span>Stack
          </h1>
          {/* Close button for Mobile only */}
          <button className="lg:hidden text-gray-500" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Close sidebar on mobile after clicking
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive ? activeStyle : inactiveStyle
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t space-y-1">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-lg font-medium">
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg font-medium">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;