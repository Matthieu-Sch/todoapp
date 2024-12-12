export default function Footer() {
  return (
    <footer className="bg-red-600 p-4 flex items-center justify-center shadow-inner">
      <p className="text-white text-sm">
        © {new Date().getFullYear()} - All rights reserved.
      </p>
    </footer>
  );
}
