import ScrollFloat from "./ScrollFloat";

const LandingAbout = () => {
  const description =
    "Linkz provides a single, clean landing page to house all your important links. Share it in your bio, your signature, or your portfolio, and connect your audience to all your content instantly.";

  return (
    <div
      id="about"
      className="h-screen flex flex-col items-center justify-center p-8"
    >
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
      >
        Linkz
      </ScrollFloat>

      <p
        className="
          text-center     // Pusatkan teks
          text-lg         // Ukuran font dasar yang nyaman
          md:text-xl      // Sedikit lebih besar di layar medium
          text-gray-600   // Warna abu-abu agar tidak terlalu pekat
          max-w-2xl       // INI PENTING: Batasi lebar maksimum agar mudah dibaca
          mt-4            // Beri jarak dari judul
        "
      >
        {description}
      </p>
    </div>
  );
};

export default LandingAbout;
