import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-grow bg-slate-300">{children}</main>
      <Footer />
    </div>
  );
}
