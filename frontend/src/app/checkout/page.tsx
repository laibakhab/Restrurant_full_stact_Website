'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { clearCart } from '@/store/cartSlice';
import { ArrowLeft, CheckCircle2, CreditCard, Wallet, Banknote, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import OrderReceipt from '@/components/OrderReceipt';

interface OrderSummary {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  paymentMethod: string;
  date: string;
}

const CheckoutPage = () => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const [loading, setLoading] = useState(false);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Karachi',
    paymentMethod: 'cod'
  });

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!mounted) return null;

  if (items.length === 0 && !orderSummary) {
    router.push('/menu');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderItems = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city
          },
          items: orderItems,
          total: totalAmount,
          paymentMethod: formData.paymentMethod
        })
      });

      const data = await res.json();

      if (res.ok) {
        setOrderSummary({
          id: data.orderId || Math.random().toString(36).substr(2, 9),
          customer: { ...formData },
          items: orderItems,
          total: totalAmount,
          paymentMethod: formData.paymentMethod,
          date: new Date().toLocaleString()
        });
        dispatch(clearCart());
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSummary) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 print:bg-white print:py-0">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 print:hidden">
            <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your order. Your delicious meal is being prepared!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Success Info */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 print:hidden order-2 lg:order-1">
              <h2 className="text-2xl font-black text-gray-900 mb-6">What's Next?</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">1</div>
                  <p className="text-gray-600 font-medium">Our chef is reviewing your order items.</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">2</div>
                  <p className="text-gray-600 font-medium">Your food will be prepared using fresh ingredients.</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">3</div>
                  <p className="text-gray-600 font-medium">Our rider will deliver it to your doorstep in 30-45 mins.</p>
                </li>
              </ul>
              
              <Link 
                href="/" 
                className="w-full inline-block py-4 bg-orange-600 text-white text-center font-bold rounded-2xl hover:bg-orange-700 transition shadow-lg shadow-orange-200"
              >
                Return to Home
              </Link>
            </div>

            {/* Receipt Component */}
            <div className="order-1 lg:order-2">
              <OrderReceipt 
                orderId={orderSummary.id}
                customer={orderSummary.customer}
                items={orderSummary.items}
                total={orderSummary.total}
                paymentMethod={orderSummary.paymentMethod}
                date={orderSummary.date}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="p-2 bg-white rounded-full text-gray-600 hover:text-orange-600 shadow-sm border border-gray-100">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-600 text-white rounded-2xl shadow-lg shadow-orange-200">
                    <MapPin size={20} />
                  </div>
                  Delivery Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl transition-all outline-none"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="03XX XXXXXXX"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl transition-all outline-none"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">City</label>
                    <select
                      name="city"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl transition-all outline-none appearance-none"
                      value={formData.city}
                      onChange={handleInputChange}
                    >
                      <option value="Karachi">Karachi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Delivery Address</label>
                    <textarea
                      required
                      rows={3}
                      name="address"
                      placeholder="House/Flat No, Street, Landmark..."
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl transition-all outline-none resize-none"
                      value={formData.address}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-600 text-white rounded-2xl shadow-lg shadow-orange-200">
                    <CreditCard size={20} />
                  </div>
                  Payment Method
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
                    { id: 'jazzcash', label: 'JazzCash', icon: Wallet },
                    { id: 'easypaisa', label: 'EasyPaisa', icon: Wallet },
                    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                  ].map((method) => (
                    <label 
                      key={method.id}
                      className={cn(
                        "relative flex items-center gap-4 p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all",
                        formData.paymentMethod === method.id 
                          ? "border-orange-600 bg-orange-50 ring-4 ring-orange-50" 
                          : "border-gray-100 hover:border-orange-200"
                      )}
                    >
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method.id}
                        className="hidden"
                        checked={formData.paymentMethod === method.id}
                        onChange={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                      />
                      <div className={cn(
                        "p-3 rounded-xl",
                        formData.paymentMethod === method.id ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-500"
                      )}>
                        <method.icon size={24} />
                      </div>
                      <span className={cn(
                        "font-bold",
                        formData.paymentMethod === method.id ? "text-orange-900" : "text-gray-600"
                      )}>{method.label}</span>
                      
                      {formData.paymentMethod === method.id && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 size={20} className="text-orange-600" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-5 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition shadow-xl shadow-orange-200 disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Processing Order...
                  </>
                ) : (
                  'Place Order Now'
                )}
              </button>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 no-scrollbar mb-8">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} className="h-16 w-16 rounded-2xl object-cover shadow-sm" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="text-gray-500 text-xs font-medium">{item.quantity} x Rs. {item.price}</p>
                    </div>
                    <div className="font-bold text-sm text-gray-900">
                      Rs. {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">Rs. {totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between text-gray-900 font-black text-2xl">
                  <span>Total</span>
                  <span>Rs. {totalAmount}</span>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-2xl flex items-center gap-3">
                <div className="p-2 bg-white rounded-full text-orange-600 shadow-sm">
                  <Banknote size={20} />
                </div>
                <p className="text-xs text-orange-800 font-bold leading-tight">
                  No hidden charges. Pay the amount at your doorstep or via mobile wallet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
