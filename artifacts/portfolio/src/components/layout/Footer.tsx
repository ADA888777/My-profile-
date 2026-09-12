import { Github, Mail } from "lucide-react";

/* Assembled at runtime so scrapers do not harvest the address from the bundle. */
const CONTACT_MAIL = ["shamkory", "930"].join("") + "@" + ["gmail", "com"].join(".");

const footerLinks = [
  { name: "من أنا", href: "#about" },
  { name: "التقنيات", href: "#skills" },
  { name: "خدماتي", href: "#services" },
  { name: "أعمالي", href: "#projects" },
  { name: "تواصل معي", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-background relative overflow-hidden">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-primary/10 blur-[100px] pointer-events-none rounded-t-full"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="overflow-hidden rounded-full h-12 w-12 border-2 border-primary/40">
            <img
              src="/logo.jpeg"
              alt=""
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display font-bold text-3xl text-white">آدا</span>
        </div>

        <p className="text-purple-100 font-medium mb-8 max-w-md">
          خبيرة تقنية – أمن سيبراني – تطوير مواقع – تصميم – تسويق
        </p>

        <nav aria-label="روابط الموقع" className="mb-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 list-none p-0 m-0">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 mb-8">
          <a
            href={`mailto:${CONTACT_MAIL}`}
            className="flex h-11 w-11 items-center justify-center rounded-full glass-card hover-glow text-purple-100 hover:text-white transition-colors"
            aria-label="مراسلتي عبر البريد الإلكتروني"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/ADA888777"
            target="_blank"
            rel="noopener noreferrer me"
            className="flex h-11 w-11 items-center justify-center rounded-full glass-card hover-glow text-purple-100 hover:text-white transition-colors"
            aria-label="حسابي على GitHub (يفتح في تبويب جديد)"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" aria-hidden="true"></div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} جود عبد الفتاح. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
