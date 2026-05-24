'use client';

import Hero from "@/components/Hero";
import FeaturedDishes from "@/components/FeaturedDishes";
import Categories from "@/components/Categories";
import Reviews from "@/components/Reviews";
import { Utensils, Truck, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Utensils, title: "Premium Quality", desc: "Hand-picked ingredients for ultimate flavor." },
              { icon: Truck, title: "Fast Delivery", desc: "Under 30 mins or it's on us!" },
              { icon: Clock, title: "Open 24/7", desc: "Midnight cravings? We got you." },
              { icon: ShieldCheck, title: "Hygenic Food", desc: "Safe, clean, and healthy standards." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-10 bg-gray-50 rounded-[3rem] hover:bg-[#E31837] group transition-all duration-500 hover:shadow-2xl"
              >
                <div className="p-4 bg-white rounded-2xl text-[#E31837] mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <feature.icon size={40} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-xl mb-3 text-[#27251F] uppercase tracking-tighter group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-gray-500 font-medium group-hover:text-white/80 transition-colors leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Categories />

      <FeaturedDishes />

      {/* Promotions Banner */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[4rem] overflow-hidden bg-[#E31837] h-[400px] flex items-center shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Promo" 
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#E31837] via-[#E31837]/60 to-transparent"></div>
            </div>
            <div className="relative z-10 px-12 lg:px-20 lg:w-3/5 text-center lg:text-left">
              <span className="inline-block px-4 py-1 bg-white text-[#E31837] text-xs font-black uppercase tracking-widest rounded-full mb-6">
                Limited Time Offer
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-none uppercase italic tracking-tighter">
                Get 20% OFF <br /> 
                <span className="text-white/80 text-3xl md:text-5xl">Your First Bite!</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <Link 
                  href="/menu" 
                  className="px-10 py-4 bg-[#27251F] text-white font-black rounded-full hover:bg-white hover:text-[#E31837] transition-all transform hover:scale-105 shadow-2xl uppercase tracking-wider text-sm"
                >
                  Order Now
                </Link>
                <p className="text-white/90 text-lg font-black italic tracking-widest">
                  CODE: <span className="bg-white/20 px-3 py-1 rounded-lg">WELCOME20</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Reviews />

      {/* About Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white"
              >
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="About us" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#E31837] rounded-full mix-blend-multiply opacity-20 -z-0"></div>
            </div>
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#E31837] font-black tracking-widest uppercase text-sm mb-6 block border-l-4 border-[#E31837] pl-4">Since 2010</span>
                <h2 className="text-5xl md:text-7xl font-black text-[#27251F] mb-8 leading-none uppercase tracking-tighter italic">
                  Bold Flavor <br />
                  <span className="text-[#E31837]">No Rules.</span>
                </h2>
                <div className="space-y-6 text-gray-500 font-medium text-lg leading-relaxed mb-10">
                  <p>
                    We didn't come here to follow the recipe book. We came here to write a new one. SpiceRoute is where Karachi's heritage meets a bold new attitude.
                  </p>
                  <p>
                    Every flame, every spice, every bite is a statement. We serve the people who don't just eat food—they experience it.
                  </p>
                </div>
                <Link href="/about" className="group inline-flex items-center gap-4 text-2xl font-black text-[#27251F] uppercase italic tracking-tighter hover:text-[#E31837] transition-colors">
                  Hear Our Story
                  <div className="w-12 h-0.5 bg-[#E31837] group-hover:w-20 transition-all"></div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
