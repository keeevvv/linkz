export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center items-center min-h-screen ">
      {children}
    </section>
  );
}