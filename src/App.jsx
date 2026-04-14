import React from 'react';
import { AccentProvider } from './context/AccentContext';
import Navbar from './components/layout/Navbar';
import AnimatedHeading from './components/ui/AnimatedHeading';
import FamilyOverview from './components/sections/FamilyOverview';
import MemberSpotlight from './components/sections/MemberSpotlight';
import GallerySection from './components/sections/GallerySection';
import ContactSection from './components/sections/ContactSection';
import HorizontalGallery from './components/sections/HorizontalGallery';
import MarqueeText from './components/ui/MarqueeText';
import NoiseOverlay from './components/effects/NoiseOverlay';
import Preloader from './components/effects/Preloader';
import CustomCursor from './components/effects/CustomCursor';
import ScrollWatermark from './components/effects/ScrollWatermark';
import { familyMembers } from './data/familyData';
import { motion } from 'framer-motion';

function App() {
  return (
    <AccentProvider>
      <div className="min-h-screen">
        <Preloader />
        <CustomCursor />
        <ScrollWatermark />
        <NoiseOverlay />
        <Navbar />

        <main>
          {/* Temporary Interactive Hero Content */}
          <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden" id="home">
            <div className="absolute inset-0 bg-cream -z-10 bg-topo opacity-10 pointer-events-none mix-blend-multiply"></div>
            
            <AnimatedHeading text1="THE" text2="PATOLES" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8 text-center px-4"
            >
              <p className="text-lg md:text-xl font-inter text-dark/70 tracking-widest uppercase">
                A legacy of <span className="text-accent-italic text-accent lowercase text-2xl mx-1 transition-colors duration-500">excellence</span>
              </p>
            </motion.div>
          </section>

          {/* Staggered Infinite Marquee Divider */}
          <div className="-mb-[2vw] relative z-30">
            <MarqueeText text="A JOURNEY OF EXCELLENCE" />
          </div>

          {/* Family Overview Section */}
          <FamilyOverview />

          {/* Member Spotlights */}
          {familyMembers.map((member, index) => (
            <MemberSpotlight 
              key={member.id} 
              member={member} 
              isAlternate={index % 2 !== 0} 
            />
          ))}

          {/* Staggered Infinite Marquee Divider Reversed */}
          <div className="my-[4vw]">
            <MarqueeText text="BUILDING A LASTING LEGACY" reverse={true}/>
          </div>

          {/* Lando Norris Style Horizontal Side Scrolling Section */}
          <HorizontalGallery />

          {/* Moments & Memories */}
          <GallerySection />

          {/* Contact Form */}
          <ContactSection />
          
        </main>
      </div>
    </AccentProvider>
  );
}

export default App;
