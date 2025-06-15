import '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customEmbed: {
      setEmbed: (options: { html: string; type: string }) => ReturnType;
    };
  }
}