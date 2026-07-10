import { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { useAutosizeTextareaHeight } from "lib/hooks/useAutosizeTextareaHeight";
import { cx } from "lib/cx";

interface InputProps<K extends string, V extends string | string[]> {
  label: string;
  labelClassName?: string;
  name: K;
  value?: V;
  placeholder: string;
  onChange: (name: K, value: V) => void;
}

export const InputGroupWrapper = ({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children?: React.ReactNode;
}) => (
  <label className={cx("block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-primary-600", className)}>
    {label}
    {children}
  </label>
);

export const INPUT_CLASS_NAME =
  "block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-tiny outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 sm:text-sm font-medium";

export const Input = <K extends string>({
  name,
  value = "",
  placeholder,
  onChange,
  label,
  labelClassName,
}: InputProps<K, string>) => {
  return (
    <InputGroupWrapper label={label} className={labelClassName}>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={INPUT_CLASS_NAME}
      />
    </InputGroupWrapper>
  );
};

export const Textarea = <T extends string>({
  label,
  labelClassName: wrapperClassName,
  name,
  value = "",
  placeholder,
  onChange,
}: InputProps<T, string>) => {
  const textareaRef = useAutosizeTextareaHeight({ value });

  return (
    <InputGroupWrapper label={label} className={wrapperClassName}>
      <textarea
        ref={textareaRef}
        name={name}
        className={`${INPUT_CLASS_NAME} resize-none overflow-hidden min-h-[100px] leading-relaxed`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </InputGroupWrapper>
  );
};

export const BulletListTextarea = <T extends string>(
  props: InputProps<T, string[]> & { showBulletPoints?: boolean }
) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const isFirefox = navigator.userAgent.includes("Firefox");
    const isSafari =
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome");
    if (isFirefox || isSafari) {
      setShowFallback(true);
    }
  }, []);

  if (showFallback) {
    return <BulletListTextareaFallback {...props} />;
  }
  return <BulletListTextareaGeneral {...props} />;
};

const BulletListTextareaGeneral = <T extends string>({
  label,
  labelClassName: wrapperClassName,
  name,
  value: bulletListStrings = [],
  placeholder,
  onChange,
  showBulletPoints = true,
}: InputProps<T, string[]> & { showBulletPoints?: boolean }) => {
  const html = getHTMLFromBulletListStrings(bulletListStrings);
  return (
    <InputGroupWrapper label={label} className={wrapperClassName}>
      <ContentEditable
        contentEditable={true}
        className={`${INPUT_CLASS_NAME} cursor-text min-h-[120px] leading-relaxed [&>div]:list-item ${
          showBulletPoints ? "pl-8" : "[&>div]:list-['']"
        }`}
        onChange={(e) => {
          if (e.type === "input") {
            const { innerText } = e.currentTarget as HTMLDivElement;
            const newBulletListStrings =
              getBulletListStringsFromInnerText(innerText);
            onChange(name, newBulletListStrings);
          }
        }}
        html={html}
      />
    </InputGroupWrapper>
  );
};

const NORMALIZED_LINE_BREAK = "\n";
const normalizeLineBreak = (str: string) =>
  str.replace(/\r?\n/g, NORMALIZED_LINE_BREAK);
const dedupeLineBreak = (str: string) =>
  str.replace(/\n\n/g, NORMALIZED_LINE_BREAK);
const getStringsByLineBreak = (str: string) => str.split(NORMALIZED_LINE_BREAK);

const getBulletListStringsFromInnerText = (innerText: string) => {
  const innerTextWithNormalizedLineBreak = normalizeLineBreak(innerText);
  let newInnerText = dedupeLineBreak(innerTextWithNormalizedLineBreak);
  if (newInnerText === NORMALIZED_LINE_BREAK) {
    newInnerText = "";
  }
  return getStringsByLineBreak(newInnerText);
};

const getHTMLFromBulletListStrings = (bulletListStrings: string[]) => {
  if (bulletListStrings.length === 0) {
    return "<div></div>";
  }
  return bulletListStrings.map((text) => `<div>${text}</div>`).join("");
};

const BulletListTextareaFallback = <T extends string>({
  label,
  labelClassName,
  name,
  value: bulletListStrings = [],
  placeholder,
  onChange,
  showBulletPoints = true,
}: InputProps<T, string[]> & { showBulletPoints?: boolean }) => {
  const textareaValue = getTextareaValueFromBulletListStrings(
    bulletListStrings,
    showBulletPoints
  );

  return (
    <Textarea
      label={label}
      labelClassName={labelClassName}
      name={name}
      value={textareaValue}
      placeholder={placeholder}
      onChange={(name, value) => {
        onChange(
          name,
          getBulletListStringsFromTextareaValue(value, showBulletPoints)
        );
      }}
    />
  );
};

const getTextareaValueFromBulletListStrings = (
  bulletListStrings: string[],
  showBulletPoints: boolean
) => {
  const prefix = showBulletPoints ? "• " : "";
  if (bulletListStrings.length === 0) {
    return prefix;
  }
  let value = "";
  for (let i = 0; i < bulletListStrings.length; i++) {
    const string = bulletListStrings[i];
    const isLastItem = i === bulletListStrings.length - 1;
    value += `${prefix}${string}${isLastItem ? "" : "\r\n"}`;
  }
  return value;
};

const getBulletListStringsFromTextareaValue = (
  textareaValue: string,
  showBulletPoints: boolean
) => {
  const textareaValueWithNormalizedLineBreak =
    normalizeLineBreak(textareaValue);
  const strings = getStringsByLineBreak(textareaValueWithNormalizedLineBreak);
  if (showBulletPoints) {
    const nonEmptyStrings = strings.filter((s) => s !== "•");
    let newStrings: string[] = [];
    for (let string of nonEmptyStrings) {
      if (string.startsWith("• ")) {
        newStrings.push(string.slice(2));
      } else if (string.startsWith("•")) {
        const lastItemIdx = newStrings.length - 1;
        if (lastItemIdx >= 0) {
          const lastItem = newStrings[lastItemIdx];
          newStrings[lastItemIdx] = `${lastItem}${string.slice(1)}`;
        } else {
          newStrings.push(string.slice(1));
        }
      } else {
        newStrings.push(string);
      }
    }
    return newStrings;
  }
  return strings;
};
