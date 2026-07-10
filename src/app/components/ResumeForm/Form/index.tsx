import { ExpanderWithHeightTransition } from "components/ExpanderWithHeightTransition";
import {
  DeleteIconButton,
  MoveIconButton,
  ShowIconButton,
} from "components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  changeFormHeading,
  changeFormOrder,
  changeShowForm,
  selectHeadingByForm,
  selectIsFirstForm,
  selectIsLastForm,
  selectShowByForm,
  ShowForm,
} from "lib/redux/settingsSlice";
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  LightBulbIcon,
  WrenchIcon,
  PlusSmallIcon,
  SquaresPlusIcon
} from "@heroicons/react/24/outline";
import {
  addSectionInForm,
  deleteSectionInFormByIdx,
  moveSectionInForm,
} from "lib/redux/resumeSlice";

export const BaseForm = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-soft group ${className}`}
  >
    {children}
  </section>
);

const FORM_TO_ICON: { [section in ShowForm]: typeof BuildingOfficeIcon } = {
  workExperiences: BuildingOfficeIcon,
  educations: AcademicCapIcon,
  projects: LightBulbIcon,
  skills: WrenchIcon,
  custom: SquaresPlusIcon,
};

export const Form = ({
  form,
  addButtonText,
  children,
}: {
  form: ShowForm;
  addButtonText?: string;
  children: React.ReactNode;
}) => {
  const showForm = useAppSelector(selectShowByForm(form));
  const heading = useAppSelector(selectHeadingByForm(form));

  const dispatch = useAppDispatch();
  const setShowForm = (showForm: boolean) => {
    dispatch(changeShowForm({ field: form, value: showForm }));
  };
  const setHeading = (heading: string) => {
    dispatch(changeFormHeading({ field: form, value: heading }));
  };

  const isFirstForm = useAppSelector(selectIsFirstForm(form));
  const isLastForm = useAppSelector(selectIsLastForm(form));

  const handleMoveClick = (type: "up" | "down") => {
    dispatch(changeFormOrder({ form, type }));
  };

  const Icon = FORM_TO_ICON[form];

  return (
    <BaseForm
      className={`transition-all duration-300 ${
        showForm ? "pb-8" : "pb-6 opacity-75 grayscale-[0.2] bg-slate-50/30"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${showForm ? "bg-primary-50 text-primary-700 shadow-tiny ring-1 ring-primary-100" : "bg-slate-100 text-slate-400"}`}>
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="block w-full border-b border-transparent bg-transparent py-1 text-xl font-black tracking-tight text-slate-900 outline-none transition-all duration-200 hover:border-slate-200 focus:border-primary-500 font-display"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {!isFirstForm && (
            <MoveIconButton type="up" onClick={handleMoveClick} />
          )}
          {!isLastForm && (
            <MoveIconButton type="down" onClick={handleMoveClick} />
          )}
          <ShowIconButton show={showForm} setShow={setShowForm} />
        </div>
      </div>
      <ExpanderWithHeightTransition expanded={showForm}>
        <div className="mt-8 border-t border-slate-100 pt-8 animate-fade-in">{children}</div>
      </ExpanderWithHeightTransition>
      {showForm && addButtonText && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              dispatch(addSectionInForm({ form }));
            }}
            className="group flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 px-6 py-4 text-sm font-bold text-slate-500 transition-all duration-300 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 w-full"
          >
            <PlusSmallIcon
              className="h-6 w-6 text-slate-400 transition-colors group-hover:text-primary-600"
              aria-hidden="true"
            />
            {addButtonText}
          </button>
        </div>
      )}
    </BaseForm>
  );
};

export const FormSection = ({
  form,
  idx,
  showMoveUp,
  showMoveDown,
  showDelete,
  deleteButtonTooltipText,
  children,
}: {
  form: ShowForm;
  idx: number;
  showMoveUp: boolean;
  showMoveDown: boolean;
  showDelete: boolean;
  deleteButtonTooltipText: string;
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteSectionInFormByIdx({ form, idx }));
  };
  const handleMoveClick = (direction: "up" | "down") => {
    dispatch(moveSectionInForm({ form, direction, idx }));
  };

  return (
    <>
      {idx !== 0 && (
        <div className="my-10 border-t border-slate-100 relative">
           <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full border border-slate-100 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Section {idx + 1}</div>
        </div>
      )}
      <div className="relative grid grid-cols-6 gap-6">
        {children}
        <div className="absolute -right-4 lg:-right-6 top-0 flex flex-col gap-2 p-1 bg-white/50 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div
            className={`transition-all duration-300 ${
              showMoveUp ? "translate-x-0" : "invisible opacity-0 translate-x-4"
            }`}
          >
            <MoveIconButton
              type="up"
              size="small"
              onClick={() => handleMoveClick("up")}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              showMoveDown ? "translate-x-0" : "invisible opacity-0 translate-x-4"
            }`}
          >
            <MoveIconButton
              type="down"
              size="small"
              onClick={() => handleMoveClick("down")}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              showDelete ? "translate-x-0" : "invisible opacity-0 translate-x-4"
            }`}
          >
            <DeleteIconButton
              onClick={handleDeleteClick}
              tooltipText={deleteButtonTooltipText}
            />
          </div>
        </div>
      </div>
    </>
  );
};
