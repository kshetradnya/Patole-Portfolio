import React, { useEffect, useRef, useState } from 'react';
import { useAccent } from '../../context/AccentContext';

// Some ambient free-to-use aesthetic tracks 
const tracks = {
  general: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_b2879a6136.mp3?filename=ambient-piano-amp-strings-10711.mp3",
  kshetradnya: "https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730bf7.mp3?filename=empty-mind-122100.mp3",
  anrunya: "https://cdn.pixabay.com/download/audio/2021/11/20/audio_510a7cb5d8.mp3?filename=space-120280.mp3",
  vivek: "https://cdn.pixabay.com/download/audio/2022/02/07/audio_0cbfaeb9d9.mp3?filename=atmospheric-piano-ambient-114511.mp3",
  bhavana: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_32c02cba67.mp3?filename=beautiful-ambient-116035.mp3"
};

const AudioController = () => {
  const { activeMember } = useAccent();
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRefs = useRef({});

  // Initialize audio elements
  useEffect(() => {
    Object.keys(tracks).forEach(key => {
      const audio = new Audio(tracks[key]);
      audio.loop = true;
      audio.volume = 0;
      audioRefs.current[key] = audio;
    });

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Play all muted to get around autoplay policy
        Object.values(audioRefs.current).forEach(a => a.play().catch(e=>console.log("Audio play prevented")));
      }
    };

    window.addEventListener('click', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      Object.values(audioRefs.current).forEach(a => {
        a.pause();
        a.src = "";
      });
    };
  }, [hasInteracted]);

  // Handle crossfading
  useEffect(() => {
    if (!hasInteracted) return;

    const targetTrack = activeMember || 'general';

    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      const targetVolume = (key === targetTrack) ? 0.15 : 0; // Very soft volume
      
      // Smooth fade
      const fadeInterval = setInterval(() => {
        if (Math.abs(audio.volume - targetVolume) < 0.05) {
          audio.volume = targetVolume;
          clearInterval(fadeInterval);
        } else {
          audio.volume += audio.volume < targetVolume ? 0.02 : -0.02;
        }
      }, 50);

      // Cleanup interval on unmount or re-run
      setTimeout(() => clearInterval(fadeInterval), 2000);
    });
  }, [activeMember, hasInteracted]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 mix-blend-difference text-cream">
      {!hasInteracted && (
        <span className="font-inter text-xs tracking-widest uppercase opacity-50 animate-pulse">
          Click anywhere to enable audio
        </span>
      )}
      <div className={`w-8 h-8 rounded-full border border-cream/30 flex items-center justify-center transition-opacity duration-1000 ${hasInteracted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-1 h-1 bg-cream rounded-full" />
      </div>
    </div>
  );
};

export default AudioController;
