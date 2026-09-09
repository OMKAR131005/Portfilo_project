import { useState } from "react";
import Intro from "./Intro.jsx";
import { Outlet } from "react-router-dom";
const IntroGate = () => {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  return <Outlet />;
};

export default IntroGate;