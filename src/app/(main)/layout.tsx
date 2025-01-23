import Footer from "@/components/main/layout/footer";
import Header from "@/components/main/layout/header";
import Navbar from "@/components/main/layout/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

      <div className="min-h-screen">
        <Header />
        <Navbar />
        {children}
        <Footer />
      </div>
  );
}
