"use client";
// @ts-nocheck
import type React from "react";

/* eslint-disable */
import { Node, mergeAttributes } from "@tiptap/core";
import {
  type NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import {
  Trash,
  Edit,
  MoreVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const EmbedExtension = Node.create({
  name: "embed",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      html: {
        default: "",
      },
      type: {
        default: "custom",
      },
      align: {
        default: "center",
      },
     width: {
        default: "100%",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="embed"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "embed" })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TiptapEmbed);
  },

  addCommands() {
    return {
      setEmbed:
        (options: any) =>
        ({ commands }: { commands: any }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    } as Partial<import("@tiptap/core").RawCommands>;
  },
});

function TiptapEmbed(props: NodeViewProps) {
  const { node, editor, selected, deleteNode, updateAttributes } = props;
  const embedRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [openedMore, setOpenedMore] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [resizingPosition, setResizingPosition] = useState<"left" | "right">(
    "left"
  );
  const [resizeInitialWidth, setResizeInitialWidth] = useState(0);
  const [resizeInitialMouseX, setResizeInitialMouseX] = useState(0);

  function handleResizingPosition({
    e,
    position,
  }: {
    e: React.MouseEvent<HTMLDivElement, MouseEvent>;
    position: "left" | "right";
  }) {
    startResize(e);
    setResizingPosition(position);
  }

  function startResize(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setResizing(true);
    setResizeInitialMouseX(event.clientX);
    if (embedRef.current) {
      setResizeInitialWidth(embedRef.current.offsetWidth);
    }
  }

  function resize(event: MouseEvent) {
    if (!resizing) return;

    let dx = event.clientX - resizeInitialMouseX;
    if (resizingPosition === "left") {
      dx = resizeInitialMouseX - event.clientX;
    }

    const newWidth = Math.max(resizeInitialWidth + dx, 150);
    const parentWidth = nodeRef.current?.parentElement?.offsetWidth ?? 0;

    if (newWidth < parentWidth) {
      updateAttributes({
        width: newWidth,
      });
    }
  }

  function endResize() {
    setResizing(false);
    setResizeInitialMouseX(0);
    setResizeInitialWidth(0);
  }

  function handleTouchStart(
    event: React.TouchEvent,
    position: "left" | "right"
  ) {
    event.preventDefault();
    setResizing(true);
    setResizingPosition(position);
    setResizeInitialMouseX(event.touches[0]?.clientX ?? 0);
    if (embedRef.current) {
      setResizeInitialWidth(embedRef.current.offsetWidth);
    }
  }

  function handleTouchMove(event: TouchEvent) {
    if (!resizing) return;

    let dx =
      (event.touches[0]?.clientX ?? resizeInitialMouseX) - resizeInitialMouseX;
    if (resizingPosition === "left") {
      dx =
        resizeInitialMouseX -
        (event.touches[0]?.clientX ?? resizeInitialMouseX);
    }

    const newWidth = Math.max(resizeInitialWidth + dx, 150);
    const parentWidth = nodeRef.current?.parentElement?.offsetWidth ?? 0;

    if (newWidth < parentWidth) {
      updateAttributes({
        width: newWidth,
      });
    }
  }

  function handleTouchEnd() {
    setResizing(false);
    setResizeInitialMouseX(0);
    setResizeInitialWidth(0);
  }

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", endResize);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", endResize);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [resizing, resizeInitialMouseX, resizeInitialWidth]);

   useEffect(() => {
    // Load Twitter script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;

    // Append only if not already present
    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      document.body.appendChild(script);
    } else {
      // If already loaded, manually call twttr.widgets.load
      window?.twttr?.widgets?.load(embedRef.current);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Function to safely render HTML content
  const renderHTML = () => {
    return { __html: node.attrs.html };
  };

  return (
    <NodeViewWrapper
      ref={nodeRef}
      className={cn(
        "relative flex flex-col rounded-md border-2 border-transparent transition-all duration-200 my-4 max-w-[560px]",
        selected ? "border-blue-300" : "",
        node.attrs.align === "left" && "ml-0 mr-auto",
  node.attrs.align === "center" && "mx-auto",
  node.attrs.align === "right" && "ml-auto mr-0"
      )}
      style={{ width: node.attrs.width }}
    >
      <div className="group relative flex flex-col rounded-md">
        <div ref={embedRef} className="relative overflow-hidden rounded-lg">
          <div
            className="embed-container w-full"
            dangerouslySetInnerHTML={renderHTML()}
          />
        </div>

        {editor?.isEditable && (
          <>
            <div
              className="absolute inset-y-0 z-20 flex w-[25px] cursor-col-resize items-center justify-start p-2"
              style={{ left: 0 }}
              onMouseDown={(event) => {
                handleResizingPosition({ e: event, position: "left" });
              }}
              onTouchStart={(event) => handleTouchStart(event, "left")}
            >
              <div className="z-20 h-[70px] w-1 rounded-xl border bg-[rgba(0,0,0,0.65)] opacity-0 transition-all group-hover:opacity-100" />
            </div>
            <div
              className="absolute inset-y-0 z-20 flex w-[25px] cursor-col-resize items-center justify-end p-2"
              style={{ right: 0 }}
              onMouseDown={(event) => {
                handleResizingPosition({ e: event, position: "right" });
              }}
              onTouchStart={(event) => handleTouchStart(event, "right")}
            >
              <div className="z-20 h-[70px] w-1 rounded-xl border bg-[rgba(0,0,0,0.65)] opacity-0 transition-all group-hover:opacity-100" />
            </div>
          </>
        )}

        {editor?.isEditable && (
          <div
            className={cn(
              "absolute right-4 top-4 flex items-center gap-1 rounded-md border bg-background/80 p-1 opacity-0 backdrop-blur transition-opacity",
              "group-hover:opacity-100",
              openedMore && "opacity-100"
            )}
          >
            <Button
              size="icon"
              className={cn(
                "size-7",
                node.attrs.align === "left" && "bg-accent"
              )}
              variant="ghost"
              onClick={() => updateAttributes({ align: "left" })}
            >
              <AlignLeft className="size-4" />
            </Button>
            <Button
              size="icon"
              className={cn(
                "size-7",
                node.attrs.align === "center" && "bg-accent"
              )}
              variant="ghost"
              onClick={() => updateAttributes({ align: "center" })}
            >
              <AlignCenter className="size-4" />
            </Button>
            <Button
              size="icon"
              className={cn(
                "size-7",
                node.attrs.align === "right" && "bg-accent"
              )}
              variant="ghost"
              onClick={() => updateAttributes({ align: "right" })}
            >
              <AlignRight className="size-4" />
            </Button>
            <Separator orientation="vertical" className="h-[20px]" />
            <DropdownMenu open={openedMore} onOpenChange={setOpenedMore}>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="size-7" variant="ghost">
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                alignOffset={-90}
                className="mt-1 text-sm"
              >
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={deleteNode}
                >
                  <Trash className="mr-2 size-4" /> Delete Embed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}
