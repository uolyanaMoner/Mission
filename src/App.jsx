// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import EnterCode from "./pages/EnterCode";
// import Landing from "./pages/Landing";
// import GamePage from "./pages/Game";
// import QuizAfterPuzzleFull from "./pages/Questions";
// import DoorsGame from "./pages/Doors";
// import GiftGame from "./pages/Gift";
// import StarPathChristmas from "./pages/Stars";
// import SantaLetter from "./pages/AccessGranted";

// export default function App() {
//   return (
//     <Router basename="/MariasMission">
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/mission" element={<EnterCode />} />
//         <Route path="/puzzle" element={<GamePage />} />
//         <Route path="/questions" element={<QuizAfterPuzzleFull />} />
//         <Route path="/doors" element={<DoorsGame />} />
//         <Route path="/gift" element={<GiftGame />} />
//         <Route path="/stars" element={<StarPathChristmas />} />
//         <Route path="/finallgift" element={<SantaLetter />} />
//       </Routes>
//     </Router>
//   );
// }



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterCode from "./pages/EnterCode";
import Landing from "./pages/Landing";
import GamePage from "./pages/Game";
import QuizAfterPuzzleFull from "./pages/Questions";
import DoorsGame from "./pages/Doors";
import GiftGame from "./pages/Gift";
import StarPathChristmas from "./pages/Stars";
import SantaLetter from "./pages/AccessGranted";

function App() {
  return (
    <Router basename="/MariasMission">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="mission" element={<EnterCode />} />
        <Route path="puzzle" element={<GamePage />} />
        <Route path="questions" element={<QuizAfterPuzzleFull />} />
        <Route path="doors" element={<DoorsGame />} />
        <Route path="gift" element={<GiftGame />} />
        <Route path="stars" element={<StarPathChristmas />} />
        <Route path="finallgift" element={<SantaLetter />} />
      </Routes>
    </Router>
  );
}

export default App;
