export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const slideUpString = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

export const revealRight = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: {
      type: "tween",
      ease: [0.77, 0, 0.175, 1], // easeInOutQuart
      duration: 0.8,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "tween",
      ease: [0.77, 0, 0.175, 1],
      duration: 0.8,
    },
  },
};
