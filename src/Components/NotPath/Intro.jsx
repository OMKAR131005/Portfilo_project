import React, { useEffect, useState } from "react";

const Intro = ({ onFinish }) => {
  const [animate, setAnimate] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const entryTimer = setTimeout(() => setAnimate(true), 100);
    const exitTimer = setTimeout(() => setExit(true), 3500);
    const finishTimer = setTimeout(() => onFinish && onFinish(), 4300);

    return () => {
      [entryTimer, exitTimer, finishTimer].forEach(clearTimeout);
    };
  }, [onFinish]);

  // We use your name letters but render them as high-quality SVGs or Styled spans
  // to avoid the "Small Device R" problem found in console-based Java logic.
  const name = ["O", "M", "K", "A", "R"];

  return (
    <div className="relative w-full h-screen bg-[#0a001a] flex items-center justify-center overflow-hidden font-mono">
      
      {/* 🌌 Cyber-Purple Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-700/20 blur-[150px] animate-pulse" />
        {/* Subtle Grid Overlay (Java/Logic vibe) */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', size: '20px 20px' }} 
        />
      </div>

      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${exit ? "opacity-0 translate-y-[-20px] blur-lg" : "opacity-100"}`}>
        
        {/* Top Tag */}
        <div className={`mb-8 text-xs tracking-[0.5em] text-purple-400/60 uppercase transition-all duration-1000 delay-300 ${animate ? "opacity-100" : "opacity-0"}`}>
          System.out.println("Welcome")
        </div>

        {/* 🔥 Responsive Name Section */}
        <div className="flex gap-2 md:gap-6">
          {name.map((char, i) => (
            <span
              key={i}
              style={{ transitionDelay: `${i * 150 + 500}ms` }}
              className={`text-[clamp(40px,12vw,100px)] font-black transition-all duration-700
                ${animate ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-50"}
                bg-gradient-to-t from-purple-700 via-purple-400 to-white bg-clip-text text-transparent
                drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]`}
            >
              {char}
            </span>
          ))}
        </div>

        {/* 🛠️ The "R" Fix & Tech Line */}
        <div className={`mt-8 flex flex-col items-center transition-all duration-1000 delay-[1200ms] ${animate ? "opacity-100" : "opacity-0"}`}>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-4" />
          <p className="text-[10px] sm:text-xs text-purple-300/80 tracking-[3px] uppercase">
             Full-Stack <span className="text-white">Developer</span> 
          </p>
        </div>

        {/* Progress Bar (Visualizing your Java size logic) */}
        <div className="mt-12 w-64 h-[4px] bg-purple-950 rounded-full overflow-hidden border border-purple-500/20">
          <div 
            className={`h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-400 transition-all duration-[2000ms] ease-in-out
            ${animate ? "w-full" : "w-0"}`}
          />
        </div>
      </div>

      {/* Decorative "Code" Floating snippets */}
      <div className="hidden lg:block absolute bottom-10 left-10 text-purple-500/20 text-[10px] space-y-1">
        <p>public class Java$pringBoot {"{"}</p>
        <p className="ml-4">String name = new String("Omkar") {"{"}</p>
        <p className="ml-8">return name;</p>
        <p className="ml-4">{"}"}</p>
        <p>{"}"}</p>
      </div>
    </div>
  );
};

export default Intro;