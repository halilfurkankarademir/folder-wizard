import { LanguageProvider } from "./context/LanguageContext";
import { BgAnimationProvider } from "./context/BgAnimationContext";
import { ApiKeyProvider } from "./context/ApiKeyContext";
import DefinedRoutes from "./config/routes";
import { NetworkProvider } from "./context/NetworkContext";

function App() {
    return (
        <NetworkProvider>
            <LanguageProvider>
                <ApiKeyProvider>
                    <BgAnimationProvider>
                        <DefinedRoutes />
                    </BgAnimationProvider>
                </ApiKeyProvider>
            </LanguageProvider>
        </NetworkProvider>
    );
}

export default App;
