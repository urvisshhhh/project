import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Film,
  Users,
  Monitor,
  Ticket,
  Settings,
  Clapperboard, // Import Cinema Icon
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Movies", icon: Film, path: "/movies" },
  { name: "Shows", icon: Monitor, path: "/" },
  { name: "Bookings", icon: Ticket, path: "/" },
  { name: "Users", icon: Users, path: "/" },
  { name: "Cinemas", icon: Clapperboard, path: "/cinemas" }, // Added Cinemas
  { name: "Settings", icon: Settings, path: "/" },
];

export default function Sidebar() {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-900">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-2xl font-bold text-white">Cinema Admin</h1>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
