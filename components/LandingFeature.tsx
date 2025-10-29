import MagicBento from "./MagicBento";
import ScrollFloat from "./ScrollFloat";

const LandingFeature = () => {
  return (
    <div id="feature" className="py-18">
      <div id="about" className="flex flex-col items-center justify-center p-8">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Feature
        </ScrollFloat>
      </div>
      <MagicBento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
        glowColor="0, 0, 255"
      />
    </div>
  );
};

export default LandingFeature;
