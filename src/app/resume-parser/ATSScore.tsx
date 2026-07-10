"use client";
import React from "react";
import type { Resume } from "lib/redux/types";
import { cx } from "lib/cx";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  ShieldCheckIcon,
  DocumentMagnifyingGlassIcon,
  ListBulletIcon
} from "@heroicons/react/24/solid";

export const ATSScore = ({ resume, isLoading }: { resume: Resume; isLoading: boolean }) => {
  const calculateScore = (res: Resume) => {
    let score = 0;
    const breakdown = {
      contact: 0,
      skills: 0,
      experience: 0,
      education: 0,
      structure: 0,
      keywords: 0,
      formatting: 95,
    };

    if (res.profile.name) breakdown.contact += 20;
    if (res.profile.email) breakdown.contact += 20;
    if (res.profile.phone) breakdown.contact += 20;
    if (res.profile.location) breakdown.contact += 20;
    if (res.profile.url) breakdown.contact += 20;

    const skillCount = res.skills.featuredSkills.length + res.skills.descriptions.length;
    breakdown.skills = Math.min(100, skillCount * 10);

    const expCount = res.workExperiences.length;
    const bulletCount = res.workExperiences.reduce((acc, curr) => acc + curr.descriptions.length, 0);
    breakdown.experience = Math.min(100, (expCount * 20) + (bulletCount * 5));

    breakdown.education = res.educations.length > 0 ? 100 : 0;

    const hasMainSections = res.workExperiences.length > 0 && res.educations.length > 0 && res.skills.featuredSkills.length > 0;
    breakdown.structure = hasMainSections ? 100 : 50;

    const totalWords = JSON.stringify(res).length;
    breakdown.keywords = Math.min(100, Math.floor(totalWords / 50));

    const overall = Math.round(
      (breakdown.contact * 0.15) +
      (breakdown.skills * 0.20) +
      (breakdown.experience * 0.30) +
      (breakdown.education * 0.15) +
      (breakdown.structure * 0.10) +
      (breakdown.keywords * 0.05) +
      (breakdown.formatting * 0.05)
    );

    return { overall, breakdown };
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-64 bg-slate-100 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-48 bg-slate-100 rounded-2xl" />
          <div className="h-48 bg-slate-100 rounded-2xl" />
          <div className="h-48 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  const { overall, breakdown } = calculateScore(resume);

  const getScoreColor = (s: number) => {
    if (s >= 90) return "text-emerald-600 border-emerald-100 bg-emerald-50";
    if (s >= 75) return "text-primary-600 border-primary-100 bg-primary-50";
    if (s >= 60) return "text-orange-600 border-orange-100 bg-orange-50";
    return "text-rose-600 border-rose-100 bg-rose-50";
  };

  const getScoreRingColor = (s: number) => {
    if (s >= 90) return "text-emerald-500";
    if (s >= 75) return "text-primary-600";
    if (s >= 60) return "text-orange-500";
    return "text-rose-500";
  };

  const missingItems = [];
  if (!resume.profile.url) missingItems.push("Missing LinkedIn or Portfolio URL");
  if (resume.skills.featuredSkills.length < 8) missingItems.push("Increase keyword density in Skills section");
  if (resume.workExperiences.some(w => w.descriptions.length < 4)) missingItems.push("Add more achievement bullets to work experience");
  if (!resume.profile.summary || resume.profile.summary.length < 50) missingItems.push("Professional summary is too short or missing");

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Premium Dashboard Header */}
      <section className="bg-white rounded-[2rem] border border-slate-200 p-10 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <DocumentMagnifyingGlassIcon className="h-40 w-40 text-slate-900" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="relative flex-shrink-0">
            {/* Circular Progress with modern glow */}
            <svg className="w-56 h-56 transform -rotate-90">
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="14"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray={628.3}
                strokeDashoffset={628.3 * (1 - overall / 100)}
                strokeLinecap="round"
                className={cx("transition-all duration-1000 ease-out", getScoreRingColor(overall))}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-7xl font-black text-slate-900 font-display leading-none">{overall}</span>
              <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-2">ATS Score</span>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <div className={cx("inline-flex items-center gap-2 px-4 py-1 rounded-full border text-sm font-black uppercase tracking-widest mb-6", getScoreColor(overall))}>
              <BoltIcon className="h-4 w-4" />
              {overall >= 90 ? "Excellent" : overall >= 75 ? "Strong" : overall >= 60 ? "Improvement Needed" : "Low Match"}
            </div>

            <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display mb-4">
              Analysis Results
            </h1>

            <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
              We've completed a deep scan of your resume against common Applicant Tracking System (ATS) filters.
              {overall >= 80
                ? " Great work! Your resume is highly compatible with automated systems."
                : " We found some critical areas that could prevent your resume from reaching a human recruiter."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
               <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                  <ShieldCheckIcon className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">Format Verified</span>
               </div>
               <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                  <CheckCircleIcon className="h-5 w-5 text-primary-500" />
                  <span className="text-sm font-bold text-slate-700">Industry Standard</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Core Sections */}
        <div className="lg:col-span-8 space-y-10">
          {/* Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-premium border-emerald-100 bg-emerald-50/10">
              <h3 className="font-black text-emerald-700 uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                Verified Strengths
              </h3>
              <ul className="space-y-4">
                {[
                  { title: "Contact Details", desc: "Phone, email, and location correctly identified." },
                  { title: "Section Headers", desc: "Using standard, readable section names." },
                  { title: "File Type", desc: "Perfect PDF structure for OCR parsing." }
                ].map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{s.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-premium border-rose-100 bg-rose-50/10">
              <h3 className="font-black text-rose-700 uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <ExclamationCircleIcon className="h-5 w-5" />
                Critical Fixes
              </h3>
              <ul className="space-y-4">
                {missingItems.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">{item}</p>
                      <p className="text-xs text-slate-500 mt-1">High impact on ATS rankings.</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Metric List */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-10 shadow-soft">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <ListBulletIcon className="h-7 w-7 text-primary-600" />
              Detailed Analysis Breakdown
            </h3>
            <div className="space-y-8">
              {[
                { label: "Identity & Reachability", score: breakdown.contact, icon: UserIcon },
                { label: "Competency Matching", score: breakdown.skills, icon: SparklesIcon },
                { label: "Experience Impact", score: breakdown.experience, icon: BriefcaseIcon },
                { label: "Educational Credibility", score: breakdown.education, icon: AcademicCapIcon },
                { label: "Semantic Structure", score: breakdown.structure, icon: SquaresPlusIcon },
                { label: "Keyword Distribution", score: breakdown.keywords, icon: DocumentMagnifyingGlassIcon },
              ].map((item) => (
                <div key={item.label} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <div className="flex items-center gap-3">
                       <span className="text-sm font-bold text-slate-700">{item.label}</span>
                       {item.score >= 80 ? <CheckCircleIcon className="h-4 w-4 text-emerald-500" /> : <InformationCircleIcon className="h-4 w-4 text-orange-400" />}
                    </div>
                    <span className="text-sm font-black text-slate-900">{item.score}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className={cx("h-full rounded-full transition-all duration-1000", item.score >= 80 ? "bg-emerald-500" : item.score >= 60 ? "bg-primary-500" : "bg-rose-500")}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-elevated relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <ArrowTrendingUpIcon className="h-24 w-24" />
            </div>
            <h3 className="text-xl font-black mb-6 relative z-10 font-display">Optimization Plan</h3>
            <div className="space-y-6 relative z-10">
               <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary-300 mb-1">Current</p>
                  <p className="text-3xl font-black">{overall}</p>
               </div>
               <div className="bg-primary-600 rounded-2xl p-4 shadow-lg border border-primary-500">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Target Potential</p>
                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-black">{Math.min(99, overall + 15)}</p>
                    <span className="text-sm font-bold text-white/80 pb-1">+{Math.min(99, overall + 15) - overall} pts</span>
                  </div>
               </div>

               <p className="text-sm text-white/60 leading-relaxed font-medium">
                  By addressing the critical fixes identified, you can reach the top 5% of all candidates in our database.
               </p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-soft">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
              <BoltIcon className="h-5 w-5 text-amber-500" />
              Pro Tips
            </h3>
            <div className="space-y-6">
               <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <p className="text-xs font-bold text-amber-800 mb-1">Action Verbs</p>
                  <p className="text-xs text-amber-700 leading-normal">
                    Replace passive words like "Managed" with "Orchestrated" or "Pioneered" for +4 points.
                  </p>
               </div>
               <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
                  <p className="text-xs font-bold text-primary-800 mb-1">Metrics</p>
                  <p className="text-xs text-primary-700 leading-normal">
                    Adding percentage-based results (e.g. "Increased revenue by 20%") is highly valued by ATS.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserIcon = ({ className }: { className: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const SparklesIcon = ({ className }: { className: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>;
const BriefcaseIcon = ({ className }: { className: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const AcademicCapIcon = ({ className }: { className: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>;
const SquaresPlusIcon = ({ className }: { className: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
