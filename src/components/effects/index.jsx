import MagicGlowEffect from "./MagicGlowEffect";
import ParticleEffect from "./ParticleEffect";

export { MagicGlowEffect, ParticleEffect };

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
