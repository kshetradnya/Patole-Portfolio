import React from 'react';
import AnimatedHeading from '../ui/AnimatedHeading';

const GallerySection = () => {
  return (
    <section className="min-h-screen bg-dark text-cream py-32 px-8 rounded-t-[48px] -mt-10 relative z-20" id="gallery">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <AnimatedHeading className="text-[clamp(3rem,8vw,6rem)]" text1="MOMENTS &" text2="MEMORIES" />
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Quick placeholders for the gallery */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className="aspect-square bg-cream/5 rounded-2xl overflow-hidden group cursor-pointer relative"
            >
              <div className="absolute inset-0 flex justify-center items-center font-anton text-4xl text-cream/20 group-hover:scale-110 transition-transform duration-700">
                PHOTO {i}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-inter uppercase tracking-widest text-sm font-bold">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
