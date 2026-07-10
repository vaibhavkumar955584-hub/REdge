import Link from "next/link";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-dot-pattern opacity-[0.5]" />
      <div className="absolute -top-24 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary-50/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-7 lg:text-left">
            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-100 animate-fade-in">
                <SparklesIcon className="h-4 w-4" />
                <span>Modern ATS-Friendly Templates</span>
              </div>
            </div>

            <h1 className="animate-slide-up">
              <span className="block text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl xl:text-7xl leading-[1.1]">
                Elevate your career with <span className="text-primary-700">REdge.</span>
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl lg:text-lg xl:text-xl max-w-xl sm:mx-auto lg:mx-0 animate-slide-up delay-100">
              The professional resume builder designed for the modern job market.
              Privacy-focused, incredibly fast, and optimized to beat the ATS.
            </p>

            <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4 animate-slide-up delay-200">
              <Link href="/resume-builder" className="btn-primary group">
                Start Building Now
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/resume-parser" className="btn-secondary">
                Analyze My Resume
              </Link>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                ))}
              </div>
              <p className="text-sm font-medium text-slate-500">
                Trusted by 10,000+ job seekers worldwide
              </p>
            </div>
          </div>

          <div className="relative mt-16 lg:col-span-5 lg:mt-0 flex items-center justify-center pointer-events-none">
             {/* Empty space for sticky 3D Resume */}
          </div>
        </div>
      </div>
    </section>
  );
};
