'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, X } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have a question or want to book a table? We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Our Location</h3>
                    <p className="text-gray-600">Nepa, University Road, Karachi, Pakistan</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Phone Number</h3>
                    <a href="tel:+923700300350" className="text-gray-600 hover:text-orange-600 transition">+92 3700300350</a>
                    <p className="text-gray-400 text-sm mt-1">Available 24/7 for delivery</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Email Address</h3>
                    <p className="text-gray-600">info@spiceroute.pk</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Opening Hours</h3>
                    <p className="text-gray-600">Mon - Sun: 12:00 PM - 03:00 AM</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Follow Our Journey</h3>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-orange-600 hover:text-white transition">
                    <X size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="h-[500px] lg:h-auto rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.123456789!2d67.0912345!3d24.9123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f4a1234567%3A0x1234567890abcdef!2sNepa%20Chowrangi%2C%20University%20Rd%2C%20Karachi!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
