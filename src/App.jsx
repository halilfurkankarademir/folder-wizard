import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

function App() {
    return (
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
            </Routes>
            <Footer />
        </HashRouter>
    );
}

export default App;
