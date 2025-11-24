import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SnowCanvas from "../components/SnowCanvas";
import Confetti from "react-confetti";
import two from "../assets/two.png";

export default function EnterCode() {
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const SECRET = "Maro2026";

  const handleUnlock = () => {
    if (code.trim().toLowerCase() === SECRET.toLowerCase()) {
      setSuccess(true);
      setTimeout(() => navigate("/puzzle"), 3500);
    } else {
      alert("Nope 🎅! Try again.");
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center  text-white p-6 overflow-hidden"
      style={{
        backgroundImage: `url(${two})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
    >
      {/* Snow ABOVE the background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SnowCanvas />
      </div>

      {/* Dark overlay ABOVE snow but BELOW content */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

      {/* Confetti on success */}
      {success && <Confetti numberOfPieces={300} recycle={false} />}

      {/* Santa icon + title */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-6  z-10"
      >
        <div className="text-3xl drop-shadow-lg" style={{ lineHeight: "1.5" }}>
          Hey <span className="text-green-500 font-bold">Marmori</span> 💕
          <br /> Yalla nl3b sawa 😉
        </div>
        <span className="text-4xl sm:text-6xl font-bold mt-4 text-red-300 drop-shadow-lg">
          Enter Santa Code
        </span>
        <span className="text-bold sm:text-xl font-bold mt-4 text-red-300 drop-shadow-lg">
          htla2i codes f el box.. wa7d mnhom sah
        </span>
      </motion.div>

      {/* Input card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-xl w-72 flex flex-col items-center border border-white/20 z-10"
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Secret code...🤫"
          className="w-full text-center p-3 bg-white/20 rounded-xl text-white
          placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={handleUnlock}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="
    mt-6 
    bg-gradient-to-r from-green-700 to-green-800 
    hover:from-green-600 hover:to-green-700
    text-white font-bold 
    py-3 px-12 
    rounded-2xl 
    shadow-[0_0_18px_rgba(255,80,80,0.7)]
    border border-red-300/40
    text-lg 
    flex items-center gap-2 
    z-20
    transition-all 
    duration-200
  "
      >
        Unlock 🎁
      </motion.button>
    </div>
  );
}
