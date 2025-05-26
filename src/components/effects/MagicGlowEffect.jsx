const MagicGlowEffect = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <div
                className="absolute top-1/4 left-1/4 w-60 h-60 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"
                style={{
                    background:
                        "radial-gradient(circle, rgba(157,78,221,1) 0%, rgba(107,70,193,0.5) 60%, rgba(95,75,139,0) 100%)",
                    animationDuration: "8s",
                }}
            />
            <div
                className="absolute right-1/4 bottom-1/4 w-80 h-80 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"
                style={{
                    background:
                        "radial-gradient(circle, rgba(236,72,153,1) 0%, rgba(107,70,193,0.5) 60%, rgba(95,75,139,0) 100%)",
                    animationDuration: "12s",
                    animationDelay: "2s",
                }}
            />
            <div
                className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"
                style={{
                    background:
                        "radial-gradient(circle, rgba(79,70,229,1) 0%, rgba(107,70,193,0.5) 60%, rgba(95,75,139,0) 100%)",
                    animationDuration: "10s",
                    animationDelay: "1s",
                }}
            />
        </div>
    );
};

export default MagicGlowEffect;
