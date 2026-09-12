import { FadeIn } from "@/components/ui/fade-in";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  description: string;
  /* Live URL. Every link here is verified to resolve. */
  link: string;
  /* Real screenshot of the live site, served from /public/images. */
  image: string;
  stack: string;
};

const projects: Project[] = [
  {
    title: "منصة HS لربط الشركات بالمندوبين",
    description:
      "منصة تربط الشركات بمندوبي المبيعات: تسجيل للطرفين، إدارة الطلبات، وتتبع الأرباح.",
    link: "https://ada888777.github.io/HSHS/",
    image: "/images/project-hs-platform.jpg",
    stack: "واجهة عربية RTL",
  },
  {
    title: "سانورا — أكاديمية اللغات",
    description:
      "موقع أكاديمية لغات: عرض الدورات والأسعار، صفحات تعريفية، وقنوات تواصل وتسجيل.",
    link: "https://sanoora.netlify.app/",
    image: "/images/project-sanoora.jpg",
    stack: "موقع تعريفي + متجر دورات",
  },
  {
    title: "منصة آدا للتعلم الرقمي",
    description:
      "منصة دورات تقنية بواجهة عربية كاملة، مبنية على React وTypeScript مع خادم API ومكتبات مشتركة.",
    link: "https://mystore888.netlify.app/",
    image: "/images/project-ada-platform.jpg",
    stack: "React · TypeScript · API",
  },
  {
    title: "وريث — مبادرة التراث السعودي",
    description:
      "موقع تعريفي لمبادرة تراثية: الرؤية والرسالة، الفعاليات والإنجازات، وبرنامج سفراء التراث.",
    link: "https://ada888777.github.io/WAREETH/",
    image: "/images/project-wareeth.jpg",
    stack: "موقع تعريفي",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-black/20 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold inline-block relative">
            أعمالي
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 w-1/2 bg-primary rounded-full"
              aria-hidden="true"
            ></div>
          </h2>
          <p className="mt-8 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            مشاريع حقيقية منشورة على الإنترنت — كل بطاقة تفتح الموقع نفسه، والصورة لقطة من النسخة المنشورة.
          </p>
        </FadeIn>

        <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <FadeIn key={project.link} delay={i * 0.12}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl overflow-hidden glass-card hover-glow border-white/10"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-black/30">
                  <div
                    className="absolute inset-0 bg-primary/20 group-hover:opacity-0 transition-opacity z-10 mix-blend-overlay"
                    aria-hidden="true"
                  ></div>
                  <img
                    src={project.image}
                    alt={"لقطة من موقع " + project.title}
                    width={1568}
                    height={698}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-1 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-primary/90">{project.stack}</p>
                  </div>
                  <span className="shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5 rtl:-scale-x-100" aria-hidden="true" />
                    <span className="sr-only">فتح المشروع في تبويب جديد</span>
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
