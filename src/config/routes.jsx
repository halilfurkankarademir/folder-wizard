import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ErrorPage from "../pages/Error/ErrorPage";
import NoNetworkPage from "../pages/Error/NoNetworkPage";
import FoldersOrganising from "../pages/Organisation/FoldersOrganising";

const Homepage = lazy(() => import("../pages/Home/Homepage"));
const SelectedFolders = lazy(() =>
    import("../pages/Organisation/SelectedFolders")
);
const SuggestedOrganisation = lazy(() =>
    import("../pages/Organisation/SuggestedOrganisation")
);
const SettingsPage = lazy(() => import("../pages/Settings/SettingsPage"));
const PrivacyPage = lazy(() => import("../pages/Settings/PrivacyPage"));
const SetupPage = lazy(() => import("../pages/Home/SetupPage"));

const DefinedRoutes = () => {
    return (
        <HashRouter>
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <Navbar />
                <Suspense fallback={<div>Loading...</div>}>
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
                            path="/organising"
                            element={
                                <ProtectedRoute>
                                    <FoldersOrganising />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/setup" element={<SetupPage />} />
                        <Route path="/no-network" element={<NoNetworkPage />} />
                    </Routes>
                </Suspense>
                <Footer />
            </ErrorBoundary>
        </HashRouter>
    );
};

export default DefinedRoutes;
