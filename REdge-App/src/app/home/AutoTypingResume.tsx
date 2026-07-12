"use client";
import { useEffect, useState, useRef } from "react";
import { ResumePDF } from "components/Resume/ResumePDF";
import { initialResumeState } from "lib/redux/resumeSlice";
import { initialSettings } from "lib/redux/settingsSlice";
import { ResumeIframeCSR } from "components/Resume/ResumeIFrame";
import { START_HOME_RESUME, END_HOME_RESUME } from "home/constants";
import { makeObjectCharIterator } from "lib/make-object-char-iterator";
import { deepClone } from "lib/deep-clone";

// countObjectChar(END_HOME_RESUME) -> ~1800 chars
const INTERVAL_MS = 50; // 20 Intervals Per Second
const CHARS_PER_INTERVAL = 10;
// Auto Typing Time:
//  10 CHARS_PER_INTERVAL -> ~1800 / (20*10) = 9s (let's go with 9s so it feels fast)
//  9 CHARS_PER_INTERVAL -> ~1800 / (20*9) = 10s
//  8 CHARS_PER_INTERVAL -> ~1800 / (20*8) = 11s

const RESET_INTERVAL_MS = 60 * 1000; // 60s

import { A4_WIDTH_PX } from "lib/constants";

export const AutoTypingResume = () => {
  const [resume, setResume] = useState(deepClone(initialResumeState));
  const [scale, setScale] = useState(0.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeCharIterator = useRef(
    makeObjectCharIterator(START_HOME_RESUME, END_HOME_RESUME)
  );
  const hasSetEndResume = useRef(false);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Calculate scale to fit the width perfectly with a small safety margin
        const newScale = (containerWidth / A4_WIDTH_PX) * 0.98;
        setScale(newScale);
      }
    };

    updateScale();
    // Use ResizeObserver for more reliable size detection
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);

    window.addEventListener("resize", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let next = resumeCharIterator.current.next();
      for (let i = 0; i < CHARS_PER_INTERVAL - 1; i++) {
        next = resumeCharIterator.current.next();
      }
      if (!next.done) {
        setResume(next.value);
      } else {
        if (!hasSetEndResume.current) {
          setResume(END_HOME_RESUME);
          hasSetEndResume.current = true;
        }
      }
    }, INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      resumeCharIterator.current = makeObjectCharIterator(
        START_HOME_RESUME,
        END_HOME_RESUME
      );
      hasSetEndResume.current = false;
    }, RESET_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex justify-center items-center transition-all duration-500 hover:scale-[1.01] cursor-default overflow-hidden"
    >
      <ResumeIframeCSR documentSize="A4" scale={scale}>
        <ResumePDF
          resume={resume}
          isPDF={false}
          settings={{
            ...initialSettings,
            documentSize: "A4",
            fontSize: "11",
            formToHeading: {
              workExperiences: resume.workExperiences[0].company
                ? "WORK EXPERIENCE"
                : "",
              educations: resume.educations[0].school ? "EDUCATION" : "",
              projects: resume.projects[0].project ? "PROJECT" : "",
              skills: resume.skills.featuredSkills[0].skill ? "SKILLS" : "",
              custom: "CUSTOM SECTION",
            },
          }}
        />
      </ResumeIframeCSR>
    </div>
  );
};
