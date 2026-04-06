import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Phone,
  Layers,
  FileText,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Plus
} from 'lucide-react';

const MainLayout = ({ onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/search-calls', label: 'Calls', icon: <Phone size={18} /> },
    { path: '/search-batches', label: 'Batches', icon: <Layers size={18} /> },
    { path: '/templates', label: 'Templates', icon: <FileText size={18} /> },
    { path: '/contact-insights', label: 'Contact Insights', icon: <Users size={18} /> },
  ];

  const bottomMenuItems = [
    { path: '/settings', label: 'Settings', icon: <Settings size={18} /> },
    { path: '/help', label: 'Help Center', icon: <HelpCircle size={18} /> },
  ];

  const isDashboard = location.pathname === '/';

  const handleLogout = () => {
    onLogout();
  };

  if (isDashboard) {
    // Dashboard has its own full layout
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-[#F7F8FA] font-sans text-sm text-[#1A1C21]">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-[#EAECEF] flex flex-col p-5">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-[#0D346C] tracking-tight">Bristol Healthcare Services</h1>
        </div>

        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2.5 cursor-pointer rounded-lg transition-all text-xs ${
                location.pathname === item.path
                  ? 'bg-[#EAECEF] font-bold text-[#1A1C21] border-l-4 border-[#0D346C] rounded-l-none'
                  : 'text-[#717784] hover:bg-[#F7F8FA]'
              }`}
            >
              <span className={`mr-3.5 ${location.pathname === item.path ? 'text-[#0D346C]' : 'text-[#717784]'}`}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <Link to="/batches/new/select-type" className="flex items-center w-full px-4 py-2.5 text-[#00B8D9] font-semibold hover:bg-[#E0F8FC] rounded-lg transition-colors mt-6 text-xs">
            <Plus size={18} className="mr-3" /> Create Call Batch
          </Link>
        </nav>

        <div className="pt-6 border-t border-[#F2F4F7] space-y-1.5">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-2.5 text-sm font-medium text-[#717784] hover:bg-[#F7F8FA] rounded-lg transition-all text-xs"
            >
              <span className="mr-3.5">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-[#717784] hover:bg-[#F7F8FA] rounded-lg transition-all text-xs"
          >
            <LogOut size={18} className="mr-3.5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;