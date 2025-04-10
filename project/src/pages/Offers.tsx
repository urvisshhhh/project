import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Gift, Ticket } from 'lucide-react';

const offers = [
  {
    id: '1',
    title: '10% Off with VISA Cards',
    description: 'Get 10% instant discount on movie tickets when you pay with your VISA credit or debit card.',
    code: 'VISA10',
    validUntil: '2024-03-31',
    icon: CreditCard
  },
  {
    id: '2',
    title: 'Buy 1 Get 1 Free',
    description: 'Book tickets for two and pay for one! Valid on selected movies every Wednesday.',
    code: 'BOGO',
    validUntil: '2024-03-31',
    icon: Gift
  },
  {
    id: '3',
    title: 'Wallet Cashback',
    description: 'Get up to $5 cashback when you pay using any digital wallet.',
    code: 'WALLET5',
    validUntil: '2024-03-31',
    icon: Wallet
  }
];

const Offers = () => {
  return (
    <div className="pt-16">
      <div className="relative h-[40vh]">
        <img
          src="https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
          alt="Offers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Special Offers</h1>
              <p className="text-xl text-gray-300">
                Discover amazing deals and discounts
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                  <offer.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-300 mb-4">{offer.description}</p>
                <div className="bg-gray-700 p-4 rounded-md mb-4">
                  <p className="text-sm text-gray-400">Promo Code</p>
                  <p className="text-lg font-mono text-gold">{offer.code}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Valid until {offer.validUntil}
                  </span>
                  <button className="bg-gold text-black px-4 py-2 rounded-md font-semibold hover:bg-gold/90 transition">
                    Apply Offer
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;