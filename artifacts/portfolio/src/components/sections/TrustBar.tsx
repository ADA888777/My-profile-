const platforms = [
  "ChatGPT", "Canva", "Google Cloud", "AWS", "GitHub",
  "Figma", "Notion", "OpenAI", "Firebase", "Stripe",
];

export function TrustBar() {
  return (
    <section className="py-16 overflow-hidden relative border-b border-white/5" aria-labelledby="trustbar-title">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h3 id="trustbar-title" className="text-xl font-semibold text-muted-foreground">
          تقنيات ومنصّات أعمل عليها
        </h3>
      </div>

      <div className="relative w-full flex overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" aria-hidden="true"></div>

        {/* The list is duplicated so the marquee can loop seamlessly. The copy is
            hidden from assistive tech, and the track pauses on hover/focus. */}
        <ul className="marquee-track flex w-max animate-marquee space-x-12 rtl:space-x-reverse list-none p-0 m-0">
          {[...platforms, ...platforms].map((platform, i) => (
            <li
              key={i}
              className="flex items-center justify-center min-w-[150px]"
              aria-hidden={i >= platforms.length ? "true" : undefined}
            >
              <span className="bidi-isolate text-2xl md:text-3xl font-display font-bold text-white/40 uppercase tracking-wider">
                {platform}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="container mx-auto px-4 mt-8 text-center">
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          أستخدم هذه الأدوات والمنصّات في بناء المشاريع وتشغيلها، وفي فحص وتأمين الأنطمة المبنية عليها.
        </p>
        <p className="mt-3 text-xs text-muted-foreground/80 max-w-2xl mx-auto">
          الأسماء والعلامات التجارية المذكورة ملك أصحابها، وذكرها لا يعني أي شراكة أو رعاية رسمية.
        </p>
      </div>
    </section>
  );
}
