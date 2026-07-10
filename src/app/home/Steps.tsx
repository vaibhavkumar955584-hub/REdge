import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  DocumentArrowDownIcon
} from "@heroicons/react/24/outline";

const STEPS = [
  {
    title: "Import or Start Fresh",
    description: "Upload your existing PDF/JSON or start from a clean slate. Our parser handles the heavy lifting.",
    icon: CloudArrowUpIcon,
  },
  {
    title: "Refine Your Story",
    description: "Use our intuitive editor to focus on your impact. Live ATS scoring guides your improvements.",
    icon: PencilSquareIcon,
  },
  {
    title: "Download & Apply",
    description: "Export your polished, recruiter-ready PDF and land that interview with confidence.",
    icon: DocumentArrowDownIcon,
  },
];

export const Steps = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Three simple steps to your dream job.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200/50 -z-10" />

          {STEPS.map((step, idx) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center glass-card relative ring-8 ring-white/10">
                <step.icon className="h-10 w-10 text-primary-600" />
                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                  {idx + 1}
                </div>
              </div>
              <h3 className="mt-8 text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-4 text-base text-slate-600 max-w-[280px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
};
