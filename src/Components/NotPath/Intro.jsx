import React, { useEffect, useState } from "react";

const Intro = ({ onFinish }) => {
  const [animate, setAnimate] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    
    const entryTimer = setTimeout(() => setAnimate(true), 100);

    
    const exitTimer = setTimeout(() => setExit(true), 3200);

  
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 4000);

    return () => {
      clearTimeout(entryTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const letters = ["O", "M", "K", "A", "R"];

  return (
    <div className="relative w-full h-screen bg-[#030014] flex items-center justify-center overflow-hidden font-sans">
      
   
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
      </div>

     
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-1000 ease-in-out ${
          exit ? "opacity-0 scale-95 blur-md" : "opacity-100 scale-100"
        }`}
      >
        {/* Subtle Header */}
        <div className={`overflow-hidden mb-4 transition-all duration-700 delay-700 ${animate ? "opacity-100" : "opacity-0"}`}>
            <span className="text-[10px] tracking-[0.8em] text-purple-300/50 uppercase font-light">
              Initialization
            </span>
        </div>

        <div className="flex gap-1 sm:gap-3 text-[clamp(48px,15vw,120px)] font-black tracking-tighter">
          {letters.map((letter, index) => (
            <span
              key={index}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
              className={`inline-block bg-gradient-to-b from-white via-purple-200 to-purple-500 bg-clip-text text-transparent
                transform transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)
                ${animate ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-75"}`}
            >
              {letter}
            </span>
          ))}
        </div>

       
        <div className={`mt-6 flex items-center gap-4 transition-all duration-1000 delay-[1000ms] ${animate ? "opacity-100" : "opacity-0"}`}>
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-purple-500" />
            <p className="text-[10px] sm:text-xs tracking-[4px] text-purple-200/70 uppercase font-medium">
                Full-Stack <span className="text-purple-400">Architect</span>
            </p>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-500" />
        </div>

      
        <div className="mt-12 w-48 h-[3px] bg-purple-900/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <div 
            className={`h-full bg-gradient-to-r from-purple-600 via-fuchsia-400 to-purple-600 shadow-[0_0_15px_rgba(192,132,252,0.8)]
            transition-all duration-[2500ms] ease-out
            ${animate ? "w-full" : "w-0"}`}
          />
        </div>
      </div>

      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-pulse {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Intro;