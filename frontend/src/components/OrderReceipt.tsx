'use client';

import React from 'react';
import { Printer, Download } from 'lucide-react';

interface ReceiptProps {
  orderId: string;
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

const OrderReceipt: React.FC<ReceiptProps> = ({
  orderId,
  customer,
  items,
  total,
  paymentMethod,
  date
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="order-receipt-root" className="flex flex-col items-center w-full max-w-md mx-auto print:max-w-none print:m-0 print:p-0">
      {/* Receipt Card */}
      <div 
        id="order-receipt"
        className="bg-white p-8 shadow-sm border border-gray-200 w-full font-mono text-sm text-black print:shadow-none print:border-none print:p-0 print:w-full print:absolute print:left-0 print:top-0 print:z-50"
        style={{ minHeight: '600px' }}
      >
        <div className="text-center space-y-1 mb-6">
          <h1 className="text-2xl font-black uppercase tracking-tighter">SpiceRoute</h1>
          <p className="text-xs italic">Authentic Karachi Flavors</p>
          <p className="text-xs">Nepa University Road, Karachi, Pakistan</p>
          <p className="text-xs">Tel: +92 3700300350</p>
          <div className="border-b border-dashed border-black my-4"></div>
          <h2 className="font-bold text-lg">ORDER RECEIPT</h2>
          <p className="text-[10px] text-gray-600">{date}</p>
        </div>

        <div className="space-y-1 mb-4 text-[12px]">
          <div className="flex justify-between">
            <span>Order ID:</span>
            <span className="font-bold">#{orderId.slice(-8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span>Customer:</span>
            <span className="font-bold">{customer.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Phone:</span>
            <span className="font-bold">{customer.phone}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment:</span>
            <span className="font-bold uppercase">{paymentMethod}</span>
          </div>
        </div>

        <div className="border-b border-dashed border-black my-4"></div>

        {/* Items Table */}
        <table className="w-full mb-4 text-[12px]">
          <thead>
            <tr className="border-b border-black">
              <th className="text-left py-2 font-bold uppercase">Item</th>
              <th className="text-center py-2 font-bold uppercase">Qty</th>
              <th className="text-right py-2 font-bold uppercase">Price</th>
              <th className="text-right py-2 font-bold uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-dashed border-gray-200">
                <td className="py-2 pr-1">{item.name}</td>
                <td className="py-2 text-center">{item.quantity}</td>
                <td className="py-2 text-right">{item.price}</td>
                <td className="py-2 text-right font-bold">{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-base font-black border-t-2 border-black pt-3">
            <span>TOTAL AMOUNT</span>
            <span>Rs. {total}</span>
          </div>
        </div>

        <div className="border-b border-dashed border-black my-6"></div>

        <div className="text-center space-y-2 text-[11px] italic">
          <p>Thank You for Your Order!</p>
          <p>Visit Again at SpiceRoute</p>
          <p className="mt-6 not-italic font-black text-xs">*** POS GENERATED SLIP ***</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full print:hidden px-4">
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#27251F] text-white font-bold rounded-2xl hover:bg-black transition-all transform hover:scale-[1.02] shadow-xl shadow-gray-200"
        >
          <Printer size={20} />
          Print Receipt
        </button>
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border-2 border-gray-100 text-[#27251F] font-bold rounded-2xl hover:border-[#27251F] transition-all transform hover:scale-[1.02] shadow-sm"
        >
          <Download size={20} />
          Save as PDF
        </button>
      </div>

      {/* Print CSS (Global trick to hide everything else) */}
      <style jsx global>{`
        @media print {
          body > * {
            display: none !important;
          }
          body > #order-receipt-root, #order-receipt-root * {
            display: block !important;
          }
          #order-receipt {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 20px !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderReceipt;
