"use client";
import { Fragment } from "react";
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react";
import { CheckIcon, XMarkIcon, RocketLaunchIcon, SparklesIcon, ShareIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const DownloadSuccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60 transition-opacity backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-90"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-90"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-[2.5rem] bg-white p-8 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {/* Close Button */}
                <button
                    type="button"
                    className="absolute right-6 top-6 rounded-xl p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                    onClick={onClose}
                >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="text-center">
                  {/* Animated Header Icon */}
                  <div className="relative mx-auto h-24 w-24 mb-8">
                     <div className="absolute inset-0 bg-primary-100 rounded-[2rem] rotate-6 animate-pulse" />
                     <div className="absolute inset-0 bg-primary-500 rounded-[2rem] -rotate-3 shadow-lg flex items-center justify-center">
                        <RocketLaunchIcon className="h-12 w-12 text-white" />
                     </div>
                     <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center">
                        <CheckIcon className="h-4 w-4 text-white stroke-[4]" />
                     </div>
                  </div>

                  <DialogTitle as="h3" className="text-3xl font-black text-slate-900 font-display tracking-tight leading-tight">
                    Your future is ready!
                  </DialogTitle>

                  <div className="mt-4 px-4">
                    <p className="text-base font-medium text-slate-500 leading-relaxed">
                      Your professional resume has been downloaded successfully. We're rooting for you to land that dream role!
                    </p>
                  </div>

                  {/* Action Grid */}
                  <div className="mt-10 grid grid-cols-2 gap-4">
                     <button
                        onClick={onClose}
                        className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all group"
                     >
                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                           <SparklesIcon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-700">Refine Style</span>
                     </button>

                     <Link
                        href="/resume-parser"
                        className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all group"
                     >
                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                           <MagnifyingGlassIcon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-700">Check ATS</span>
                     </Link>

                     <button
                        className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all group col-span-2"
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: 'REdge - Professional Resume Builder',
                                    text: 'I just built my professional resume on REdge for free!',
                                    url: window.location.origin,
                                });
                            }
                        }}
                     >
                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                           <ShareIcon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-700">Share REdge with friends</span>
                     </button>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-100">
                     <button
                        type="button"
                        className="btn-primary w-full py-4 text-lg font-black tracking-tight shadow-elevated"
                        onClick={onClose}
                     >
                        Back to Workspace
                     </button>
                  </div>

                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                     Thank you for choosing REdge
                  </p>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
