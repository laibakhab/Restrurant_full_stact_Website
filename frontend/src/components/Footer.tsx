import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#27251F] text-white pt-24 pb-12 border-t-4 border-[#E31837]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-4xl font-black text-[#E31837] mb-6 italic tracking-tighter">SPICEROUTE</h3>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              Karachi's ultimate destination for bold flavors and authentic street food. Since 2010.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-black mb-8 uppercase tracking-tighter text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/menu" className="text-gray-400 hover:text-[#E31837] transition font-bold uppercase text-sm tracking-widest">Our Menu</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#E31837] transition font-bold uppercase text-sm tracking-widest">Our Story</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-[#E31837] transition font-bold uppercase text-sm tracking-widest">Visuals</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#E31837] transition font-bold uppercase text-sm tracking-widest">Reach Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-black mb-8 uppercase tracking-tighter text-white">The Spot</h4>
            <ul className="space-y-6">
              <li className="flex items-start text-gray-400">
                <MapPin size={24} className="mr-3 text-[#E31837] flex-shrink-0" />
                <span className="font-medium">Nepa University Road, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={24} className="mr-3 text-[#E31837] flex-shrink-0" />
                <span className="font-bold">+92 3700300350</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={24} className="mr-3 text-[#E31837] flex-shrink-0" />
                <span className="font-bold">asifalikhan4485@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-black mb-8 uppercase tracking-tighter text-white">Join the Gang</h4>
            <div className="flex space-x-4 mb-8">
              <a href="#" className="p-4 bg-[#33312b] rounded-2xl hover:bg-[#E31837] transition-all transform hover:scale-110 shadow-lg text-white">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="p-4 bg-[#33312b] rounded-2xl hover:bg-[#E31837] transition-all transform hover:scale-110 shadow-lg text-white">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="p-4 bg-[#33312b] rounded-2xl hover:bg-[#E31837] transition-all transform hover:scale-110 shadow-lg text-white">
                <FaTwitter size={24} />
              </a>
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">
              Tag us in your foodies and get featured on our page! #SPICEROUTEGANG
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest">© {new Date().getFullYear()} SPICEROUTE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
