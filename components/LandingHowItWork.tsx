import CardSwap, { Card } from "./CardSwap";
import ScrollFloat from "./ScrollFloat";

const LandingHowItWork = () => {
  return (
    <div id="guide" className="w-full py-20 px-4 flex flex-col items-center">
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
      >
        How It Work?
      </ScrollFloat>
      <p className="text-lg text-slate-600 text-center max-w-2xl mb-12">
        In just three easy steps, you can have one page for all your important
        links.
      </p>

      <div
        style={{
          height: "600px",
          width: "100%",
          maxWidth: "400px",
          position: "relative",
        }}
      >
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
        >
          <Card className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <span className="text-4xl">1️⃣</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-2">
              Create Your Account
            </h3>
            <p className="text-slate-600">
              Sign up for free in just 60 seconds and get your unique username
              for your public profile.
            </p>
          </Card>

          <Card className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <span className="text-4xl">2️⃣</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-2">
              Add Your Links
            </h3>
            <p className="text-slate-600">
              Customize your profile. Add all your social media links,
              portfolio, and projects in one place.
            </p>
          </Card>

          <Card className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <span className="text-4xl">3️⃣</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-2">
              Share Your Profile
            </h3>
            <p className="text-slate-600">
              Place your single Linkz link in your Instagram bio, Twitter, or
              anywhere else. Done!
            </p>
          </Card>
        </CardSwap>
      </div>
    </div>
  );
};

export default LandingHowItWork;
