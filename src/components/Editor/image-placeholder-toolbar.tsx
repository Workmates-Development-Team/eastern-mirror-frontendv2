"use client"

import { Image } from "lucide-react"
import React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Editor } from '@tiptap/react';
// import { useToolbar } from "./toolbar-provider"
interface EditorMenuProps {
  editor: Editor | null;
}

const ImagePlaceholderToolbar = React.forwardRef<HTMLButtonElement, ButtonProps & EditorMenuProps>(
  ({ className, onClick, editor, children, ...props }, ref) => {
    // const { editor } = useToolbar()
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8 p-0 sm:h-9 sm:w-9", editor?.isActive("image-placeholder") && "bg-accent", className)}
            onClick={(e) => {
              editor?.chain().focus().insertImagePlaceholder().run()
              onClick?.(e)
            }}
            ref={ref}
            {...props}
          >
            {children ?? <Image className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Image</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

ImagePlaceholderToolbar.displayName = "ImagePlaceholderToolbar"

export { ImagePlaceholderToolbar }
