import React from 'react';
import { AccentProvider } from './context/AccentContext';
import Navbar from './components/layout/Navbar';
import AnimatedHeading from './components/ui/AnimatedHeading';
import FamilyOverview from './components/sections/FamilyOverview';
import MemberSpotlight from './components/sections/MemberSpotlight';
import GallerySection from './components/sections/GallerySection';
import PhilosophySection from './components/sections/ContactSection';
import HorizontalGallery from './components/sections/HorizontalGallery';
import Timeline from './components/sections/Timeline';
import AchievementBadges from './components/sections/AchievementBadges';
import NumberCounter from './components/sections/NumberCounter';
import QuotesCarousel from './components/sections/QuotesCarousel';
import MarqueeText from './components/ui/MarqueeText';
import NoiseOverlay from './components/effects/NoiseOverlay';
import Preloader from './components/effects/Preloader';
import CustomCursor from './components/effects/CustomCursor';
import ScrollWatermark from './components/effects/ScrollWatermark';
import ScrollProgressBar from './components/effects/ScrollProgressBar';
import ScrollToTop from './components/effects/ScrollToTop';
import SectionDots from './components/effects/SectionDots';
import ParticleBackground from './components/effects/ParticleBackground';
import KonamiEaster from './components/effects/KonamiEaster';
import { familyMembers } from './data/familyData';
import { motion } from 'framer-motion';

function App() {
  return (
    <AccentProvider>
      <div className="min-h-screen">
        <Preloader />
        <ScrollProgressBar />
        <CustomCursor />
        <NoiseOverlay />
        <ScrollToTop />
        <SectionDots />
        <KonamiEaster />
        <Navbar />

        <main>
          {/* Hero Section with Particles */}
          <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden" id="home">
            <ParticleBackground />
            <div className="absolute inset-0 bg-cream -z-10 bg-topo opacity-10 pointer-events-none mix-blend-multiply"></div>
            
            {/* Scattered family names background */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
              {['KSHETRADNYA', 'ANRUNYA', 'VIVEK', 'BHAVANA', 'PATOLE', 'KSHETRADNYA'].map((name, i) => (
                <span
                  key={i}
                  className="absolute font-anton text-dark/[0.03] whitespace-nowrap hidden sm:block"
                  style={{
                    fontSize: `${Math.random() * 3 + 1.5}rem`,
                    top: `${(i * 15) % 100}%`,
                    left: `${((i * 37 + 13) % 100)}%`,
                    transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (5 + i * 3)}deg)`,
                    letterSpacing: '0.15em',
                  }}
                >
                  {name}
                </span>
              ))}
              {/* Mobile version - fewer names */}
              {['PATOLE', 'KSHETRADNYA', 'VIVEK'].map((name, i) => (
                <span
                  key={`mb-${i}`}
                  className="absolute font-anton text-dark/[0.02] whitespace-nowrap sm:hidden"
                  style={{
                    fontSize: `2.5rem`,
                    top: `${20 + (i * 25)}%`,
                    left: `${(i * 10)}%`,
                    transform: `rotate(-15deg)`,
                    letterSpacing: '0.1em',
                  }}
                >
                  {name}
                </span>
              ))}
            </div>

            <AnimatedHeading text1="THE" text2="PATOLES" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8 text-center px-6 relative z-10"
            >
              <p className="text-base md:text-xl font-inter text-dark/70 tracking-widest uppercase leading-loose">
                A legacy of <span className="text-accent-italic text-accent lowercase text-xl md:text-2xl mx-1 transition-colors duration-500">excellence</span>
              </p>
            </motion.div>
          </section>

          {/* Animated Number Stats */}
          <NumberCounter />

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

          {/* Quotes Carousel */}
          <QuotesCarousel />

          {/* Staggered Infinite Marquee Divider Reversed */}
          <div className="my-[4vw]">
            <MarqueeText text="BUILDING A LASTING LEGACY" reverse={true}/>
          </div>

          {/* Timeline */}
          <Timeline />

          {/* Achievement Badges */}
          <AchievementBadges />

          {/* Lando Norris Style Horizontal Side Scrolling Section */}
          <HorizontalGallery />

          {/* Moments & Memories */}
          <GallerySection />

          {/* Core Philosophy Manifesto */}
          <PhilosophySection />
          
        </main>
      </div>
    </AccentProvider>
  );
}

export default App;
