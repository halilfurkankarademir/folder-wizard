import MagicGlowEffect from "./MagicGlowEffect";
import ParticleEffect from "./ParticleEffect";
import { useBgAnimation } from "../../context/BgAnimationContext";

export { MagicGlowEffect, ParticleEffect };

const MagicBackground = () => {
    const { isBgAnimationActive } = useBgAnimation();

    return (
        <>
            {isBgAnimationActive && (
                <>
                    <MagicGlowEffect />
                    <ParticleEffect />
                </>
            )}
        </>
    );
};

export default MagicBackground;
