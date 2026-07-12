import { Hero } from "home/Hero";
import { NoObjections } from "home/NoObjections";
import { Steps } from "home/Steps";
import { Features } from "home/Features";
import { Testimonials } from "home/Testimonials";
import { QuestionsAndAnswers } from "home/QuestionsAndAnswers";
import { Contact } from "home/Contact";
import { About } from "home/About";
import dynamic from "next/dynamic";
import Link from "next/link";

const Resume3D = dynamic(() => import("home/Resume3D").then((mod) => mod.Resume3D), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="text-gray-900 bg-slate-50/30 relative">
      {/* Sticky Canvas Background - Now wraps the whole page content */}
      <div className="fixed top-0 left-0 h-screen w-full overflow-hidden pointer-events-none z-0">
         <Resume3D />
      </div>

      {/* Scrolling Content on top of Canvas */}
      <div className="relative z-10 bg-transparent">
        <Hero />

        {/* Section 2: Human Eyes */}
        <div className="h-screen flex items-center justify-center relative overflow-hidden pointer-events-none">
           <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="lg:w-1/2 p-10 glass-card pointer-events-auto transition-transform hover:scale-105 duration-500">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100/50 text-primary-700 text-[10px] font-black uppercase tracking-widest mb-6 border border-primary-200">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                    </span>
                    Human-Centric
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-6 font-display uppercase tracking-tight">Designed for Human Eyes</h2>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                     Recruiters spend an average of 6 seconds per resume. We ensure your most critical information
                     pops instantly with professional typography and perfect whitespace balance.
                  </p>
              </div>
           </div>
        </div>

        {/* Section 3: Machine Brains */}
        <div className="h-screen flex items-center justify-end relative overflow-hidden pointer-events-none">
           <div className="max-w-7xl mx-auto px-4 w-full flex justify-end">
              <div className="lg:w-1/2 p-10 glass-card-dark pointer-events-auto transition-transform hover:scale-105 duration-500 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-300 text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                    </span>
                    ATS Optimized
                  </div>
                  <h2 className="text-4xl font-black text-white mb-6 font-display uppercase tracking-tight">Optimized for Machine Brains</h2>
                  <p className="text-xl text-white/70 leading-relaxed font-medium">
                     Beat the robots at their own game. Our underlying data structure is 100% ATS-readable,
                     ensuring your resume never ends up in the "black hole" of recruitment software.
                  </p>
              </div>
           </div>
        </div>

        {/* Section 4: Final Call */}
        <div className="h-[70vh] flex flex-col items-center justify-center relative overflow-hidden pointer-events-none mb-24">
           <div className="max-w-3xl mx-auto px-4 text-center z-10 pointer-events-auto">
              <div className="glass-card p-12 text-slate-900">
                  <h2 className="text-5xl font-black mb-8 font-display tracking-tight">Ready to gain your edge?</h2>
                  <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                      Join 10,000+ job seekers who built their professional future with REdge.
                      No watermarks. No subscriptions. Just quality.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                      <Link href="/resume-builder" className="btn-primary py-5 px-10 text-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg">
                          Start Building Now
                      </Link>
                  </div>
              </div>
           </div>
        </div>

        {/* Bottom content sections */}
        <div className="relative z-10 border-t border-slate-200/50 bg-white/20 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
            <NoObjections />
          </div>
          <Steps />
          <About />
          <Features />
          <Testimonials />
          <QuestionsAndAnswers />
          <Contact />
        </div>
      </div>
    </main>
  );
}
