"use client";
import { useState, useEffect } from "react";
import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "components/ResumeDropzone";
import { cx } from "lib/cx";
import { Link } from "components/documentation";
import { ResumeTable } from "resume-parser/ResumeTable";
import { ResumeParserAlgorithmArticle } from "resume-parser/ResumeParserAlgorithmArticle";
import { ATSScore } from "resume-parser/ATSScore";
import { DocumentMagnifyingGlassIcon, ArrowPathIcon, SwatchIcon } from "@heroicons/react/24/outline";

const RESUME_EXAMPLES = [
  {
    fileUrl: "resume-example/laverne-resume.pdf",
    description: (
      <span>
        Borrowed from University of La Verne Career Center -{" "}
        <Link href="https://laverne.edu/careers/wp-content/uploads/sites/15/2010/12/Undergraduate-Student-Resume-Examples.pdf">
          Link
        </Link>
      </span>
    ),
  },
  {
    fileUrl: "resume-example/redge-resume.pdf",
    description: (
      <span>
        Created with REdge resume builder -{" "}
        <Link href="/resume-builder">Link</Link>
      </span>
    ),
  },
];

const defaultFileUrl = RESUME_EXAMPLES[0]["fileUrl"];
export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  const [isLoading, setIsLoading] = useState(true);

  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    async function test() {
      setIsLoading(true);
      try {
        const textItems = await readPdf(fileUrl);
        setTextItems(textItems);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    test();
  }, [fileUrl]);

  return (
    <main className="h-full w-full bg-slate-50/50">
      <div className="flex h-[calc(100vh-var(--top-nav-bar-height))]">
        {/* Left Column - PDF Preview & Re-upload */}
        <div className="hidden lg:flex w-[45%] xl:w-[40%] flex-col p-8 xl:p-12 overflow-y-auto bg-slate-100/50 border-r border-slate-200/60 custom-scrollbar gap-8">
          {textItems.length > 0 && (
             <div className="relative animate-slide-up">
                <div className="absolute inset-0 bg-primary-50/50 rounded-[2.5rem] -z-10 blur-2xl opacity-50" />
                <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-elevated">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg">
                          <ArrowPathIcon className="h-5 w-5" />
                      </div>
                      <div>
                         <h2 className="text-lg font-black text-slate-900 tracking-tight font-display leading-tight">Deep Analysis Again</h2>
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Upload refined version</p>
                      </div>
                   </div>
                   <ResumeDropzone
                     onFileUrlChange={(fileUrl) =>
                       setFileUrl(fileUrl || defaultFileUrl)
                     }
                     playgroundView={true}
                   />
                 </div>
             </div>
          )}

          <div className="w-full aspect-[210/297] bg-white shadow-elevated rounded-3xl overflow-hidden border border-slate-200 group relative flex-shrink-0">
            <div className="absolute inset-0 bg-slate-900/5 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
            <iframe src={`${fileUrl}#navpanes=0`} className="h-full w-full" />

            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               Source Document View
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          <section className="max-w-5xl mx-auto p-8 lg:p-12 xl:p-20">
            {!textItems.length && !isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="bg-primary-50 p-8 rounded-[2.5rem] mb-8 ring-1 ring-primary-100">
                  <DocumentMagnifyingGlassIcon className="h-16 w-16 text-primary-600" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-4 font-display tracking-tight">Upload your resume</h1>
                <p className="text-slate-500 mb-10 max-w-sm text-lg font-medium leading-relaxed">
                  Start your deep scan and see how your resume performs against modern recruitment algorithms.
                </p>
                <div className="w-full max-w-lg">
                    <ResumeDropzone
                    onFileUrlChange={(fileUrl) =>
                        setFileUrl(fileUrl || defaultFileUrl)
                    }
                    playgroundView={true}
                    />
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="mb-16">
                   <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight font-display mb-2">Scan Insights</h2>
                        <p className="text-slate-500 font-medium">Real-time analysis of your resume compatibility.</p>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Toggle Samples</span>
                         <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-tiny">
                            {RESUME_EXAMPLES.map((example, idx) => (
                                <button
                                    key={idx}
                                    className={cx(
                                        "px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300",
                                        example.fileUrl === fileUrl
                                            ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                                            : "text-slate-500 hover:text-slate-700"
                                    )}
                                    onClick={() => setFileUrl(example.fileUrl)}
                                >
                                    Sample {idx + 1}
                                </button>
                            ))}
                         </div>
                      </div>
                   </div>
                  <ATSScore resume={resume} isLoading={isLoading} />
                </div>


                <div className="space-y-24">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                       <SwatchIcon className="h-6 w-6 text-primary-600" />
                       <h2 className="text-2xl font-black text-slate-900 tracking-tight font-display uppercase tracking-widest text-lg">
                        Extracted Data Structure
                      </h2>
                    </div>
                    <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-soft">
                      <ResumeTable resume={resume} />
                    </div>
                  </div>

                  <div className="pb-12">
                     <div className="flex items-center gap-3 mb-8">
                       <DocumentMagnifyingGlassIcon className="h-6 w-6 text-primary-600" />
                       <h2 className="text-2xl font-black text-slate-900 tracking-tight font-display uppercase tracking-widest text-lg">
                        Parser Logic Breakdown
                      </h2>
                    </div>
                    <div className="prose prose-slate max-w-none">
                        <ResumeParserAlgorithmArticle
                        textItems={textItems}
                        lines={lines}
                        sections={sections}
                        />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="h-24" />
          </section>
        </div>
      </div>
    </main>
  );
}
