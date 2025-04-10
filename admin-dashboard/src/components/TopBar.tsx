import { Bell, User } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <div className="text-white px-3 py-2 text-sm font-medium">
                  Welcome, Admin
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>
            <div className="ml-4 relative flex-shrink-0">
              <div>
                <button className="flex text-sm rounded-full text-white focus:outline-none">
                  <User className="h-8 w-8 rounded-full bg-gray-700 p-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}