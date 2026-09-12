import "@/styles/contact-footer.css";

/* Assembled at runtime so scrapers do not harvest the address from the bundle. */
const CONTACT_MAIL = ["hshmhshm", "72"].join("") + "@" + ["gmail", "com"].join(".");

const TELEGRAM_URL = "https://t.me/Ada778877";
const TELEGRAM_HANDLE = "@Ada778877";

/* Anchors match the section ids rendered on the home page. */
const SITE_LINKS = [
  { name: "الرئيسية", href: "#home" },
  { name: "من أنا", href: "#about" },
  { name: "التقنيات", href: "#skills" },
  { name: "أعمالي", href: "#projects" },
];

const SERVICE_LINKS = [
  { name: "الأمن السيبراني", href: "#services" },
  { name: "تطوير المواقع", href: "#services" },
  { name: "التصميم", href: "#services" },
  { name: "التسويق الرقمي", href: "#services" },
];

export function Footer() {
  return (
    <footer className="ada-ft">
      {/* Shared gradient used by the social icons. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="ada-g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="55%" stopColor="#7c3bed" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
        </defs>
      </svg>

      <span className="ft-glow" aria-hidden="true" />

      <div className="wrap">
        <div className="ft-grid">
          {/* ---------- brand ---------- */}
          <div className="ft-brand">
            <div className="ft-id">
              <span className="ft-mark" aria-hidden="true">
                آ
              </span>
              <span>
                <span className="ft-name">آدا</span>
                <span className="ft-role">خبيرة تقنية</span>
              </span>
            </div>
            <p className="ft-bio">
              أبني مواقع وتطبيقات آمنة وسريعة، وأراجع أمن الأنظمة القائمة — من الفكرة حتى الإطلاق.
            </p>
            <div className="ft-soc">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label="تليجرام (يفتح في تبويب جديد)"
              >
                <svg className="fl" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8L18 6.1c.4-.3-.1-.5-.6-.2L7.3 12.3l-4.6-1.4c-1-.3-1-1 .2-1.5l18-6.9c.8-.3 1.5.2 1 2.8Z" />
                </svg>
              </a>
              <a href={"mailto:" + CONTACT_MAIL} aria-label="مراسلتي عبر البريد الإلكتروني">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2.5" y="5" width="19" height="14" rx="3" />
                  <path d="m3.5 7 8.5 6 8.5-6" />
                </svg>
              </a>
              <a
                href="https://github.com/ADA888777"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label="حسابي على GitHub (يفتح في تبويب جديد)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7A5.2 5.2 0 0 0 18.7 3a4.9 4.9 0 0 0-.1-3.6s-1.3-.4-4.3 1.6a12.2 12.2 0 0 0-6.4 0C4.9.6 3.6 1 3.6 1a4.9 4.9 0 0 0-.1 3.6A5.2 5.2 0 0 0 2 8.3c0 5.1 3.1 6.3 6.1 6.7a3.4 3.4 0 0 0-.9 2.6V21" />
                </svg>
              </a>
            </div>
          </div>

          {/* ---------- site links ---------- */}
          <nav className="ft-col" aria-label="روابط الموقع">
            <h2 className="ft-h">الموقع</h2>
            <ul>
              {SITE_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- services ---------- */}
          <nav className="ft-col" aria-label="الخدمات">
            <h2 className="ft-h">خدماتي</h2>
            <ul>
              {SERVICE_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- call to action ---------- */}
          <div className="ft-cta">
            <h2 className="ft-h">ابدأ مشروعك</h2>
            <p>احكِ لي عن فكرتك، وأعطيك رأياً صريحاً ونطاقاً واضحاً قبل أي التزام.</p>
            <a className="ft-btn" href="#contact">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              ابدأ مشروعك
            </a>
            <p className="ft-badge">
              <i aria-hidden="true" /> متاحة لمشاريع جديدة
            </p>
          </div>
        </div>

        <div className="ft-bot">
          <p>© {new Date().getFullYear()} آدا. جميع الحقوق محفوظة.</p>
          <div className="r">
            <a href="#contact">تواصل معي</a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" dir="ltr">
              {TELEGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
