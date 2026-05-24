'use client';

import React from 'react';

const galleryImages = [
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

const GalleryPage = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A visual journey through our kitchen, our food, and the vibrant atmosphere of SpiceRoute.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <div 
              key={index} 
              className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg border-2 border-white px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Large
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 p-12 bg-orange-50 rounded-[3rem] text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience it yourself</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            There's nothing quite like the real thing. Visit us today for an unforgettable dining experience in the heart of Karachi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/menu" className="px-8 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition shadow-lg">
              Order Online
            </a>
            <a href="/contact" className="px-8 py-3 bg-white text-orange-600 font-bold rounded-full border border-orange-100 hover:bg-gray-50 transition shadow-sm">
              Book a Table
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
