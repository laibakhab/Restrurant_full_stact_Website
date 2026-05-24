import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Sarah Khan',
    role: 'Food Blogger',
    comment: 'The Biryani here is absolutely divine. Authentic Karachi taste that reminds me of home. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Zia Ahmed',
    role: 'Regular Customer',
    comment: 'Their BBQ platter is the best in town. Succulent, flavorful and served piping hot. Five stars for service too.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Fatima Ali',
    role: 'Local Resident',
    comment: 'The Zinger burgers are my kids favorite. Quick delivery and always fresh. SpiceRoute is our weekend go-to!',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  }
];

const Reviews = () => {
  return (
    <section className="py-24 bg-[#27251F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Voice of our <span className="text-[#E31837]">Fans</span>
          </h2>
          <div className="w-24 h-2 bg-[#E31837] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="bg-[#33312b] p-10 rounded-[3rem] relative border border-white/10 hover:border-[#E31837] transition-all duration-300 group shadow-2xl"
            >
              <Quote className="absolute top-8 right-10 text-white/10 group-hover:text-[#E31837]/20 transition-colors" size={64} />
              
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    size={20} 
                    className={index < review.rating ? "text-[#E31837] fill-[#E31837]" : "text-gray-600"} 
                  />
                ))}
              </div>
              
              <p className="text-gray-300 italic mb-10 text-lg leading-relaxed font-medium">"{review.comment}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-[#E31837] p-1 overflow-hidden">
                  <img src={review.avatar} alt={review.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-white text-lg tracking-tighter uppercase">{review.name}</h4>
                  <p className="text-sm text-[#E31837] font-bold uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
