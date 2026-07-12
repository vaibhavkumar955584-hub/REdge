"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";

export default function Create() {
  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50/50">
        <div className="flex h-[calc(100vh-var(--top-nav-bar-height))]">
          <div className="flex-1 overflow-y-auto">
            <ResumeForm />
          </div>
          <div className="hidden lg:block w-[1px] bg-gray-200" />
          <div className="flex-1 overflow-hidden bg-gray-100/50">
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
  );
}
