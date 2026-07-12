import {
  ShieldCheckIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const OBJECTIONS = [
  {
    title: "100% Free Forever",
    description: "No hidden fees, no credit card, and no watermarks on your downloads.",
    icon: CurrencyDollarIcon,
  },
  {
    title: "Privacy First",
    description: "Your data never leaves your browser. We have no servers to store it.",
    icon: ShieldCheckIcon,
  },
  {
    title: "No Account Needed",
    description: "Start building immediately. No tedious sign-up or email verification.",
    icon: UserPlusIcon,
  },
  {
    title: "ATS-Optimized",
    description: "Built-in intelligence ensures your resume passes every screening bot.",
    icon: SparklesIcon,
  },
];

export const NoObjections = () => (
  <section className="mt-8 lg:mt-12 py-10 px-6 glass-panel rounded-3xl">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {OBJECTIONS.map((item) => (
        <div key={item.title} className="flex flex-col items-center text-center group">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-primary-100 mb-4 group-hover:scale-110 transition-transform duration-300">
            <item.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-[200px]">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);
