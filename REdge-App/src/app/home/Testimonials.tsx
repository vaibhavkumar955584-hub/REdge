const TESTIMONIALS = [
  {
    content: "REdge completely changed how I approach my job search. The ATS score feature helped me realize why I wasn't getting callbacks. Two weeks later, I had an offer from a Tier-1 tech company.",
    author: "Sarah Jenkins",
    role: "Senior Product Manager",
    company: "Tech Giant"
  },
  {
    content: "I've tried every resume builder out there. REdge is the only one that feels modern, fast, and actually cares about my privacy. The templates are incredibly clean and professional.",
    author: "David Chen",
    role: "Software Engineer",
    company: "Fast-growing Startup"
  },
  {
    content: "The import feature is like magic. I uploaded my messy old PDF, and REdge parsed it perfectly into a beautiful new design. Saved me hours of work.",
    author: "Elena Rodriguez",
    role: "Marketing Director",
    company: "Global Agency"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-primary-600 uppercase tracking-widest">Success Stories</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Join thousands of successful candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="glass-card p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="h-5 w-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-slate-600 italic mb-8">"{t.content}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/20 pt-6">
                <div className="h-12 w-12 rounded-full glass-panel flex items-center justify-center text-primary-700 font-bold text-lg shadow-sm">
                  {t.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.author}</h4>
                  <p className="text-sm text-slate-500">{t.role} @ {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
