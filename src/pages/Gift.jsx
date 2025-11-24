import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import backgroundUrl from "../assets/tree.png";
import bgImage from "../assets/six.png";
import SnowCanvas from "../components/SnowCanvas";
import { useNavigate } from "react-router-dom";

export default function GiftGame() {
  const [found, setFound] = useState(false);
  const [shake, setShake] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const hiddenSpot = "star";

  // نفس الإحداثيات بالظبط
  const spots = [
    {
      name: "star",
      style: { left: "40%", top: "10%", width: "20%", height: "20%" },
    },
    {
      name: "sofa",
      style: { left: "10%", top: "50%", width: "25%", height: "25%" },
    },
    {
      name: "fireplace",
      style: { left: "65%", top: "55%", width: "25%", height: "20%" },
    },
    {
      name: "window",
      style: { left: "70%", top: "15%", width: "20%", height: "25%" },
    },
  ];

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (spot) => {
    if (spot === hiddenSpot) {
      setFound(true);
      setScore(score + 10);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleReplay = () => {
    setFound(false);
    setScore(0);
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-start overflow-hidden relative py-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Snow */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <SnowCanvas />
      </div>

      {/* Confetti */}
      {found && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
        />
      )}

      {/* Title */}
      <div className="w-full max-w-4xl text-center mb-4 py-4 rounded-lg shadow-lg z-20">
        <h2 className="text-3xl md:text-4xl font-bold text-red-700">
          🎄 Find the Hidden Gift 🎄
        </h2>
        <p className="text-xl font-bold text-green-700 mt-2">
          ⭐ Score: {score}
        </p>
      </div>

      {/* GAME AREA */}
      <motion.div
        className="
          relative w-full max-w-4xl 
          h-[380px] sm:h-[450px] md:h-[550px] lg:h-[630px] xl:h-[700px]
          mx-auto rounded-xl overflow-hidden shadow-2xl 
          border-4 border-red-500/40
        "
        animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={backgroundUrl}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-[1]"
        />

        {/* Clickable Areas */}
        {spots.map((spot) => (
          <div
            key={spot.name}
            className="absolute cursor-pointer z-[5]"
            style={{ ...spot.style, opacity: 0 }}
            onClick={() => handleClick(spot.name)}
          />
        ))}
        <AnimatePresence>
          {found && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="absolute inset-0 flex justify-center items-center z-40"
            >
              <div className="p-6 rounded-2xl text-center text-white bg-black/40 backdrop-blur-md border-2 border-yellow-400 shadow-xl flex flex-col items-center gap-4">
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                  Congrats{" "}
                </h3>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    style={{
                      padding: "12px 32px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "0.5rem",
                      fontWeight: 600,
                      fontSize: "1.125rem",
                      transition: "background-color 0.2s",
                    }}
                    onClick={handleReplay}
                  >
                    Play again
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/stars");
                    }}
                    style={{
                      padding: "12px 32px",
                      backgroundColor: "#15803d",
                      color: "white",
                      borderRadius: "0.5rem",
                      fontWeight: 600,
                      fontSize: "1.125rem",
                      transition: "background-color 0.2s",
                    }}
                  >
                    Yala nl3b a5r game bgd! 😂
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
