import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "الرئيسية", href: "#home" },
  { name: "من أنا", href: "#about" },
  { name: "التقنيات", href: "#skills" },
  { name: "خدماتي", href: "#services" },
  { name: "أعمالي", href: "#projects" },
  { name: "تواصل معي", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu with Escape for keyboard users.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-panel py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group" aria-label="العودة للرئيسية">
          <span className="relative overflow-hidden rounded-xl h-10 w-10 border border-primary/20 group-hover:border-primary/60 transition-colors">
            <img
              src="/logo.svg"
              alt=""
              width={40}
              height={40}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display font-bold text-2xl text-foreground group-hover:text-primary transition-colors">
            آدا
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:-translate-y-0.5 transition-all"
            >
              {link.name}
            </a>
          ))}
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full px-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
          >
            ابدأ مشروعك
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav. When closed it is also invisible + inert so it cannot be
          reached with the keyboard or read by screen readers. */}
      <nav
        id="mobile-nav"
        aria-label="التنقل على الجوال"
        hidden={!mobileMenuOpen}
        className={`md:hidden absolute top-full left-0 w-full glass-panel border-b border-white/10 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors w-full text-center py-2"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
