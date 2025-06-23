import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Youtube from "@tiptap/extension-youtube";
import EditorMenu from "./EditorMenu";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
// import { ImageWithCaption } from "@/extensions/Image";
import { Caption } from "@/extensions/Caption";
import { ImageExtension } from "@/extensions/Image";
import { ImagePlaceholder } from "@/extensions/image-placeholder";
import { EmbedExtension } from "@/extensions/embed";
import { EmbedPlaceholder } from "@/extensions/embed-placeholder";
import he from "he";

const TipTapEditor = ({
  content,
  setContent,
}: {
  content: any;
  setContent: any;
}) => {
  // const [content, setContent] = useLocalStorage(
  //   "editor-content",
  //   "<h1>Welcome to the Rich Text Editor!</h1><p>This is a <strong>powerful</strong> editor that allows you to format text with various styling options.</p><p>Try it out:</p><ul><li>Format text with <strong>bold</strong>, <em>italic</em>, or <u>underline</u></li><li>Create headings</li><li>Make lists (ordered and unordered)</li><li>Add blockquotes</li><li>Align text in different ways</li><li>Add images, videos, tables, and more</li><li>Choose font family and size</li><li>Change text and background colors</li></ul><blockquote>Your content is automatically saved to your browser's local storage!</blockquote>"
  // );
  // const [content, setContent] = useState('')

  const [isFocusMode, setIsFocusMode] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "mx-auto rounded-md",
        },
      }),

      // Caption,
      ImageExtension,
      ImagePlaceholder,
      TextStyle,
      FontFamily,
      FontSize,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full border border-slate-300",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border border-slate-300",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-slate-300 bg-slate-100 font-bold p-2",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-slate-300 p-2",
        },
      }),

      EmbedExtension,
      EmbedPlaceholder,
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: "mx-auto my-4",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none",
      },
    },
  });

  // If the stored content changes (e.g. from another tab), update the editor
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  console.log(content)

  const decodeEmbeddedHtml = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    tempDiv.querySelectorAll("div[html]").forEach((div) => {
      const raw = div.getAttribute("html");
      if (raw) {
        const decoded = he.decode(raw); // decode &lt; &gt; etc.
        div.innerHTML = decoded;
        div.removeAttribute("html");
      }
    });

    return tempDiv.innerHTML;
  };


  if (isFocusMode) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <Card className="border-0 shadow-none overflow-hidden flex-1 flex flex-col">
            <EditorMenu editor={editor} isFocusMode={isFocusMode} setIsFocusMode={setIsFocusMode} />
 
          <EditorContent 
            editor={editor} 
            className="prose max-w-none p-8 flex-1 overflow-auto focus:outline-none" 
          />

        </Card>
      </div>
    );
  }

  return (
    <Card className="border shadow-sm overflow-hidden">
      <EditorMenu editor={editor} isFocusMode={isFocusMode} setIsFocusMode={setIsFocusMode}/>
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[400px] focus:outline-none  lora-regular"
      />
    
    </Card>
  );
};

export default TipTapEditor;
