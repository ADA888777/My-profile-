import { FadeIn } from "@/components/ui/fade-in";

const skills = [
  "HTML", "CSS", "JavaScript", "Python", "React", "Node.js",
  "Java", "C++", "C#", "PHP", "TypeScript", "MySQL",
  "MongoDB", "Docker", "Vue", "Angular"
];

export function Skills() {
  return (
    /*
      كان الحد هنا border-y، والحد الأعلى منه يقع تماماً على نهاية نطاق
      الخلفية المتدرّجة (.gz-wrap) فيظهر كخط فاصل رقيق يقطع التلاشي.
      صار border-b فقط: الانتقال من النطاق إلى هذا القسم بلا أي خط.
      ملاحظة: خلفية هذا القسم هي bg-black/20 فوق خلفية الصفحة #09090B،
      أي #070709 — وهي نفس القيمة في --gz-next-rgb داخل glow-zone.css.
    */
    <section id="skills" className="py-24 relative bg-black/20 border-b border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold inline-block relative">
            التقنيات
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 w-1/2 bg-primary rounded-full" aria-hidden="true"></div>
          </h2>
        </FadeIn>

        <ul className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto list-none p-0">
          {skills.map((skill, i) => (
            <li key={skill}>
              <FadeIn delay={i * 0.05} direction="up">
                {/*
                  bidi-isolate keeps Latin/symbol names correct inside the RTL page.
                  Without it "C#" renders as "#C" and "C++" as "++C".
                */}
                <span className="bidi-isolate inline-block px-6 py-3 rounded-full glass-card hover-glow cursor-default text-lg font-medium text-purple-100 hover:text-white transition-colors bg-white/5 hover:bg-primary/20">
                  {skill}
                </span>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
