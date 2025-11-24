import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SnowCanvas from "../components/SnowCanvas";
import one from '../assets/one.png';
import { useNavigate } from "react-router-dom";



export default function Landing() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/mission");
    };

    useEffect(() => {
        const handleScroll = () => {
            const bg = document.getElementById("landing‑bg");
            const y = window.scrollY / 4;
            bg.style.backgroundPosition = `center ${y}px`;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    return (
        <div
            id="landing-bg"
            className="relative w-full min-h-screen flex flex-col items-center justify-center text-white font-bold p-6 overflow-hidden"
            style={{
                backgroundImage: `url(${one})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/40 z-0"></div>

            {/* Snow layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <SnowCanvas />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6 text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
                <span className="text-2xl md:text-5xl mt-20 font-extrabold">
                    🎄 Your Christmas Secret Mission 🎁
                </span>
                <p className="text-2xl font-bold">R u ready ya<span className="text-red-800"> Maria?</span> 😅😂</p>

                <p className="text-lg md:text-xl opacity-95 max-w-[600px]">
                   
                    3shan el christmas bta3k yb2a mo5tlf , hanl3b sika sawa 3o2bal ma twsli ll msg 😉💕
                </p>

                <button
                    onClick={handleClick}
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
                    Start Mission 🎯
                </button>

            </div>
        </div>

    );
}
