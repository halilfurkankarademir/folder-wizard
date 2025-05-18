function ApiKeyModal({ onClose }) {
    const geminiLink = "https://ai.google.dev/gemini-api/docs/api-key";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-neutral-900 p-6 rounded-lg max-w-md text-center text-white">
                <h2 className="text-2xl mb-4 font-semibold">
                    API Anahtarı Gerekli
                </h2>
                <p className="mb-4">
                    Gemini API anahtarı bulunamadı. Uygulamayı kullanabilmek
                    için bir API anahtarı almanız gerekiyor.
                </p>
                <p className="mb-4 text-sm text-zinc-400">
                    API anahtarınızı almak için aşağıdaki linke tıklayın ve
                    ardından anahtarı ayarlardan uygulamaya girin.
                </p>
                <a
                    href={geminiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mb-6 text-purple-400 underline"
                >
                    Gemini API Anahtar Sayfası
                </a>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
                >
                    Kapat
                </button>
            </div>
        </div>
    );
}

export default ApiKeyModal;
