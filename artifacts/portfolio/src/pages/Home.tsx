import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { WhyMe } from "@/components/sections/WhyMe";
import { Positioning } from "@/components/sections/Positioning";
import { Projects } from "@/components/sections/Projects";
import { Quote } from "@/components/sections/Quote";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import "@/styles/glow-zone.css";

export default function Home() {
  return (
    <>
      {/* Skip link: first stop for keyboard and screen-reader users. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        تخطي إلى المحتوى
      </a>

      <Navbar />

      <main
        id="main-content"
        className="min-h-screen bg-background selection:bg-primary/30 selection:text-white"
      >
        {/*
          نطاق الخلفية المتدرّجة (glow zone).

          يبدأ من أعلى قسم البطل "حلول تقنية احترافية…" (#home) وينتهي بنهاية
          قسم "من أنا" (#about)، ثم يتلاشى إلى لون قسم "التقنيات" (#skills).

          القسمان متجاوران في الـ DOM، فغلاف واحد يكفي ولا حاجة لتكرار الخلفية.
          الطبقات كلها position:absolute داخل .gz-wrap، لذلك لا يوضع transform
          على الغلاف، والتحكّم بالألوان والحبيبات من glow-zone.css.
        */}
        <div className="gz-wrap">
          <div className="gz-bg" aria-hidden="true">
            <span className="gz-orb gz-orb-1" />
            <span className="gz-orb gz-orb-2" />
            <span className="gz-orb gz-orb-3" />
            <span className="gz-orb gz-orb-4" />
            <span className="gz-grain" />
            <span className="gz-fade" />
          </div>

          <div className="gz-content">
            <Hero />
            <About />
          </div>
        </div>

        <Skills />
        <TrustBar />
        <Services />
        <WhyMe />
        <Positioning />
        <Projects />
        <Quote />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
