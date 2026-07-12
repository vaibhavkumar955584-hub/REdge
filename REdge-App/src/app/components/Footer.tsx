import Link from "next/link";
import { Logo } from "components/brand/Logo";

export const Footer = () => {
  return (
    <footer className="relative z-20 bg-white/70 backdrop-blur-xl border-t border-gray-200/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-4">
              <Logo size="lg" />
              <div>
                <p className="mt-1 text-sm font-medium text-gray-600">
                  Build resumes that get interviews.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Empowering job seekers with modern, ATS-friendly resumes. Built for the future of work.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Product</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/resume-builder" className="text-base text-gray-500 hover:text-gray-900">
                  Builder
                </Link>
              </li>
              <li>
                <Link href="/resume-parser" className="text-base text-gray-500 hover:text-gray-900">
                  Parser
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <span className="text-base text-gray-500">
                  vaibhavkumar955584@gmail.com
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <span className="text-base text-gray-500">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-base text-gray-500">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} REdge. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              #DigitalHeroes
            </a>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex space-x-6">
              <span className="text-gray-400 hover:text-gray-500 cursor-pointer">
                Twitter
              </span>
              <span className="text-gray-400 hover:text-gray-500 cursor-pointer">
                LinkedIn
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
