"use client";
import { useMemo } from "react";
import Frame from "react-frame-component";
import {
  A4_HEIGHT_PX,
  A4_WIDTH_PX,
  A4_WIDTH_PT,
  A4_HEIGHT_PT,
  LETTER_HEIGHT_PX,
  LETTER_WIDTH_PX,
  LETTER_WIDTH_PT,
  LETTER_HEIGHT_PT,
} from "lib/constants";
import dynamic from "next/dynamic";
import { getAllFontFamiliesToLoad } from "components/fonts/lib";

const getIframeInitialContent = (isA4: boolean) => {
  const width = isA4 ? A4_WIDTH_PT : LETTER_WIDTH_PT;
  const height = isA4 ? A4_HEIGHT_PT : LETTER_HEIGHT_PT;
  const allFontFamilies = getAllFontFamiliesToLoad();

  const allFontFamiliesPreloadLinks = allFontFamilies
    .map(
      (
        font
      ) => `<link rel="preload" as="font" href="/fonts/${font}-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="/fonts/${font}-Bold.ttf" type="font/ttf" crossorigin="anonymous">`
    )
    .join("");

  const allFontFamiliesFontFaces = allFontFamilies
    .map(
      (
        font
      ) => `@font-face {font-family: "${font}"; src: url("/fonts/${font}-Regular.ttf");}
@font-face {font-family: "${font}"; src: url("/fonts/${font}-Bold.ttf"); font-weight: bold;}`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <head>
    ${allFontFamiliesPreloadLinks}
    <style>
      ${allFontFamiliesFontFaces}
      * {
        box-sizing: border-box;
        word-break: break-word;
        overflow-wrap: break-word;
      }
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden !important;
      }
      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: none;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
      }
      /* Ensure react-pdf components behave like standard layout elements in DOM */
      DOCUMENT {
        display: block;
      }
      PAGE {
        display: flex !important;
        flex-direction: column !important;
        width: ${width}pt !important;
        height: ${height}pt !important;
        background-color: white;
        position: relative;
        flex-shrink: 0;
      }
      VIEW {
        display: flex;
        flex-direction: column;
        position: relative;
        flex-shrink: 1;
        min-width: 0;
      }
      TEXT {
        display: block;
        position: relative;
        flex-shrink: 1;
        min-width: 0;
        max-width: 100%;
      }
      /* Hide scrollbars for all browsers */
      ::-webkit-scrollbar {
        display: none;
      }
      * {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    </style>
  </head>
  <body>
    <div></div>
  </body>
</html>`;
};

/**
 * Iframe is used here for style isolation, since react pdf uses pt unit.
 * It creates a sandbox document body that uses letter/A4 pt size as width.
 */
const ResumeIframe = ({
  documentSize,
  scale,
  children,
  enablePDFViewer = false,
}: {
  documentSize: string;
  scale: number;
  children: React.ReactNode;
  enablePDFViewer?: boolean;
}) => {
  const isA4 = documentSize === "A4";
  const iframeInitialContent = useMemo(
    () => getIframeInitialContent(isA4),
    [isA4]
  );

  if (enablePDFViewer) {
    return (
      <DynamicPDFViewer className="h-full w-full">
        {children as any}
      </DynamicPDFViewer>
    );
  }
  const width = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;
  const height = isA4 ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;

  return (
    <div
      style={{
        width: `${Math.ceil(width * scale)}px`,
        height: `${Math.ceil(height * scale)}px`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          backgroundColor: "white",
        }}
        className="shadow-2xl"
      >
        <Frame
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            overflow: "hidden",
          }}
          initialContent={iframeInitialContent}
          // key is used to force component to re-mount when document size changes
          key={isA4 ? "A4" : "LETTER"}
        >
          {children}
        </Frame>
      </div>
    </div>
  );
};

/**
 * Load iframe client side since iframe can't be SSR
 */
export const ResumeIframeCSR = dynamic(() => Promise.resolve(ResumeIframe), {
  ssr: false,
});

// PDFViewer is only used for debugging. Its size is quite large, so we make it dynamic import
const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  {
    ssr: false,
  }
);
