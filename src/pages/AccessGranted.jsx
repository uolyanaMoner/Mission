import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import us2 from "../assets/us2.jpeg";
import us3 from "../assets/us3.jpeg";
import us4 from "../assets/us4.jpeg";
import us5 from "../assets/us5.jpeg";
import us6 from "../assets/us6.jpeg";
import us7 from "../assets/us7.jpeg";
import us8 from "../assets/us8.jpeg";
import us9 from "../assets/funny.jpeg";
import us10 from "../assets/us10.jpeg";
import bg from "../assets/three.png";
import videoSrc from "../assets/video.mp4"; 
const polaroidImages = [us2, us3, us4, us5, us6, us7, us8, us9, us10];

const messageLines = [
  " لكن الحقيقة… الرسالة دي مني أنا ليكي ❤️ ",
  " كل لحظة معاكِ السنة دي كانت مميزة ضحكنا او اتقمصنا كانوا لطاف جدا بجد  ❤️ ",
  " كل صورة لينا فيها ذكرى حلوة وبحبها 💕",
  " مستنية نعمل السنادي ذكريات اكتر سوا 😍💕 ",
  " You deserve the best and so much more 🚀💕 ",
  " واخيرا كل حاجة اتعملت ع الويب سايت ده كانت من جوه جوه قلبي ، انتي غالية عندي جدا وبجد بعتبرك زي كارين ",
  " Merry Christmas Marmori 💕, Te amo mucho 💕💕 ",
];

export default function SantaLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showPolaroids, setShowPolaroids] = useState(false);
  const [displayedLines, setDisplayedLines] = useState(
    messageLines.map(() => "")
  );

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowLetter(true), 1000);
  };

  useEffect(() => {
    if (!showLetter) return;

    let currentLine = 0;
    let currentChar = 0;

    const typeNext = () => {
      if (currentLine >= messageLines.length) {
        setTimeout(() => setShowPolaroids(true), 500);
        return;
      }

      if (
        messageLines[currentLine] &&
        currentChar < messageLines[currentLine].length
      ) {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLine] === undefined) newLines[currentLine] = "";
          const char = messageLines[currentLine][currentChar] || "";
          newLines[currentLine] = (newLines[currentLine] || "") + char;
          return newLines;
        });
        currentChar++;
        setTimeout(typeNext, 50);
      } else {
        currentLine++;
        currentChar = 0;
        setTimeout(typeNext, 400);
      }
    };

    typeNext();
  }, [showLetter]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Envelope */}
      {!isOpen && (
        <motion.div
          className="relative w-96 h-64 cursor-pointer perspective-1500"
          onClick={handleOpen}
        >
          {/* Flap top */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-600 to-red-700 clip-flap shadow-2xl z-20"
            style={{ transformOrigin: "bottom" }}
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: -180 } : {}}
            transition={{ duration: 1 }}
          />
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-b from-red-500 to-red-600 rounded-b-3xl shadow-xl z-10">
            <div className="absolute bottom-0 w-full h-1/2 bg-red-500 clip-envelope-side"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-red-600 clip-envelope-side2"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl z-30">
            رسالة من سانتا ليك 🎅
          </div>
        </motion.div>
      )}
      {showLetter && (
        <motion.div
          initial={{ y: 200, opacity: 0, rotate: -5 }}
          animate={{ y: -20, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-10 rounded-2xl shadow-2xl w-11/12 sm:w-3/4 md:w-1/2 text-center mt-8"
        >
          {displayedLines.map((line, idx) => (
            <div key={idx} className="mb-4 text-lg sm:text-xl font-sans text-black">
              {line}
            </div>
          ))}

          {showPolaroids && (
            <>
              <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
                {polaroidImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 p-2 shadow-md rounded border-2 border-white"
                    initial={{ opacity: 0, y: -20, rotate: Math.random() * 20 - 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.3 }}
                  >
                    <img
                      src={img}
                      alt={`polaroid-${idx}`}
                      className="w-full h-full object-contain rounded"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Video */}
              <div className="mt-8 w-full flex justify-center">
                <video
                  src={videoSrc}
                  controls
                  className="w-full sm:w-3/4 md:w-1/2 rounded-2xl shadow-lg"
                />
              </div>
            </>
          )}
        </motion.div>
      )}
      <style>{`
        .clip-flap {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .clip-envelope-side {
          clip-path: polygon(0 0, 50% 100%, 0 100%);
        }
        .clip-envelope-side2 {
          clip-path: polygon(100% 0, 50% 100%, 100% 100%);
        }
        .perspective-1500 {
          perspective: 1500px;
        }
      `}</style>
    </div>
  );
}
