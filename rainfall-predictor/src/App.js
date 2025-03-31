
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Predictor from "./pages/Predictor";

// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/predictor" element={<Predictor />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Predictor from "./pages/Predictor";
import Result from "./pages/Result"; // New Result Page

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/predictor" element={<Predictor />} />
                <Route path="/result" element={<Result />} /> {/* Added Result Page */}
            </Routes>
        </Router>
    );
};

export default App;
