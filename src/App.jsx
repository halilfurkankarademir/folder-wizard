import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import SelectedFolders from "./pages/SelectedFolders";
import SuggestedOrganisation from "./pages/SuggestedOrganisation";

function App() {
    return (
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/selected" element={<SelectedFolders />} />
                <Route path="/suggested" element={<SuggestedOrganisation />} />
            </Routes>
            <Footer />
        </HashRouter>
    );
}

export default App;
