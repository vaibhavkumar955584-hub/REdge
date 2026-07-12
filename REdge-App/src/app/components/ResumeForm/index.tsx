"use client";
import { useState, useRef, useEffect } from "react";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "lib/redux/hooks";
import { ShowForm, selectFormsOrder } from "lib/redux/settingsSlice";
import { ProfileForm } from "components/ResumeForm/ProfileForm";
import { WorkExperiencesForm } from "components/ResumeForm/WorkExperiencesForm";
import { EducationsForm } from "components/ResumeForm/EducationsForm";
import { ProjectsForm } from "components/ResumeForm/ProjectsForm";
import { SkillsForm } from "components/ResumeForm/SkillsForm";
import { ThemeForm } from "components/ResumeForm/ThemeForm";
import { CustomForm } from "components/ResumeForm/CustomForm";
import {
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  SparklesIcon,
  PaintBrushIcon,
  SquaresPlusIcon,
  CloudArrowUpIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { cx } from "lib/cx";
import Link from "next/link";

const formTypeToConfig: { [type in ShowForm | 'profile' | 'theme']: { title: string, icon: any } } = {
  profile: { title: "Personal Info", icon: UserIcon },
  workExperiences: { title: "Experience", icon: BriefcaseIcon },
  educations: { title: "Education", icon: AcademicCapIcon },
  projects: { title: "Projects", icon: CodeBracketIcon },
  skills: { title: "Skills", icon: SparklesIcon },
  custom: { title: "Custom", icon: SquaresPlusIcon },
  theme: { title: "Design", icon: PaintBrushIcon },
};

export const ResumeForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const formsOrder = useAppSelector(selectFormsOrder);
  const [activeSection, setActiveSection] = useState<string>("profile");
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = ["profile", ...formsOrder, "theme"];

  const formTypeToComponent: { [type: string]: () => JSX.Element } = {
    profile: ProfileForm,
    workExperiences: WorkExperiencesForm,
    educations: EducationsForm,
    projects: ProjectsForm,
    skills: SkillsForm,
    custom: CustomForm,
    theme: ThemeForm,
  };

  return (
    <div className="flex h-full bg-slate-50/50">
      {/* Mini Sidebar Navigation */}
      <aside className="hidden xl:flex w-20 flex-col items-center py-8 border-r border-slate-200 bg-white gap-4">
        {sections.map((section) => {
          const config = formTypeToConfig[section as keyof typeof formTypeToConfig];
          const Icon = config.icon;
          return (
            <button
              key={section}
              onClick={() => {
                const el = document.getElementById(section);
                el?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(section);
              }}
              className={cx(
                "group relative p-3 rounded-xl transition-all duration-200",
                activeSection === section
                  ? "bg-primary-50 text-primary-700 shadow-tiny ring-1 ring-primary-100"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              )}
              title={config.title}
            >
              <Icon className="h-6 w-6" />
              <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                {config.title}
              </span>
            </button>
          );
        })}
      </aside>

      <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar" ref={containerRef}>
        <div className="mx-auto max-w-3xl flex flex-col gap-10 p-8 lg:p-16">
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight font-display uppercase tracking-wider">Craft your story</h1>
              <p className="text-slate-500 mt-2 font-medium">Update your details and see the magic happen instantly.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
               <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to start fresh? This will clear all your current data.")) {
                      localStorage.removeItem("redge-state");
                      window.location.reload();
                    }
                  }}
                  className="btn-secondary px-4 py-2.5 text-xs font-bold"
               >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create New
               </button>
               <Link
                  href="/resume-import"
                  className="btn-primary px-4 py-2.5 text-xs font-bold shadow-soft"
               >
                  <CloudArrowUpIcon className="h-4 w-4 mr-2" />
                  Import Existing Resume
               </Link>
            </div>
          </header>

          <div id="profile" className="scroll-mt-24">
            <ProfileForm />
          </div>

          {formsOrder.map((form) => {
            const Component = formTypeToComponent[form];
            return (
              <div key={form} id={form} className="scroll-mt-24">
                <Component />
              </div>
            );
          })}

          <div id="theme" className="scroll-mt-24">
            <ThemeForm />
          </div>

          <div className="h-32" />
        </div>
      </div>
    </div>
  );
};
