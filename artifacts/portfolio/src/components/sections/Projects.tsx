import { FadeIn } from "@/components/ui/fade-in";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "منصة رابط لربط المندوبين بالبائعين",
    description: "منصة وسيطة تربط مندوبي التوصيل بالبائعين وتنظم الطلبات بينهم.",
    link: "https://aba787.github.io/HSHS/",
    image: "https://i.ibb.co/wFzR1XNX/White-and-Light-Blue-Minimalist-Simple-Literature-Project-Presentation-2.png",
  },
  {
    title: "موقع معلمة لغات",
    description: "موقع تعريفي لمعلمة لغات مع عرض الدورات وإمكانية التواصل والتسجيل.",
    link: "https://aba787.github.io/Sanoora/",
    image: "https://i.ibb.co/ZzQ60zn4/White-and-Light-Blue-Minimalist-Simple-Literature-Project-Presentation.png",
  },
  {
    title: "موقع وريث",
    description: "موقع خدمات متكامل مع واجهة عربية واضحة وتجربة استخدام سريعة.",
    link: "https://aba787.github.io/WAREETH/",
    image: "https://i.ibb.co/6V40J86/White-and-Light-Blue-Minimalist-Simple-Literature-Project-Presentation-1.png",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-black/20 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold inline-block relative">
            أعمالي
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 w-1/2 bg-primary rounded-full" aria-hidden="true"></div>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <FadeIn key={project.link} delay={i * 0.15}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl overflow-hidden glass-card hover-glow border-white/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 group-hover:opacity-0 transition-opacity z-10 mix-blend-overlay" aria-hidden="true"></div>
                  <img
                    src={project.image}
                    alt={`لقطة من ${project.title}`}
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
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
