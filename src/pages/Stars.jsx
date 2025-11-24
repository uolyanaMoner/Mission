import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import bg from "../assets/bg.png";
import SnowCanvas from "../components/SnowCanvas";
import { useNavigate } from "react-router-dom";

const starSoundUrl = "/star-sound.mp3";

const starsData = [
  { id: 1, message: " 💕أحلى حاجة حصلت في السنة اني عرفتك اكتر يا مارو " },
  {
    id: 2,
    message:
      " 😅😂 فاكرة لما رشيتي سبراي الافراح ف عيني؟ لو حد غيرك كان زماني مخصمة معاه",
  },
  {
    id: 3,
    message: "من أكتر الحاجات اللي بحبها فيكي اني بعرف اتعامل معاكي براحتي ",
  },
  { id: 4, message: "✨ لو في نجم على اسمك، هيبقى اللمعة دي واكتر" },
  { id: 5, message: "انتي سبب ضحك كتير ومشاوير حلوة حتى لو كنا بنكشف ع ايدي" },
  { id: 6, message: "قربتي جدًا… خطوة كمان بس ، متحمسة؟⭐" },
  { id: 7, message: "مستعدة؟… جه وقت الهدية 🎁✨" },
];

export default function StarPathChristmas() {
  const [activeStars, setActiveStars] = useState([]);
  const [currentHint, setCurrentHint] = useState("");
  const navigate = useNavigate();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [skyStars, setSkyStars] = useState([]);

  useEffect(() => {
    // تحديث حجم الشاشة عند تغييرها
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);

    const stars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 50,
      size: Math.random() * 3 + 2,
    }));
    setSkyStars(stars);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStarClick = (star) => {
    const audio = new Audio(starSoundUrl);
    audio.play().catch(() => {});

    setActiveStars((prev) => {
      let newActive;
      if (prev.includes(star.id)) {
        // toggle
        newActive = prev.filter((id) => id !== star.id);
      } else {
        newActive = [...prev, star.id];
      }
      return newActive;
    });

    setCurrentHint(star.message);
  };
  const showFinal = activeStars.includes(7);

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden select-none text-white p-6"
    >
      <div className="absolute inset-0 z-30 pointer-events-none">
        <SnowCanvas width={windowSize.width} height={windowSize.height} />
      </div>

      {/* نجوم السماء */}
      {skyStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 + Math.random() * 2 }}
        />
      ))}

      <h1 className="text-3xl mb-6 font-bold drop-shadow-lg text-center">
        {" "}
        Follow the star path to reach your gift ✨
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 sm:gap-6 mb-6 w-full max-w-4xl">
        {starsData.map((star) => (
          <motion.div
            key={star.id}
            onClick={() => handleStarClick(star)}
            whileTap={{ scale: 1.3 }}
            className={`w-16 h-16 flex items-center justify-center rounded-full text-3xl cursor-pointer transition-all
              ${
                activeStars.includes(star.id)
                  ? "bg-yellow-400 shadow-lg animate-pulse text-black"
                  : "bg-white/20 hover:bg-white/40"
              }
            `}
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ⭐
            </motion.span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {currentHint && (
          <motion.div
            key={currentHint}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-6"
          >
            <motion.p className="inline-block bg-black/50 px-4 py-2 rounded-lg text-yellow-300 shadow-md">
              {currentHint}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showFinal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center mt-6"
          >
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={300}
              recycle={false}
            />
            <p className="text-2xl mb-4 font-bold drop-shadow-lg">
              🎁 مبروك! وصلتِ للهدية! 🎄
            </p>
            <button
              onClick={() => navigate("/finallgift")}
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
              واخيرا هتشوفي المسج النهائية
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
