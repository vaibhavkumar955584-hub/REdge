import { useState } from "react";
import { LockClosedIcon, CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { parseResumeFromPdf } from "lib/parse-resume-from-pdf";
import {
  getHasUsedAppBefore,
  saveStateToLocalStorage,
} from "lib/redux/local-storage";
import { type ShowForm, initialSettings } from "lib/redux/settingsSlice";
import { useRouter } from "next/navigation";
import addPdfSrc from "public/assets/add-pdf.svg";
import Image from "next/image";
import { cx } from "lib/cx";
import { deepClone } from "lib/deep-clone";

const defaultFileState = {
  name: "",
  size: 0,
  fileUrl: "",
  file: null as File | null,
};

export const ResumeDropzone = ({
  onFileUrlChange,
  className,
  playgroundView = false,
}: {
  onFileUrlChange: (fileUrl: string) => void;
  className?: string;
  playgroundView?: boolean;
}) => {
  const [file, setFile] = useState(defaultFileState);
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
  const [hasInvalidFile, setHasInvalidFile] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseStatus, setParseStatus] = useState("");
  const router = useRouter();

  const hasFile = Boolean(file.name);

  const setNewFile = (newFile: File) => {
    if (file.fileUrl) {
      URL.revokeObjectURL(file.fileUrl);
    }
    const { name, size } = newFile;
    const fileUrl = URL.createObjectURL(newFile);
    setFile({ name, size, fileUrl, file: newFile });
    onFileUrlChange(fileUrl);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    const extension = newFile.name.split('.').pop()?.toLowerCase();
    if (['pdf', 'docx', 'txt'].includes(extension || '')) {
      setHasInvalidFile(false);
      setNewFile(newFile);
    } else {
      setHasInvalidFile(true);
    }
    setIsHoveredOnDropzone(false);
  };

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const newFile = files[0];
    const extension = newFile.name.split('.').pop()?.toLowerCase();
    if (['pdf', 'docx', 'txt'].includes(extension || '')) {
        setHasInvalidFile(false);
        setNewFile(newFile);
    } else {
        setHasInvalidFile(true);
    }
  };

  const onRemove = () => {
    setFile(defaultFileState);
    onFileUrlChange("");
  };

  const onImportClick = async () => {
    setIsParsing(true);
    setParseStatus("Reading PDF structure...");

    setTimeout(async () => {
        setParseStatus("Extracting sections...");
        const resume = await parseResumeFromPdf(file.fileUrl);

        setTimeout(() => {
            setParseStatus("Optimizing layout...");
            const settings = deepClone(initialSettings);

            if (getHasUsedAppBefore()) {
              const sections = Object.keys(settings.formToShow) as ShowForm[];
              const sectionToFormToShow: Record<ShowForm, boolean> = {
                workExperiences: resume.workExperiences.length > 0,
                educations: resume.educations.length > 0,
                projects: resume.projects.length > 0,
                skills: resume.skills.descriptions.length > 0,
                custom: resume.custom.descriptions.length > 0,
              };
              for (const section of sections) {
                settings.formToShow[section] = sectionToFormToShow[section];
              }
            }

            saveStateToLocalStorage({ resume, settings });
            setParseStatus("Done!");

            setTimeout(() => {
                router.push("/resume-builder");
            }, 500);
        }, 800);
    }, 800);
  };

  return (
    <div
      className={cx(
        "group relative flex justify-center rounded-[2rem] border-2 border-dashed transition-all duration-500",
        isHoveredOnDropzone ? "border-primary-500 bg-primary-50/40" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50",
        playgroundView ? "p-8" : "p-16",
        className
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setIsHoveredOnDropzone(true);
      }}
      onDragLeave={() => setIsHoveredOnDropzone(false)}
      onDrop={onDrop}
    >
      <div className={cx("text-center w-full", playgroundView ? "space-y-4" : "space-y-8")}>
        {!hasFile ? (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-50 text-primary-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm ring-1 ring-primary-100">
              <Image src={addPdfSrc} className="h-12 w-12" alt="Add pdf" priority />
            </div>
            <div className="space-y-3">
              <p className="text-2xl font-black text-slate-900 tracking-tight font-display">
                Drop your resume here
              </p>
              <p className="text-sm font-medium text-slate-500">
                PDF, DOCX, or TXT. Max 10MB.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white border border-slate-100 w-fit mx-auto px-4 py-2 rounded-full shadow-tiny">
              <LockClosedIcon className="h-3 w-3" />
              End-to-end encrypted & local
            </div>
          </>
        ) : isParsing ? (
          <div className="flex flex-col items-center gap-8 py-4 animate-fade-in">
             <div className="relative">
                <div className="h-20 w-20 rounded-3xl bg-primary-50 flex items-center justify-center">
                   <ArrowPathIcon className="h-10 w-10 text-primary-600 animate-spin" />
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                   <CheckCircleIcon className="h-3 w-3 text-white" />
                </div>
             </div>
             <div className="space-y-3">
                <p className="text-xl font-black text-slate-900 font-display">{parseStatus}</p>
                <div className="h-1.5 w-48 bg-slate-100 rounded-full overflow-hidden mx-auto">
                   <div className="h-full bg-primary-600 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }} />
                </div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <DocumentIcon className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="font-black text-slate-900 truncate max-w-[240px] font-display">
                  {file.name}
                </div>
                <div className="text-xs font-bold text-slate-400">
                  {getFileSizeString(file.size)} • Ready to scan
                </div>
              </div>
              <button
                type="button"
                className="ml-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                title="Remove file"
                onClick={onRemove}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {!isParsing && (
            <div className="pt-4">
              {!hasFile ? (
                <>
                  <label className="btn-primary cursor-pointer px-10 py-4 text-base font-bold shadow-elevated">
                    Choose File
                    <input type="file" className="sr-only" accept=".pdf,.docx,.txt" onChange={onInputChange} />
                  </label>
                  {hasInvalidFile && (
                    <p className="mt-4 text-sm font-bold text-rose-500 animate-pulse">
                      Oops! Please select a valid PDF, DOCX, or TXT file.
                    </p>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-6 items-center">
                  {!playgroundView && (
                    <button
                      type="button"
                      className="btn-primary px-12 py-5 text-lg group shadow-elevated"
                      onClick={onImportClick}
                    >
                      Process Resume
                      <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                     <InformationCircleIcon className="h-4 w-4" />
                     Optimized for single-column professional layouts
                  </div>
                </div>
              )}
            </div>
        )}
      </div>
    </div>
  );
};

const DocumentIcon = ({ className }: { className: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const InformationCircleIcon = ({ className }: { className: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const getFileSizeString = (fileSizeB: number) => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  if (fileSizeKB < 1000) return fileSizeKB.toPrecision(3) + " KB";
  return fileSizeMB.toPrecision(3) + " MB";
};
