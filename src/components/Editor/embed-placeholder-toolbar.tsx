"use client"

import { Code } from "lucide-react"
import * as React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Editor } from '@tiptap/react';
import { TooltipProvider } from "@/components/ui/tooltip"
interface EditorMenuProps {
  editor: Editor | null;
}


const EmbedPlaceholderToolbar = React.forwardRef<HTMLButtonElement, ButtonProps & EditorMenuProps>(
  ({ className, onClick, editor, children, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 p-0 sm:h-9 sm:w-9",
                editor?.isActive("embed-placeholder") && "bg-accent",
                className,
              )}
              onClick={(e) => {
                editor?.chain().focus().insertEmbedPlaceholder().run()
                onClick?.(e)
              }}
              ref={ref}
              {...props}
            >
              {children ?? <Code className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Embed</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

EmbedPlaceholderToolbar.displayName = "EmbedPlaceholderToolbar"

export { EmbedPlaceholderToolbar }
