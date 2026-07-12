import {
  ShieldCheckIcon,
  BoltIcon,
  PaintBrushIcon,
  MagnifyingGlassIcon,
  CloudArrowDownIcon,
  LockClosedIcon,
  DocumentTextIcon,
  RocketLaunchIcon
} from "@heroicons/react/24/outline";

const FEATURES = [
  {
    title: "ATS-Proof Intelligence",
    description: "Our templates are battle-tested against major ATS platforms like Greenhouse, Lever, and Workday.",
    icon: MagnifyingGlassIcon,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Instant PDF Export",
    description: "Download a perfectly formatted, high-quality PDF resume in seconds. No watermarks, ever.",
    icon: CloudArrowDownIcon,
    color: "text-primary-600",
    bg: "bg-primary-50"
  },
  {
    title: "Privacy by Design",
    description: "We don't store your personal data. Everything happens locally in your browser for 100% security.",
    icon: LockClosedIcon,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: "Modern Typography",
    description: "Curated font pairings designed by pros to ensure your resume is highly readable and professional.",
    icon: PaintBrushIcon,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    title: "Real-time Preview",
    description: "See exactly how your resume looks as you type. No more guessing how it will print.",
    icon: DocumentTextIcon,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    title: "Blazing Fast UI",
    description: "Built with Next.js 14 for a smooth, lag-free experience that respects your time.",
    icon: BoltIcon,
    color: "text-rose-600",
    bg: "bg-rose-50"
  }
];

export const Features = () => {
  return (
    <section className="py-24 sm:py-32 bg-transparent relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600 uppercase tracking-widest">Capabilities</h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Smarter resume building.
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Professional features designed for the modern job seeker, focused on simplicity, speed, and high-conversion results.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="relative pl-16 group">
                <dt className="text-base font-bold leading-7 text-slate-900">
                  <div className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center glass-panel ${feature.color} transition-transform duration-300 group-hover:scale-110 shadow-soft`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
