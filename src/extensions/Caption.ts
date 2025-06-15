import { Node } from '@tiptap/core'

export const Caption = Node.create({
  name: 'caption',
  group: 'inline',
  inline: true,
  content: 'text*',

  parseHTML() {
    return [{ tag: 'figcaption' }]
  },

  renderHTML() {
    return ['figcaption', 0]
  },
})
