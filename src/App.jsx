import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import SelectedFolders from "./pages/SelectedFolders";
import SuggestedOrganisation from "./pages/SuggestedOrganisation";
import SettingsPage from "./pages/SettingsPage";
import { LanguageProvider } from "./context/LanguageContext";
import PrivacyPage from "./pages/PrivacyPage";
import { BgAnimationProvider } from "./context/BgAnimationContext";
import { ApiKeyProvider } from "./context/ApiKeyContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import SetupPage from "./pages/SetupPage";

function App() {
    return (
        <LanguageProvider>
            <ApiKeyProvider>
                <BgAnimationProvider>
                    <HashRouter>
                        <Navbar />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Homepage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/selected"
                                element={
                                    <ProtectedRoute>
                                        <SelectedFolders />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/suggested"
                                element={
                                    <ProtectedRoute>
                                        <SuggestedOrganisation />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/settings"
                                element={<SettingsPage />}
                            />
                            <Route path="/privacy" element={<PrivacyPage />} />

                            <Route path="/setup" element={<SetupPage />} />
                        </Routes>
                        <Footer />
                    </HashRouter>
                </BgAnimationProvider>
            </ApiKeyProvider>
        </LanguageProvider>
    );
}

export default App;
