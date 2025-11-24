import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import SnowCanvas from "../components/SnowCanvas";

import doorIcon from "../assets/door2.jpg";
import memoryPic from "../assets/us1.png";
import funnyVideo from "../assets/funnyvid.mp4";
import bgImage from "../assets/seven.png";

export default function SecretDoors() {
  const navigate = useNavigate();
  const correctDoor = 3;

  const doorsContent = {
    1: {
      type: "memory",
      img: memoryPic,
      isVideo: false,
      message: "Our Memories💖",
    },
    2: { type: "funny", img: funnyVideo, isVideo: true, message: "" },
    3: { type: "gift", isVideo: false,   message: " Congrats! You found the right door! Ready for a new game?🎉🎁", },
  };

  const [selected, setSelected] = useState(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);

  const handleSelect = (num) => {
    setSelected(num);
    setVideoStarted(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const startVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setVideoStarted(true);
    }
  };

  return (
    <div
      className="relative min-h-screen text-white flex flex-col items-center pt-20 pb-32 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* SnowCanvas */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <SnowCanvas />
      </div>

      {/* Confetti */}
      {selected === correctDoor && (
        <Confetti recycle={false} numberOfPieces={220} gravity={0.3} />
      )}

      {/* Title */}
      <h1 className="relative z-20 text-4xl md:text-5xl font-bold mb-14 text-yellow-300 drop-shadow-[2px_2px_8px_rgba(255,215,0,0.7)] text-center px-4">
        Choose the Misery Door 🎁✨
      </h1>

      {/* Doors */}
      <div className="relative z-20 flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            onClick={() => handleSelect(num)}
            className="w-52 h-72 md:w-64 md:h-96 perspective-[1000px] cursor-pointer"
          >
            <div
              className={`relative w-full h-full rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 transform-style-3d ${
                selected === num ? "rotate-y-180" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden rounded-3xl border-4 border-yellow-400 shadow-inner shadow-yellow-300/30 overflow-hidden">
                <img
                  src={doorIcon}
                  className="w-full h-full object-cover"
                  alt="door"
                />
              </div>

              {/* Back */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#0b2734]/85 flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl shadow-[0_0_30px_rgba(255,215,0,0.5)] border border-yellow-400/30 text-center">
                <h2 className="text-lg md:text-2xl mb-6">
                  {doorsContent[num].message}
                </h2>

                {/* Video or image */}
                {doorsContent[num].isVideo ? (
                  <div className="relative flex flex-col items-center">
                    {!videoStarted && selected === num && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startVideo();
                        }}
                        className="absolute z-50 flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:bg-white/30 transition-all duration-300 animate-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        <span className="text-white text-3xl translate-x-[2px]">
                          ▶
                        </span>
                      </button>
                    )}
                    <video
                      ref={videoRef}
                      src={funnyVideo}
                      className="w-36 md:w-44 rounded-xl shadow-lg object-cover"
                      controls={videoStarted}
                      muted={!videoStarted}
                      playsInline
                    />
                  </div>
                ) : num !== 3 ? (
                  <img
                    src={doorsContent[num].img}
                    className="w-36 md:w-44 rounded-xl shadow-lg object-cover"
                    alt=""
                  />
                ) : null}

                {/* زرار رقم 3 فقط */}
                {num === 3 && selected === 3 && (
                  <div className="mt-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/gift");
                      }}
                      className="new-game-btn"
                    > Yala nl3b last game 🎮
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS إضافي */}
      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
        .transform-style-3d { transform-style: preserve-3d; }

        /* زرار الباب 3 */
        .new-game-btn {
          padding: 14px 28px;
          font-size: 1.25rem;
          font-weight: bold;
          color: #000;
          background: linear-gradient(135deg, #fcd34d, #fbbf24);
          border-radius: 24px;
          border: none;
          box-shadow: 0 0 20px rgba(252, 211, 77, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: pulse 1.5s infinite;
        }
        .new-game-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(252, 211, 77, 1);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
