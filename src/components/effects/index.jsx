import ParticleEffect from "./ParticleEffect";
import MagicGlowEffect from "./MagicGlowEffect";

export { ParticleEffect, MagicGlowEffect };

// Tüm efektleri içeren bir bileşen
const MagicBackground = () => {
    return (
        <>
            <ParticleEffect />
            <MagicGlowEffect />
        </>
    );
};

export default MagicBackground;
