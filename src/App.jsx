import { LanguageProvider } from "./context/LanguageContext";
import { BgAnimationProvider } from "./context/BgAnimationContext";
import { ApiKeyProvider } from "./context/ApiKeyContext";

import DefinedRoutes from "./config/routes";

function App() {
    return (
        <LanguageProvider>
            <ApiKeyProvider>
                <BgAnimationProvider>
                    <DefinedRoutes />
                </BgAnimationProvider>
            </ApiKeyProvider>
        </LanguageProvider>
    );
}

export default App;
