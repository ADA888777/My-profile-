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
        <Hero />
        <About />
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
