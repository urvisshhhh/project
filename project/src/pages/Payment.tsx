import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Globe, QrCode, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Payment method types
type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'qr';

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [isAppliedCoupon, setIsAppliedCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Handle card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(formatCardNumber(value));
  };

  // Handle expiry date input
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      const month = value.substring(0, 2);
      const year = value.substring(2, 4);
      
      if (value.length <= 2) {
        setCardExpiry(value);
      } else {
        setCardExpiry(`${month}/${year}`);
      }
    }
  };

  // Apply coupon
  const applyCoupon = () => {
    if (couponCode.trim() !== '') {
      setIsAppliedCoupon(true);
    }
  };

  // Banks list for net banking
  const banks = [
    { id: 'hdfc', name: 'HDFC Bank' },
    { id: 'sbi', name: 'State Bank of India' },
    { id: 'icici', name: 'ICICI Bank' },
    { id: 'axis', name: 'Axis Bank' },
    { id: 'kotak', name: 'Kotak Mahindra Bank' },
  ];

  // UPI apps
  const upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: '📱' },
    { id: 'phonepe', name: 'PhonePe', icon: '📱' },
    { id: 'paytm', name: 'Paytm', icon: '📱' },
    { id: 'amazonpay', name: 'Amazon Pay', icon: '📱' },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Payment</h1>
          <p className="text-gray-400">Complete your booking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment method selector */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-4">
                <button
                  className={`py-4 flex flex-col items-center justify-center transition ${
                    selectedMethod === 'card' ? 'bg-gold text-black' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedMethod('card')}
                >
                  <CreditCard className="w-6 h-6 mb-1" />
                  <span className="text-sm">Cards</span>
                </button>
                <button
                  className={`py-4 flex flex-col items-center justify-center transition ${
                    selectedMethod === 'upi' ? 'bg-gold text-black' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedMethod('upi')}
                >
                  <Smartphone className="w-6 h-6 mb-1" />
                  <span className="text-sm">UPI</span>
                </button>
                <button
                  className={`py-4 flex flex-col items-center justify-center transition ${
                    selectedMethod === 'netbanking' ? 'bg-gold text-black' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedMethod('netbanking')}
                >
                  <Globe className="w-6 h-6 mb-1" />
                  <span className="text-sm">Net Banking</span>
                </button>
                <button
                  className={`py-4 flex flex-col items-center justify-center transition ${
                    selectedMethod === 'qr' ? 'bg-gold text-black' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedMethod('qr')}
                >
                  <QrCode className="w-6 h-6 mb-1" />
                  <span className="text-sm">QR Code</span>
                </button>
              </div>

              <div className="p-6">
                {/* Credit/Debit Card Form */}
                {selectedMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          placeholder="123"
                          maxLength={3}
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* UPI Form */}
                {selectedMethod === 'upi' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@upi"
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-300 mb-2">Or pay using</p>
                      <div className="grid grid-cols-4 gap-2">
                        {upiApps.map((app) => (
                          <button
                            key={app.id}
                            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-md flex flex-col items-center transition"
                          >
                            <span className="text-2xl mb-1">{app.icon}</span>
                            <span className="text-xs">{app.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Net Banking Form */}
                {selectedMethod === 'netbanking' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Bank
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {banks.map((bank) => (
                          <button
                            key={bank.id}
                            onClick={() => setSelectedBank(bank.id)}
                            className={`px-4 py-3 rounded-md text-left transition ${
                              selectedBank === bank.id
                                ? 'bg-gold text-black'
                                : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                          >
                            {bank.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* QR Code */}
                {selectedMethod === 'qr' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-white p-4 rounded-md mb-4">
                      <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-black" />
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Scan this QR code with any UPI app to pay
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Promo code */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Apply Promo Code</h3>
                {isAppliedCoupon && (
                  <span className="text-green-500 flex items-center">
                    <Check className="w-4 h-4 mr-1" /> Applied
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-grow bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  disabled={isAppliedCoupon}
                />
                <button
                  onClick={applyCoupon}
                  disabled={isAppliedCoupon || couponCode.trim() === ''}
                  className="bg-gold text-black px-6 py-3 rounded-md font-semibold hover:bg-gold/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Dune: Part Two</h3>
                  <p className="text-gray-400">IMAX • English</p>
                  <p className="text-gray-400">Friday, 15 March 2024 • 4:00 PM</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Selected Seats</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-700 rounded text-sm">A4</span>
                    <span className="px-2 py-1 bg-gray-700 rounded text-sm">A5</span>
                    <span className="px-2 py-1 bg-gray-700 rounded text-sm">A6</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Ticket Price (3)</span>
                    <span>₹1500</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Convenience Fee</span>
                    <span>₹30</span>
                  </div>
                  {isAppliedCoupon && (
                    <div className="flex justify-between mb-2 text-green-500">
                      <span>Promo Code Discount</span>
                      <span>-₹150</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-700">
                    <span>Total</span>
                    <span>₹{isAppliedCoupon ? 1380 : 1530}</span>
                  </div>
                </div>
                
                <Link
                  to="/booking-confirmation"
                  className="w-full bg-gold text-black font-semibold py-3 rounded-md hover:bg-gold/90 transition flex items-center justify-center gap-2 mt-4"
                >
                  Pay ₹{isAppliedCoupon ? 1380 : 1530}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;