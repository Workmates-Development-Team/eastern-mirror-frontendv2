"use client"
/* eslint-disable */
// @ts-nocheck
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NODE_HANDLES_SELECTED_STYLE_CLASSNAME, isValidUrl } from "@/lib/tiptap-utils"
import {
  type CommandProps,
  Node,
  type NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  mergeAttributes,
} from "@tiptap/react"
import { Code, X, Youtube, Twitter } from "lucide-react"
import { type FormEvent, useState } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

export interface EmbedPlaceholderOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    embedPlaceholder: {
      /**
       * Inserts an embed placeholder
       */
      insertEmbedPlaceholder: () => ReturnType
    }
  }
}

export const EmbedPlaceholder = Node.create<EmbedPlaceholderOptions>({
  name: "embed-placeholder",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: "block",

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedPlaceholderComponent, {
      className: NODE_HANDLES_SELECTED_STYLE_CLASSNAME,
    })
  },

  addCommands() {
    return {
      insertEmbedPlaceholder: () => (props: CommandProps) => {
        return props.commands.insertContent({
          type: "embed-placeholder",
        })
      },
    }
  },
})

function EmbedPlaceholderComponent(props: NodeViewProps) {
  const { editor, extension, selected } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<"youtube" | "twitter" | "custom">("youtube")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [twitterUrl, setTwitterUrl] = useState("")
  const [customHtml, setCustomHtml] = useState("")
  const [urlError, setUrlError] = useState(false)

  const handleInsertYouTube = (e: FormEvent) => {
    e.preventDefault()
    const valid = isValidUrl(youtubeUrl)
    if (!valid) {
      setUrlError(true)
      return
    }

    // Extract video ID from YouTube URL
    const videoId = extractYouTubeVideoId(youtubeUrl)
    if (!videoId) {
      setUrlError(true)
      return
    }

    const embedHtml = `<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

    editor.chain().focus().setEmbed({ html: embedHtml, type: 'youtube'}).run()
    setIsExpanded(false)
    setYoutubeUrl("")
  }

  const handleInsertTwitter = (e: FormEvent) => {
    e.preventDefault()
    const valid = isValidUrl(twitterUrl)
    if (!valid) {
      setUrlError(true)
      return
    }

    // For Twitter, we'll just use the blockquote as is
    // In a real implementation, you'd want to fetch the oEmbed data
    const tweetId = extractTwitterTweetId(twitterUrl)
    if (!tweetId) {
      setUrlError(true)
      return
    }

    const embedHtml = `<blockquote class="twitter-tweet"><a href="${twitterUrl}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`

    editor.chain().focus().setEmbed({ html: embedHtml, type: "twitter" }).run()
    setIsExpanded(false)
    setTwitterUrl("")
  }

  const handleInsertCustom = (e: FormEvent) => {
    e.preventDefault()
    if (!customHtml.trim()) {
      return
    }

    editor.chain().focus().setEmbed({ html: customHtml, type: "custom" }).run()
    setIsExpanded(false)
    setCustomHtml("")
  }

  // Helper function to extract YouTube video ID
  const extractYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Helper function to extract Twitter tweet ID
  const extractTwitterTweetId = (url: string) => {
    const regExp = /twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/
    const match = url.match(regExp)
    return match ? match[2] : null
  }

  return (
    <NodeViewWrapper className="w-full">
      <div className="relative">
        {!isExpanded ? (
          <div
            onClick={() => setIsExpanded(true)}
            className={cn(
              "group relative flex cursor-pointer flex-col items-center gap-4 rounded-lg border-2 border-dashed p-8 transition-all hover:bg-accent",
              selected && "border-primary bg-primary/5",
              urlError && "border-destructive bg-destructive/5",
            )}
          >
            <div className="rounded-full bg-background p-4 shadow-sm transition-colors group-hover:bg-accent">
              <Code className="h-6 w-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Click to add an embed</p>
              <p className="text-xs text-muted-foreground">YouTube, Twitter, or custom HTML</p>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add Embed</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="youtube">
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube
                </TabsTrigger>
                <TabsTrigger value="twitter">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </TabsTrigger>
                <TabsTrigger value="custom">
                  <Code className="mr-2 h-4 w-4" />
                  Custom
                </TabsTrigger>
              </TabsList>

              <TabsContent value="youtube">
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Input
                      value={youtubeUrl}
                      onChange={(e) => {
                        setYoutubeUrl(e.target.value)
                        if (urlError) setUrlError(false)
                      }}
                      placeholder="Enter YouTube URL..."
                    />
                    {urlError && <p className="text-xs text-destructive">Please enter a valid YouTube URL</p>}
                  </div>
                  <Button onClick={handleInsertYouTube} className="w-full" disabled={!youtubeUrl}>
                    Add YouTube Video
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="twitter">
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Input
                      value={twitterUrl}
                      onChange={(e) => {
                        setTwitterUrl(e.target.value)
                        if (urlError) setUrlError(false)
                      }}
                      placeholder="Enter Twitter post URL..."
                    />
                    {urlError && <p className="text-xs text-destructive">Please enter a valid Twitter URL</p>}
                  </div>
                  <Button onClick={handleInsertTwitter} className="w-full" disabled={!twitterUrl}>
                    Add Twitter Post
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="custom">
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Textarea
                      value={customHtml}
                      onChange={(e) => setCustomHtml(e.target.value)}
                      placeholder="Paste HTML embed code..."
                      className="min-h-[150px] font-mono text-sm"
                    />
                  </div>
                  <Button onClick={handleInsertCustom} className="w-full" disabled={!customHtml}>
                    Add Custom Embed
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}
