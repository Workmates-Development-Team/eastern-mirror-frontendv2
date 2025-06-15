
import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  ListOrdered, 
  List, 
  TextQuote,
  Link,
  Image,
  Youtube,
  Code,
  Table as TableIcon,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Palette,
  ChevronDown,
  PaintBucket,
  TableCellsMerge,
  TableCellsSplit,
  TableRowsSplit,
  TableColumnsSplit,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { ImagePlaceholderToolbar } from './image-placeholder-toolbar';
import { EmbedPlaceholderToolbar } from './embed-placeholder-toolbar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface EditorMenuProps {
  editor: Editor | null;
  setIsFocusMode: any;
  isFocusMode: boolean
}

const fontFamilies = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
];

const fontSizes = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '20px', label: '20px' },
  { value: '24px', label: '24px' },
  { value: '32px', label: '32px' },
  { value: '48px', label: '48px' },
];

const colors = [
  { value: '#000000', label: 'Black' },
  { value: '#ffffff', label: 'White' },
  { value: '#ef4444', label: 'Red' },
  { value: '#f97316', label: 'Orange' },
  { value: '#eab308', label: 'Yellow' },
  { value: '#22c55e', label: 'Green' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#ec4899', label: 'Pink' },
];

const EditorMenu = ({ editor, isFocusMode, setIsFocusMode }: EditorMenuProps) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageWidth, setImageWidth] = useState<number[]>([100]);
  const [videoUrl, setVideoUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [showTableInput, setShowTableInput] = useState(false);
  
  if (!editor) {
    return null;
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const addImage = () => {
    if (imageUrl) {
      // const figureHtml = `
      //    <figure>
      //   <img src="${imageUrl}" alt="${imageAlt}" style="width: ${imageWidth[0]}%; display: block; margin: 0 auto;" />
      //   <figcaption style="font-style: italic; font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; text-align: center;">
      //     ${imageCaption}
      //   </figcaption>
      // </figure>
      // `;
      // editor.chain().focus().insertContent(figureHtml).run();
//       editor.commands.insertContent(`
//   <figure>
//     <img     contenteditable="false"
//     draggable="true"
//     class="rounded-md"
//  src="${imageUrl}" alt="${imageAlt}" style="width: ${imageWidth[0]}%; display: block; margin: 0 auto;" />
//     <figcaption style="font-style: italic; font-size: 0.875rem; color: #6b7280; text-align: center;"><center>Caption</center></figcaption>
//   </figure>
// `);

// editor.chain().focus().insertContent({
//       type: 'imageWithCaption',
//       attrs: {
//         src: imageUrl,
//         alt: imageAlt || '',
//         style: `width: ${imageWidth[0]}%; display: block; margin: 0 auto;`,
//       },
//       content: [
//         {
//           type: 'text',
//           text: imageCaption || 'Write caption here',
//         },
//       ],
//     }).run();

      
      setImageUrl('');
      setImageAlt('');
      setImageCaption('');
      setImageWidth([100]);
      setShowImageInput(false);
    }
  };
  
  const addYoutubeVideo = () => {
    if (videoUrl) {
      const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
      const match = videoUrl.match(youtubeRegex);
      const youtubeId = match ? match[1] : videoUrl;
      
      editor.chain().focus().setYoutubeVideo({
        src: youtubeId,
        width: 640,
        height: 480,
      }).run();
      
      setVideoUrl('');
      setShowVideoInput(false);
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({
      rows: tableRows,
      cols: tableCols,
      withHeaderRow: true
    }).run();
    setShowTableInput(false);
  };


  return (
    <div className="border rounded-t-md bg-white p-1 sticky top-0 z-10 flex flex-wrap gap-1 items-center overflow-x-auto">
      {/* Text Style Controls */}
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 flex gap-1 items-center">
              <Type className="h-4 w-4" />
              <span>Text</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
              className={cn(editor.isActive('heading', { level: 1 }) && "bg-accent")}>
              <Heading1 className="h-4 w-4 mr-2" /> Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={cn(editor.isActive('heading', { level: 2 }) && "bg-accent")}>
              <Heading2 className="h-4 w-4 mr-2" /> Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={cn(editor.isActive('heading', { level: 3 }) && "bg-accent")}>
              <Heading3 className="h-4 w-4 mr-2" /> Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}
              className={cn(editor.isActive('paragraph') && "bg-accent")}>
              <Type className="h-4 w-4 mr-2" /> Paragraph
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select 
          onValueChange={(value) => {
            editor.chain().focus().setFontFamily(value).run();
          }}
        >
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Font family" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            editor.chain().focus().setFontSize(value).run();
          }}
        >
          <SelectTrigger className="w-[80px] h-8">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      {/* Text Format Controls */}
      <div className="flex items-center">
        <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive('underline')}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Underline"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <Underline className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive('link')}
          onPressedChange={() => setShowLinkInput(!showLinkInput)}
          aria-label="Link"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <Link className="h-4 w-4" />
        </Toggle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Palette className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <div className="grid grid-cols-3 gap-1 p-2">
              {colors.map((color) => (
                <div
                  key={color.value}
                  className="w-6 h-6 rounded cursor-pointer border"
                  style={{ backgroundColor: color.value }}
                  onClick={() => editor.chain().focus().setColor(color.value).run()}
                  title={color.label}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <PaintBucket className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <div className="grid grid-cols-3 gap-1 p-2">
              {colors.map((color) => (
                <div
                  key={color.value}
                  className="w-6 h-6 rounded cursor-pointer border"
                  style={{ backgroundColor: color.value }}
                  onClick={() => editor.chain().focus().toggleHighlight({ color: color.value }).run()}
                  title={color.label}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator orientation="vertical" className="mx-1 h-6" />
      
      {/* Alignment Controls */}
      <div className="flex items-center">
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'left' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
          aria-label="Align Left"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'center' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
          aria-label="Align Center"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'right' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
          aria-label="Align Right"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'justify' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('justify').run()}
          aria-label="Justify"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <AlignJustify className="h-4 w-4" />
        </Toggle>
      </div>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      {/* Lists and Quote Controls */}
      <div className="flex items-center">
        <Toggle
          size="sm"
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet List"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <List className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered List"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive('blockquote')}
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Quote"
          className={cn("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground")}
        >
          <TextQuote className="h-4 w-4" />
        </Toggle>
      </div>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      {/* Advanced Controls */}
      <div className="flex items-center">
        {/* <Button 
          variant="ghost" 
          size="sm" 
          className="h-8"
          onClick={() => setShowImageInput(!showImageInput)}
        >
          <Image className="h-4 w-4" />
        </Button> */}
        
        <ImagePlaceholderToolbar editor={editor}  />
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8"
          onClick={() => setShowVideoInput(!showVideoInput)}
        >
          <Youtube className="h-4 w-4" />
        </Button>
        <EmbedPlaceholderToolbar editor={editor} />
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8"
          onClick={() => setShowTableInput(!showTableInput)}
        >
          <TableIcon className="h-4 w-4" />
        </Button>
        
     <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 p-0 sm:h-9 sm:w-9",
                editor?.isActive("embed-placeholder") && "bg-accent",
              )}
              onClick={() => {
                setIsFocusMode(!isFocusMode);
              }}
            >
              {
                isFocusMode? <Minimize2 className="h-4 w-4" />: <Maximize2 className="h-4 w-4" />
              }
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>{
              isFocusMode ? 'Normal': 'Focus'}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
        
        {/* <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(editor.isActive('codeBlock') && "bg-accent text-accent-foreground")}
        >
          <Code className="h-4 w-4" />
        </Button> */}
      </div>

      {/* Table controls - only show when a table is selected */}
      {editor.isActive('table') && (
        <>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              <TableColumnsSplit className="h-4 w-4 rotate-180" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              <TableColumnsSplit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              onClick={() => editor.chain().focus().deleteColumn().run()}
            >
              <TableColumnsSplit className="h-4 w-4 text-red-500" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              onClick={() => editor.chain().focus().addRowBefore().run()}
            >
              <TableRowsSplit className="h-4 w-4 rotate-180" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              <TableRowsSplit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              onClick={() => editor.chain().focus().deleteRow().run()}
            >
              <TableRowsSplit className="h-4 w-4 text-red-500" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              onClick={() => editor.chain().focus().mergeCells().run()}
            >
              <TableCellsMerge className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              onClick={() => editor.chain().focus().splitCell().run()}
            >
              <TableCellsSplit className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}

      {/* Link Input */}
      <Collapsible open={showLinkInput} className="w-full mt-1">
        <CollapsibleContent>
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
            <Input 
              type="url" 
              placeholder="Enter URL" 
              value={linkUrl} 
              onChange={(e) => setLinkUrl(e.target.value)} 
              className="h-8"
            />
            <Button size="sm" className="h-8" onClick={addLink}>Add Link</Button>
            <Button size="sm" variant="ghost" className="h-8" onClick={() => setShowLinkInput(false)}>Cancel</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Image Input */}
      <Collapsible open={showImageInput} className="w-full mt-1">
        <CollapsibleContent>
          <div className="flex flex-col gap-2 p-2 bg-muted/50 rounded-md">
            <Input 
              type="url" 
              placeholder="Image URL" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              className="h-8"
            />
            <Input 
              type="text" 
              placeholder="Alt Text (for accessibility)" 
              value={imageAlt} 
              onChange={(e) => setImageAlt(e.target.value)} 
              className="h-8"
            />
            <Input 
              type="text" 
              placeholder="Caption (will display below image)" 
              value={imageCaption} 
              onChange={(e) => setImageCaption(e.target.value)} 
              className="h-8"
            />
            <div className="flex flex-col space-y-1">
              <Label htmlFor="image-width" className="text-xs">Image Width: {imageWidth[0]}%</Label>
              <Slider
                id="image-width"
                min={10}
                max={100}
                step={5}
                value={imageWidth}
                onValueChange={setImageWidth}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="h-8" onClick={addImage}>Add Image</Button>
              <Button size="sm" variant="ghost" className="h-8" onClick={() => setShowImageInput(false)}>Cancel</Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Video Input */}
      <Collapsible open={showVideoInput} className="w-full mt-1">
        <CollapsibleContent>
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
            <Input 
              type="url" 
              placeholder="YouTube URL or ID" 
              value={videoUrl} 
              onChange={(e) => setVideoUrl(e.target.value)} 
              className="h-8"
            />
            <Button size="sm" className="h-8" onClick={addYoutubeVideo}>Add Video</Button>
            <Button size="sm" variant="ghost" className="h-8" onClick={() => setShowVideoInput(false)}>Cancel</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Table Input */}
      <Collapsible open={showTableInput} className="w-full mt-1">
        <CollapsibleContent>
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2">
              <Label htmlFor="table-rows" className="text-xs whitespace-nowrap">Rows:</Label>
              <Select
                value={tableRows.toString()}
                onValueChange={(value) => setTableRows(parseInt(value))}
              >
                <SelectTrigger className="w-16 h-8">
                  <SelectValue placeholder={tableRows.toString()} />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="table-cols" className="text-xs whitespace-nowrap">Columns:</Label>
              <Select
                value={tableCols.toString()}
                onValueChange={(value) => setTableCols(parseInt(value))}
              >
                <SelectTrigger className="w-16 h-8">
                  <SelectValue placeholder={tableCols.toString()} />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button size="sm" className="h-8" onClick={addTable}>Insert Table</Button>
            <Button size="sm" variant="ghost" className="h-8" onClick={() => setShowTableInput(false)}>Cancel</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EditorMenu;
