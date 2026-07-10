"use client";
import { getHasUsedAppBefore } from "lib/redux/local-storage";
import { ResumeDropzone } from "components/ResumeDropzone";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ImportResume() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);
  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  return (
    <main className="min-h-[calc(100vh-var(--top-nav-bar-height))] bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl bg-white rounded-3xl shadow-premium border border-gray-100 p-8 sm:p-12 text-center transition-all duration-300 hover:shadow-soft">
        {!hasUsedAppBefore ? (
          <>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
              Import your resume
            </h1>
            <p className="text-gray-600 mb-8">
              We'll parse your existing PDF to get you started in seconds.
            </p>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
            {!hasAddedResume && (
              <>
                <OrDivider />
                <SectionWithHeadingAndCreateButton
                  heading="Don't have a resume yet?"
                  buttonText="Create from scratch"
                />
              </>
            )}
          </>
        ) : (
          <>
            {!hasAddedResume && (
              <>
                <SectionWithHeadingAndCreateButton
                  heading="Welcome back!"
                  subheading="You have data saved in your browser from a prior session."
                  buttonText="Continue editing"
                />
                <OrDivider />
              </>
            )}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Start fresh
            </h1>
            <p className="text-gray-600 mb-8">
              Upload a new resume to override your current data.
            </p>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
          </>
        )}
      </div>
    </main>
  );
}

const OrDivider = () => (
  <div className="flex items-center py-10" aria-hidden="true">
    <div className="flex-grow border-t border-gray-100" />
    <span className="mx-4 text-sm font-bold uppercase tracking-wider text-gray-400">or</span>
    <div className="flex-grow border-t border-gray-100" />
  </div>
);

const SectionWithHeadingAndCreateButton = ({
  heading,
  subheading,
  buttonText,
}: {
  heading: string;
  subheading?: string;
  buttonText: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{heading}</h2>
      {subheading && <p className="text-gray-600 mb-6">{subheading}</p>}
      <div className="mt-4 w-full sm:w-auto">
        <Link
          href="/resume-builder"
          className="btn-primary w-full sm:w-auto px-8 py-3 text-base"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};
