import React, { useState } from 'react';
import { Monitor, Plus, Calendar, Clock, Ticket, Settings } from 'lucide-react';
import { format } from 'date-fns';

// Mock data
const mockScreens = [
  {
    id: '1',
    name: 'Screen 1',
    capacity: {
      vip: 20,
      regular: 100,
      balcony: 50,
    },
    status: 'active',
  },
  {
    id: '2',
    name: 'Screen 2',
    capacity: {
      vip: 15,
      regular: 80,
      balcony: 40,
    },
    status: 'active',
  },
];

const mockShows = [
  {
    id: '1',
    movieId: '1',
    screenId: '1',
    movieTitle: 'Inception',
    startTime: '2024-03-20T14:00:00Z',
    endTime: '2024-03-20T16:30:00Z',
    price: {
      vip: 20,
      regular: 15,
      balcony: 12,
    },
    availableSeats: {
      vip: 15,
      regular: 75,
      balcony: 40,
    },
  },
  {
    id: '2',
    movieId: '2',
    screenId: '2',
    movieTitle: 'The Dark Knight',
    startTime: '2024-03-20T17:00:00Z',
    endTime: '2024-03-20T19:30:00Z',
    price: {
      vip: 20,
      regular: 15,
      balcony: 12,
    },
    availableSeats: {
      vip: 10,
      regular: 60,
      balcony: 30,
    },
  },
];

export default function Shows() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState('all');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          Shows Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Show
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={selectedScreen}
          onChange={(e) => setSelectedScreen(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Screens</option>
          {mockScreens.map((screen) => (
            <option key={screen.id} value={screen.id}>
              {screen.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Shows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockShows.map((show) => (
          <div key={show.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">{show.movieTitle}</h3>
                <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                  Screen {show.screenId}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{format(new Date(show.startTime), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>
                    {format(new Date(show.startTime), 'h:mm a')} -{' '}
                    {format(new Date(show.endTime), 'h:mm a')}
                  </span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Ticket className="h-5 w-5 mr-2" />
                  <span>
                    Available Seats: {
                      show.availableSeats.vip +
                      show.availableSeats.regular +
                      show.availableSeats.balcony
                    }
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400">VIP</p>
                    <p className="text-white font-semibold">${show.price.vip}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Regular</p>
                    <p className="text-white font-semibold">${show.price.regular}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Balcony</p>
                    <p className="text-white font-semibold">${show.price.balcony}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-blue-500 hover:text-blue-400 flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Show Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Show</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Movie
                </label>
                <select className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Movie</option>
                  <option value="1">Inception</option>
                  <option value="2">The Dark Knight</option>
                  <option value="1">sanam teri kasam</option>
                  <option value="2">ajab prem ki jagab kahani</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Screen
                </label>
                <select className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Screen</option>
                  {mockScreens.map((screen) => (
                    <option key={screen.id} value={screen.id}>
                      {screen.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    VIP Price
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Regular Price
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Balcony Price
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Add Show
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}