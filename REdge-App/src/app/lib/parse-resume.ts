import { parseResumeFromPdf } from "lib/parse-resume-from-pdf";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import type { TextItems } from "lib/parse-resume-from-pdf/types";

export const parseResume = async (file: File) => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const fileUrl = URL.createObjectURL(file);

  if (extension === 'pdf') {
    return await parseResumeFromPdf(fileUrl);
  } else if (extension === 'txt') {
    return await parseResumeFromTxt(file);
  } else if (extension === 'docx') {
    // For now, DOCX parsing is not fully implemented without mammoth.js
    // We fall back to TXT-like parsing if possible, or throw error
    throw new Error("DOCX parsing is currently being restored. Please use PDF or TXT for now.");
  } else {
    throw new Error("Unsupported file format");
  }
};

const parseResumeFromTxt = async (file: File) => {
  const text = await file.text();
  const linesRaw = text.split('\n');

  const textItems: TextItems = linesRaw.map((lineText, idx) => ({
    text: lineText,
    x: 0,
    y: linesRaw.length - idx,
    width: 0,
    height: 0,
    fontName: (lineText === lineText.toUpperCase() && lineText.trim().length > 3) ? 'Arial-Bold' : 'Arial',
    hasEOL: true,
  }));

  const lines = groupTextItemsIntoLines(textItems);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  return resume;
};
