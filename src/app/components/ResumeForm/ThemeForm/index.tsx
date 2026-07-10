import { BaseForm } from "components/ResumeForm/Form";
import { THEME_COLORS } from "components/ResumeForm/ThemeForm/constants";
import { InlineInput } from "components/ResumeForm/ThemeForm/InlineInput";
import {
  DocumentSizeSelections,
  FontFamilySelectionsCSR,
  FontSizeSelections,
} from "components/ResumeForm/ThemeForm/Selection";
import {
  changeSettings,
  DEFAULT_THEME_COLOR,
  selectSettings,
  type GeneralSetting,
} from "lib/redux/settingsSlice";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import type { FontFamily } from "components/fonts/constants";
import { PaintBrushIcon, SwatchIcon, VariableIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { cx } from "lib/cx";

export const ThemeForm = () => {
  const settings = useAppSelector(selectSettings);
  const { fontSize, fontFamily, documentSize } = settings;
  const themeColor = settings.themeColor || DEFAULT_THEME_COLOR;
  const dispatch = useAppDispatch();

  const handleSettingsChange = (field: GeneralSetting, value: string) => {
    dispatch(changeSettings({ field, value }));
  };

  return (
    <BaseForm className="overflow-hidden">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 shadow-tiny ring-1 ring-primary-100">
            <PaintBrushIcon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 font-display">
              Visual Identity
            </h1>
            <p className="text-sm font-medium text-slate-500">Fine-tune the look and feel of your professional story.</p>
          </div>
        </div>

        {/* Theme Color Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <SwatchIcon className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Accent Color</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <div className="flex flex-wrap gap-3">
              {THEME_COLORS.map((color, idx) => (
                <button
                  key={idx}
                  className={cx(
                    "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 border-2",
                    settings.themeColor === color ? "border-slate-900 ring-4 ring-slate-100" : "border-white"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => handleSettingsChange("themeColor", color)}
                >
                  {settings.themeColor === color && (
                    <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              ))}
            </div>
            <div className="hidden sm:block h-10 w-px bg-slate-200 mx-2" />
            <div className="flex-1 min-w-[140px]">
                <InlineInput
                  label="HEX CODE"
                  name="themeColor"
                  value={settings.themeColor}
                  placeholder={DEFAULT_THEME_COLOR}
                  onChange={handleSettingsChange}
                  inputStyle={{ color: themeColor, fontWeight: '900' }}
                  className="w-full"
                />
            </div>
          </div>
        </div>

        {/* Typography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
             <div className="flex items-center gap-2 mb-2">
                <VariableIcon className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Typography</span>
              </div>
            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                <FontFamilySelectionsCSR
                  selectedFontFamily={fontFamily}
                  themeColor={themeColor}
                  handleSettingsChange={handleSettingsChange}
                />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Size (pt)</span>
                </div>
                <div className="w-16">
                    <InlineInput
                    label=""
                    name="fontSize"
                    value={fontSize}
                    placeholder="11"
                    onChange={handleSettingsChange}
                    className="text-right"
                    />
                </div>
            </div>
            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 min-h-[140px] flex items-center">
                <FontSizeSelections
                  fontFamily={fontFamily as FontFamily}
                  themeColor={themeColor}
                  selectedFontSize={fontSize}
                  handleSettingsChange={handleSettingsChange}
                />
            </div>
          </div>
        </div>

        {/* Layout Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <ArrowsPointingOutIcon className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Page Standard</span>
          </div>
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <DocumentSizeSelections
                themeColor={themeColor}
                selectedDocumentSize={documentSize}
                handleSettingsChange={handleSettingsChange}
              />
          </div>
        </div>
      </div>
    </BaseForm>
  );
};
