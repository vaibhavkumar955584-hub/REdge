import Image from "next/image";
import { CheckBadgeIcon, UserGroupIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export const About = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
             <h2 className="text-base font-semibold leading-7 text-primary-600 uppercase tracking-widest">Our Mission</h2>
             <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
               Built for humans, <br />
               <span className="text-primary-600">optimized for bots.</span>
             </p>
             <p className="mt-6 text-lg leading-8 text-slate-600 font-medium">
               REdge was founded on a simple premise: your career potential shouldn't be limited by complex formatting or automated gatekeepers.
             </p>

             <div className="mt-10 space-y-8">
                <div className="flex gap-4">
                   <div className="flex h-12 w-12 shrink-0 items-center justify-center glass-panel rounded-xl text-primary-600">
                      <UserGroupIcon className="h-6 w-6" />
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-slate-900">User-Centric Design</h4>
                      <p className="mt-1 text-slate-500 text-sm">Every template is crafted with recruiters' reading patterns in mind.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="flex h-12 w-12 shrink-0 items-center justify-center glass-panel rounded-xl text-primary-600">
                      <CheckBadgeIcon className="h-6 w-6" />
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-slate-900">Verified Compatibility</h4>
                      <p className="mt-1 text-slate-500 text-sm">Tested against 50+ ATS platforms to ensure 100% readability.</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-primary-600/5 rounded-[3rem] rotate-3 scale-105" />
             <div className="relative glass-card-dark p-12 text-white">
                <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full border-4 border-white/10 bg-primary-600 flex items-center justify-center mb-6 shadow-lg">
                       <span className="text-2xl font-black">VK</span>
                    </div>
                    <p className="text-xl font-medium italic text-white/90 leading-relaxed mb-8">
                      "We started REdge because we saw too many talented individuals getting rejected simply because their resume didn't 'fit' a computer's rigid format. Our goal is to give that power back to the job seeker."
                    </p>
                    <div className="h-px w-16 bg-white/20 mb-4" />
                    <h5 className="text-lg font-bold">Vaibhav Kumar</h5>
                    <p className="text-xs font-black uppercase tracking-widest text-primary-400">Founder of REdge</p>
                </div>
             </div>

             {/* Stats Overlay */}
             <div className="absolute -bottom-10 -right-6 lg:-right-10 hidden sm:block">
                <div className="glass-card p-8 flex gap-8 divide-x divide-slate-100">
                   <div className="text-center">
                      <p className="text-2xl font-black text-slate-900">12K+</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Users</p>
                   </div>
                   <div className="text-center pl-8">
                      <p className="text-2xl font-black text-slate-900">99%</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Success</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
