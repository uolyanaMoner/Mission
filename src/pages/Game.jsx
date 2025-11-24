import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import us from "../assets/us.jpeg";
import six from "../assets/six.png";
import SnowCanvas from "../components/SnowCanvas";
import Confetti from "react-confetti";
import html2canvas from "html2canvas";

export default function GamePage() {
  const GRID_SIZE = 4;
  const TOTAL = GRID_SIZE * GRID_SIZE;

  const navigate = useNavigate();
  const correctOrder = [...Array(TOTAL).keys()];

  const puzzleRef = useRef(null);

  const [shuffled, setShuffled] = useState([]);
  const [first, setFirst] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [moves, setMoves] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  // Shuffle function
  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    let s = shuffleArray(correctOrder);
    while (s.join() === correctOrder.join()) s = shuffleArray(correctOrder);
    setShuffled(s);
  }, []);

  useEffect(() => {
    if (!solved) {
      const t = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => clearInterval(t);
    }
  }, [solved]);

  const playSound = () => {
    const audio = new Audio("/assets/success.mp3");
    audio.volume = 0.5;
    audio.play();
  };

  useEffect(() => {
    if (shuffled.length === 0) return;

    const isSolved = shuffled.every((v, i) => v === i);
    setSolved(isSolved);

    if (isSolved) {
      setShowConfetti(true);
      playSound();
      setTimeout(() => setShowPopup(true), 1200);
    }
  }, [shuffled]);

  const goNextPage = () => {
    navigate("/questions", { state: { time: seconds, moves } });
  };

  const swap = (i) => {
    if (first === null) {
      setFirst(i);
      return;
    }
    const newArr = [...shuffled];
    [newArr[first], newArr[i]] = [newArr[i], newArr[first]];
    setShuffled(newArr);
    setFirst(null);
    setMoves((m) => m + 1);
  };

  const handleScreenshot = async () => {
    if (!puzzleRef.current) return;
    const canvas = await html2canvas(puzzleRef.current);
    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = data;
    link.download = "puzzle_solved.png";
    link.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${six})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Snow */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <SnowCanvas />
      </div>

      {/* Persistent dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 5,
        }}
      />

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={600}
          gravity={0.3}
          tweenDuration={2000}
        />
      )}

      {/* Title */}
      <span
        className=" text-neutral-200 font-bold text-center text-4xl sm:text-4xl"
        style={{
          marginBottom: "10px",
          zIndex: 10,
        }}
      >
        bt3rfy tl3by Puzzle? idk hanshof 😂
      </span>

      <p style={{ zIndex: 10 }}>
        ⏱️ Time: <b>{seconds}</b> sec
      </p>
      <p style={{ marginBottom: "15px", zIndex: 10 }}>
        🔁 Moves: <b>{moves}</b>
      </p>

      {/* Puzzle */}
      <div
        ref={puzzleRef}
        style={{
          width: "min(96vmin, 500px)",
          height: "min(92vmin, 450px)",
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          gap: "4px",
          transition: "all 0.4s ease",
          zIndex: 10,
          position: "relative",
          marginTop: "10px",
          // spotlight effect
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.5) inset",
          borderRadius: "12px",
        }}
      >
        {shuffled.map((piece, i) => (
          <div
            key={i}
            onClick={() => swap(i)}
            style={{
              position: "relative",
              overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${us})`,
                backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                backgroundPosition: `-${(piece % GRID_SIZE) * 100}% -${
                  Math.floor(piece / GRID_SIZE) * 100
                }%`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(6px)",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              background: "white",
              color: "#333",
              padding: "25px",
              borderRadius: "20px",
              width: "90%",
              maxWidth: "360px",
              textAlign: "center",
              boxShadow: "0 0 20px rgba(255,80,120,0.4)",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "10px",
                color: "#ff4d6d",
              }}
            >
              🎉 You Did It!
            </h2>
            <p style={{ marginBottom: "18px" }}>
              Puzzle completed in <b>{seconds}</b> seconds and <b>{moves}</b>{" "}
              moves!
            </p>

            <button
              onClick={() => {
                setShowPopup(false);
                setShowButtons(true);
              }}
              style={{
                padding: "10px 20px",
                background: "#ff4d6d",
                color: "white",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                width: "100%",
                fontSize: "1.1rem",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {showButtons && (
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-6 z-10">
          <button
            onClick={handleScreenshot}
            style={{
              padding: "12px 32px",
              backgroundColor: "#830000",
              color: "white",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "1.125rem",
              transition: "background-color 0.2s",
            }}
          >
            Take Screenshot 📸
          </button>

          <button
            onClick={goNextPage}
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
            Continue 🚀
          </button>
        </div>
      )}

      <style>{`
        .puzzle-done {
          transform: scale(1.05);
          animation: pop 0.5s ease forwards;
        }
        @keyframes pop {
          0% { transform: scale(0.95); }
          60% { transform: scale(1.08); }
          100% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}
