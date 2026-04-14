import React from 'react';
import AnimatedHeading from '../ui/AnimatedHeading';
import MagneticButton from '../ui/MagneticButton';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section className="min-h-screen bg-cream text-dark py-32 px-8 md:px-16 relative z-20 flex flex-col justify-between" id="contact">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 h-full flex-grow pt-20">
        
        {/* Left Side: Massive Typography */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-anton text-[clamp(4rem,8vw,12rem)] leading-none uppercase text-dark tracking-tighter">
              LET'S
              <br />
              <span className="text-[var(--accent)] transition-colors duration-1000 mix-blend-multiply">TALK.</span>
            </h2>
            <p className="mt-8 font-playfair italic text-2xl md:text-3xl opacity-80 max-w-md">
              "We're always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
            </p>
          </div>

          <div className="mt-20 lg:mt-0 font-inter text-lg space-y-4">
            <MagneticButton>
              <a href="mailto:hello@patole.family" className="inline-block border-b-2 border-dark pb-1 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors font-bold tracking-widest text-xl">
                hello@patole.family
              </a>
            </MagneticButton>
            <p className="opacity-60 text-sm tracking-[0.2em] uppercase pt-4">Mumbai, India</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex items-center">
          <form className="w-full flex flex-col gap-12">
            <div className="flex flex-col gap-2 relative group">
              <label className="font-anton tracking-widest text-sm opacity-50 group-focus-within:text-[var(--accent)] transition-colors">01. WHAT'S YOUR NAME?</label>
              <input type="text" className="bg-transparent border-b-2 border-dark/20 py-4 text-2xl font-inter focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="John Doe *" />
            </div>
            
            <div className="flex flex-col gap-2 relative group">
              <label className="font-anton tracking-widest text-sm opacity-50 group-focus-within:text-[var(--accent)] transition-colors">02. WHAT'S YOUR EMAIL?</label>
              <input type="email" className="bg-transparent border-b-2 border-dark/20 py-4 text-2xl font-inter focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="john@example.com *" />
            </div>

            <div className="flex flex-col gap-2 relative group">
              <label className="font-anton tracking-widest text-sm opacity-50 group-focus-within:text-[var(--accent)] transition-colors">03. YOUR MESSAGE</label>
              <textarea rows="3" className="bg-transparent border-b-2 border-dark/20 py-4 text-2xl font-inter focus:outline-none focus:border-[var(--accent)] transition-colors resize-none" placeholder="Hello Patoles, ... *"></textarea>
            </div>
            
            <div className="pt-8">
              <MagneticButton>
                <button type="button" className="w-[180px] h-[180px] rounded-full bg-dark text-cream font-bold tracking-widest uppercase text-sm hover:scale-95 transition-transform duration-500 hover:bg-[var(--accent)]">
                  Send It
                </button>
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
      
      {/* Mini Footer embedded in Contact */}
      <footer className="w-full flex justify-between items-end mt-32 border-t border-dark/10 pt-8 font-inter text-xs tracking-widest uppercase font-bold opacity-50">
        <div>© 2026 Patole Family</div>
        <div className="text-right">Designed & Built by Kshetradnya</div>
      </footer>
    </section>
  );
};

export default ContactSection;
