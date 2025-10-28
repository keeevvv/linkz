import LogoLoop from "./LogoLoop";
import ProfileCard from "./ProfileCard";
import ScrollFloat from "./ScrollFloat";

const cardData = [
  {
    name: "Adib Faizulhaq Armadhani",
    title: "Software Engineer",
    handle: "adibfaizulhaq.dev",
    status: "Online",
    avatarUrl: "/images/adibpp.png",
  },
  {
    name: "Rindang Bani Isyan",
    title: "Fullstack Developer",
    handle: "rindang_bani",
    status: "Online",
    avatarUrl: "/images/rindangpp.png",
  },
  {
    name: "Muhammad Farhan Ismali Fentarto",
    title: "UX/UI Designer",
    handle: "farhan.ismali",
    status: "Online",
    avatarUrl: "/images/farhanpp.png",
  },
  {
    name: "Adrian Fahren Setiawan",
    title: "DevOps Specialist",
    handle: "nothingscript",
    status: "Online",
    avatarUrl: "/images/adrianpp.png",
  },
  {
    name: "Kevin Albany Junaidi",
    title: "Project Manager",
    handle: "albany_kevin",
    status: "Online",
    avatarUrl: "/images/kevinpp.png",
  },
];

const profileCards = cardData.map((profile) => ({
  node: (
    <ProfileCard
      name={profile.name}
      title={profile.title}
      handle={profile.handle}
      status={profile.status}
      contactText="Contact Me"
      avatarUrl={profile.avatarUrl}
      showUserInfo={true}
      enableTilt={true}
      enableMobileTilt={false}
      onContactClick={() => {
        const instagramUrl = `https://www.instagram.com/${profile.handle}/`;
        window.open(instagramUrl, "_blank", "noopener,noreferrer");
      }}
    />
  ),

  title: profile.name,
  href: `https://example.com/@${profile.handle}`,
}));

const LandingDeveloper = () => {
  return (
    <div id="developer" className="h-screen py-20 relative">
      <div id="about" className="flex flex-col items-center justify-center p-8">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          CoffeJava
        </ScrollFloat>
      </div>
      <LogoLoop
        logos={profileCards}
        speed={40}
        direction="left"
        gap={40}
        pauseOnHover
        scaleOnHover={false}
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
  );
};

export default LandingDeveloper;
