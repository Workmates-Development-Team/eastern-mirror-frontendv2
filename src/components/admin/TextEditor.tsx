"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({
  value,
  setValue,
  plainText,
  setPlainText,
}: {
  value: string;
  setValue: (val: string) => void;
  plainText: string;
  setPlainText: (val: string) => void;
}) => {
  const editor = useRef<any>(null);

  const getPlainText = (html: string) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const config = useMemo(
    () => ({
      placeholder: "Start typing...",
      uploader: {
        insertImageAsBase64URI: true,
      },
      resizer: {
        resize: true,
        min_width: 50,
        min_height: 50,
        max_width: 1000,
        max_height: 1000,
      },
      draggable: true,
      readonly: false,
      theme: "default",
      minHeight: 400,
      toolbar: true,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
    }),
    []
  );

  // Twitter embed auto-render
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [value]);

  // // Wrap inserted images with <figure> and <figcaption>
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const editorDoc = editor.current?.editor?.editorDocument;
  //     if (editorDoc) {
  //       const images = editorDoc.querySelectorAll("img:not([data-captioned])");
  //       images.forEach((img: HTMLImageElement) => {
  //         const figure = document.createElement("figure");
  //         const figcaption = document.createElement("figcaption");
  //         figcaption.innerText = "Image caption here";

  //         img.setAttribute("data-captioned", "true");

  //         const parent = img.parentNode;
  //         if (parent) {
  //           parent.replaceChild(figure, img);
  //           figure.appendChild(img);
  //           figure.appendChild(figcaption);
  //         }
  //       });
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onChange={(newContent) => {
          const text = getPlainText(newContent);
          setPlainText(text);
          setValue(newContent);
        }}
        onBlur={(newContent) => {
          const text = getPlainText(newContent);
          setPlainText(text);
          setValue(newContent);
        }}
      />
    </div>
  );
};

export default TextEditor;
