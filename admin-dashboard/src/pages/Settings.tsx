import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  CreditCard,
  Building,
  Users,
  Save,
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'team', name: 'Team', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
          <SettingsIcon className="h-6 w-6" />
          Settings
        </h1>
      </div>

      {/* Settings Navigation */}
      <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === tab.id
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <tab.icon className="h-5 w-5 mr-2" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="bg-gray-900 rounded-lg p-6">
        {activeTab === 'general' && (
          <form className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Cinema Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Cinema Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Metropolis Cinema"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    defaultValue="contact@metropolis.com"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Address
                </label>
                <textarea
                  defaultValue="123 Movie Street, Entertainment District, City"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Business Hours</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Opening Time
                  </label>
                  <input
                    type="time"
                    defaultValue="10:00"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Closing Time
                  </label>
                  <input
                    type="time"
                    defaultValue="23:00"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                Save Changes
              </button>
            </div>
          </form>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Email Notifications</p>
                  <p className="text-sm text-gray-400">
                    Receive booking confirmations and updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">System Alerts</p>
                  <p className="text-sm text-gray-400">
                    Important system updates and maintenance notices
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">Security Settings</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}