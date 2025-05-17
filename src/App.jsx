import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import SelectedFolders from "./pages/SelectedFolders";
import SuggestedOrganisation from "./pages/SuggestedOrganisation";
import SettingsPage from "./pages/SettingsPage";
import { LanguageProvider } from "./context/LanguageContex";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
    return (
        <LanguageProvider>
            <HashRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/selected" element={<SelectedFolders />} />
                    <Route
                        path="/suggested"
                        element={<SuggestedOrganisation />}
                    />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                </Routes>
                <Footer />
            </HashRouter>
        </LanguageProvider>
    );
}

export default App;
