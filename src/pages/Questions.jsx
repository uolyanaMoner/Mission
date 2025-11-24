import React, { useState } from "react";
import Confetti from "react-confetti";
import SnowCanvas from "../components/SnowCanvas";
import six from "../assets/four.png";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "مين دايمًا بيتاخر؟",
    options: [
      { text: "نانا", message: "لول بتهزري؟ اتقي الله😆" },
      { text: "مارو", message: "طبعا!! الرحلات تشهد 😉" },
    ],
  },
  {
    question: "كنا متفقين نلبس لون ايه في الرحلة؟ ",
    options: [
      { text: "أخضر", message: "متفقناش اصلا عشان ماعندكيش اخضر 😅😂" },
      { text: "أسود", message: "اتقي الله 😂" },
    ],
  },
  {
    question: "مين اللي بيضيع مفاتيحه أكتر؟",
    options: [
      { text: "نانا", message: "هي مرة 😅" },
      { text: "مارو", message: "لا انتي بيضيع منك فلوس بتتسرقي😂😆" },
    ],
  },
  {
    question: "أحلى رحلة روحناها؟",
    options: [
      {
        text: "رحلة اسكندرية",
        message: "حصل ده رايي برضو عشان مكنش ف مخدومين🌊",
      },
      {
        text: "رحلة البول السنة اللي فاتت",
        message: "كانت لطيفة بس دبان 😅😂",
      },
    ],
  },
  {
    question: "لما بنزعل مين بيصالح التاني؟",
    options: [
      { text: "نانا", message: "حصل عشان انا لطيفة ومدلعاكي😅" },
      { text: "مارو", message: "طب اتقي الله 😆" },
    ],
  },
  {
    question: "مين بيعرف يصورنا اكتر؟",
    options: [
      { text: "نانا", message: "لا محصلش " },
      { text: "مارو", message: "Selfie queen واضح 😂" },
    ],
  },
  {
    question: "مين بيغير رأيه قبل ما الرحلة بيوم",
    options: [
      {
        text: "نانا",
        message: "انا تقريبا هقولك انتي الله فوق ال100 مرة 😂😂",
      },
      { text: "مارو", message: "انتي بس كده كده مش هنعمل بكلامك 😂🔥" },
    ],
  },
  {
    question: "مين اللي بيحب يهزر طول الوقت؟",
    options: [
      { text: "نانا", message: "أكيد أنا 😝" },
      { text: "مارو", message: "😂 أيوه أنتي كمان خليها عليا" },
    ],
  },
  {
    question: "مين امينة الاعمال الفنية؟",
    options: [
      { text: "نانا", message: "لول أكيد لا " },
      { text: "مارو", message: "امينة الاعمال الفنية كلها يا فنانة 😂" },
    ],
  },
  {
    question: "بنحب نشير؟",
    options: [
      { text: "ايوة", message: "Sharing is caring bbe 💕 " },
      { text: "لا", message: " ممممم متاكدة؟ 🤔🤔" },
    ],
  },
];

export default function QuizAfterPuzzleFull() {
  const [currentQ, setCurrentQ] = useState(0);
  const [showMessage, setShowMessage] = useState("");
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (message) => {
    setShowMessage(message);
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
        setShowMessage("");
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div
      className="relative flex flex-col  items-center min-h-screen p-4 text-white overflow-hidden"
      style={{
        backgroundImage: `url(${six})`,
        backgroundSize: "cover",
        backgroundPosition: "left",
      }}
    >
      {/* Floating Glow Particles */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="animate-floatGlow absolute w-4 h-4 bg-green-300/40 rounded-full blur-xl left-20 top-32"></div>
        <div className="animate-floatGlow2 absolute w-5 h-5 bg-pink-300/40 rounded-full blur-xl right-24 top-20"></div>
        <div className="animate-floatGlow3 absolute w-3 h-3 bg-yellow-300/40 rounded-full blur-xl bottom-28 left-1/2"></div>
      </div>

      {/* Header */}
      <h3 className="text-center text-3xl md:text-6xl  font-extrabold mt-4 mb-6 drop-shadow-xl animate-slideDown tracking-wide">
        Quiz 3la el sari3 😅
        <br />
        <span className="text-xl md:text-3xl opacity-90">
          last one bgd w hatshofi el msg!
        </span>
      </h3>

      {/* Snow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SnowCanvas />
      </div>

      {/* Confetti */}
      {finished && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti numberOfPieces={450} recycle={false} />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Main Quiz Card */}
      {!finished ? (
        <div
          className="relative z-20 w-full max-w-xl p-8 rounded-2xl shadow-2xl 
        backdrop-blur-xl bg-white/10 border-[1px] border-white/40 
        animate-fadeInCard overflow-hidden"
        >
          {/* Animated Border Glow */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-transparent 
          animate-borderGlow pointer-events-none"
          ></div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-white/20 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #7DFFB3, #19C37D)",
              }}
            ></div>
          </div>

          {/* Question */}
          <h2
            className="text-2xl md:text-4xl font-bold mb-8 text-center 
          text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-popIn"
          >
            {questions[currentQ].question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-4">
            {questions[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.message)}
                className="px-6 py-4 bg-black/50 hover:bg-black/60 
                backdrop-blur-lg border border-white/30 rounded-xl text-white 
                font-semibold text-lg shadow-lg transition-all duration-300
                hover:scale-[1.04] active:scale-[0.96] 
                relative overflow-hidden group"
              >
                {/* Sparkle Hover */}
                <span className="absolute w-8 h-8 bg-white/40 rounded-full blur-xl opacity-0 group-hover:opacity-60 -top-2 -left-2 transition-all duration-300"></span>
                {opt.text}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showMessage && (
            <p className="mt-6 text-yellow-300 text-center text-xl drop-shadow-md animate-fadeIn">
              {showMessage}
            </p>
          )}
        </div>
      ) : (
        /* Finish Screen */
        <div
          className="relative z-20 flex flex-col items-center p-6 bg-black/50 rounded-2xl 
        shadow-xl backdrop-blur-md animate-fadeInCard"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 drop-shadow-lg animate-popIn">
            3ash ya Maro 🚀 <br /> yala nkml l3b 😉
          </h2>

          <button
            onClick={() => navigate("/doors")}
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
            Yala bina 🚀
          </button>
        </div>
      )}
    </div>
  );
}
