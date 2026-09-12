import { motion } from "framer-motion";
import { ArrowLeft, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/*
        Background is now generated entirely in CSS (.hero-backdrop).
        It replaces the old 980 KB hero-bg.png, which was downloaded on every
        visit only to be shown at 30% opacity. Saves ~1 MB on first load.
      */}
      <div className="absolute inset-0 z-0 hero-backdrop hero-fade" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 border-primary/30"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" aria-hidden="true"></span>
          <span className="text-sm font-medium text-purple-100">جود عبد الفتاح - خبيرة تقنية</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-foreground max-w-4xl leading-[1.2]"
        >
          حلول تقنية احترافية تبدأ من الفكرة وتنتهي{" "}
          <span className="text-gradient">بنتيجة حقيقية</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-xl md:text-2xl font-medium text-purple-100 max-w-2xl"
        >
          برمجة – أمن سيبراني – مواقع – تطبيقات – استشارات
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed"
        >
          أنا أقدم خدمات تقنية متكاملة للأفراد والشركات، من بناء الأنظمة إلى تأمينها وتطويرها. إذا عندك فكرة، أنا أحولها إلى مشروع فعلي جاهز للسوق.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_-5px_rgba(124,58,237,0.7)] transition-all group"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ابدأ مشروعك
            <ArrowLeft className="ms-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl border-white/20 hover:bg-white/5 hover:text-white transition-all group"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Briefcase className="me-2 w-5 h-5 group-hover:text-primary transition-colors" aria-hidden="true" />
            شاهد أعمالي
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
