import { LanguageProvider } from "./context/LanguageContext";
import { ApiKeyProvider } from "./context/ApiKeyContext";
import DefinedRoutes from "./config/routes";
import { NetworkProvider } from "./context/NetworkContext";

function App() {
    return (
        <NetworkProvider>
            <LanguageProvider>
                <ApiKeyProvider>
                    <DefinedRoutes />
                </ApiKeyProvider>
            </LanguageProvider>
        </NetworkProvider>
    );
}

export default App;
