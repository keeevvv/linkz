import Iridescence from "./Iridescence";
import RotatingText from "./RotatingText";

const taglines = [
  "Your World, One Link.",
  "Connect Everything, Simply.",
  "Share Your Story, Seamlessly.",
  "All Your Links, Unified.",
  "Simplify Your Sharing.",
];

const LandingHome = () => {
  return (
    <div
      id="home"
      className="relative w-full h-screen flex flex-col items-center justify-center pt-16"
    >
      <div className="absolute inset-0">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={true}
          amplitude={0.1}
          speed={1.0}
        />
      </div>

      <RotatingText
        texts={taglines}
        mainClassName="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white/50 text-black text-2xl sm:text-3xl md:text-5xl font-bold rounded-xl shadow-lg z-10"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={2500}
      />
    </div>
  );
};

export default LandingHome;
