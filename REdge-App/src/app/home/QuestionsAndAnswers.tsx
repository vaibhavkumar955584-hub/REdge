"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const FAQS = [
  {
    question: "Is REdge really free?",
    answer: "Yes, REdge is 100% free to use. You can build, customize, and download your resume as a high-quality PDF without any watermarks or hidden costs."
  },
  {
    question: "How does the ATS scoring work?",
    answer: "Our engine analyzes your resume content against industry-standard ATS algorithms. It checks for keyword density, formatting, section clarity, and contact information to give you a score from 0-100."
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. We follow a 'Privacy First' philosophy. Your data is stored locally in your browser (LocalStorage) and never uploaded to our servers. You have total control."
  },
  {
    question: "Can I import my existing resume?",
    answer: "Yes! Our parser can extract information from most PDF resumes, saving you the time of re-typing everything. Just upload and refine."
  },
  {
    question: "Do I need an account to start?",
    answer: "No registration is required. You can start building your resume immediately. We use Google Sign-in only if you want to sync your data across devices, but it's completely optional."
  }
];

export const QuestionsAndAnswers = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about REdge and how it helps your career.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <Disclosure key={idx} as="div" className="glass-panel rounded-2xl overflow-hidden transition-all duration-200">
              <DisclosureButton className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-bold text-slate-900 hover:bg-white/20 transition-colors group">
                <span>{faq.question}</span>
                <ChevronDownIcon className="h-5 w-5 text-slate-500 transition-transform duration-300 group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="px-6 pb-6 pt-2 text-base leading-relaxed text-slate-600 animate-fade-in">
                {faq.answer}
              </DisclosurePanel>
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
};
