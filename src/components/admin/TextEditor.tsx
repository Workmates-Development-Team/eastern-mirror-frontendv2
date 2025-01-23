import dynamic from "next/dynamic";
import React, { useMemo, useRef, useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({ value, setValue }: { value: any; setValue: any }) => {
  const editor = useRef(null);
  const [plainText, setPlainText] = useState("");
  const getPlainText = (html: string) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  // console.log(plainText);
  // console.log(value)

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

      zIndex: 0,
      readonly: false,
      theme: "default",
      saveModeInCookie: false,
      spellcheck: true,
      editorCssClass: false,
      triggerChangeEvent: true,
      width: "auto",
      height: "auto",
      minHeight: 400,
      language: "auto",
      debugLanguage: false,
      tabIndex: -1,
      toolbar: true,
      useSplitMode: false,
      colors: {
        greyscale: [
          "#000000",
          "#434343",
          "#666666",
          "#999999",
          "#B7B7B7",
          "#CCCCCC",
          "#D9D9D9",
          "#EFEFEF",
          "#F3F3F3",
          "#FFFFFF",
        ],
        palette: [
          "#980000",
          "#FF0000",
          "#FF9900",
          "#FFFF00",
          "#00F0F0",
          "#00FFFF",
          "#4A86E8",
          "#0000FF",
          "#9900FF",
          "#FF00FF",
        ],
        full: [
          "#E6B8AF",
          "#F4CCCC",
          "#FCE5CD",
          "#FFF2CC",
          "#D9EAD3",
          "#D0E0E3",
          "#C9DAF8",
          "#CFE2F3",
          "#D9D2E9",
          "#EAD1DC",
          "#DD7E6B",
          "#EA9999",
          "#F9CB9C",
          "#FFE599",
          "#B6D7A8",
          "#A2C4C9",
          "#A4C2F4",
          "#9FC5E8",
          "#B4A7D6",
          "#D5A6BD",
          "#CC4125",
          "#E06666",
          "#F6B26B",
          "#FFD966",
          "#93C47D",
          "#76A5AF",
          "#6D9EEB",
          "#6FA8DC",
          "#8E7CC3",
          "#C27BA0",
          "#A61C00",
          "#CC0000",
          "#E69138",
          "#F1C232",
          "#6AA84F",
          "#45818E",
          "#3C78D8",
          "#3D85C6",
          "#674EA7",
          "#A64D79",
          "#85200C",
          "#990000",
          "#B45F06",
          "#BF9000",
          "#38761D",
          "#134F5C",
          "#1155CC",
          "#0B5394",
          "#351C75",
          "#733554",
          "#5B0F00",
          "#660000",
          "#783F04",
          "#7F6000",
          "#274E13",
          "#0C343D",
          "#1C4587",
          "#073763",
          "#20124D",
          "#4C1130",
        ],
      },

      buttons: [
        "bold",
        "strikethrough",
        "underline",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
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
        "|",
        "fullsize",
      ],
    }),
    []
  );

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => setValue(newContent)}
        onChange={(newContent) => setValue(newContent)}
        // onBlur={(newContent) => {
        //   const plainText = getPlainText(newContent);
        //   setPlainText(plainText); // Do something with the plain text
        //   setValue(newContent);
        // }}
        // onChange={(newContent) => {
        //   const plainText = getPlainText(newContent);
        //   setPlainText(plainText);
        //   setValue(newContent);
        // }}
      />
    </div>
  );
};

export default TextEditor;
