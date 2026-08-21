import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"

interface RichTextEditorProps {
  onChange: (content: string) => void
  value?: string
}

const RichTextEditor = ({ onChange, value }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value ?? "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  useEffect(() => {
  if (editor && value && editor.getHTML() !== value) {
    editor.commands.setContent(value)
  }
}, [value, editor])

  return (
    <div className="border border-gray-800 rounded-md bg-bgsite text-gray-300 max-w-4xl">
      <div className="flex gap-2 p-2 border-b border-gray-800">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm font-bold ${editor?.isActive("bold") ? "bg-cyan-950 text-white" : "text-gray-400 hover:text-white"}`}
        >
          N
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm italic ${editor?.isActive("italic") ? "bg-cyan-950 text-white" : "text-gray-400 hover:text-white"}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor?.isActive("heading") ? "bg-cyan-950 text-white" : "text-gray-400 hover:text-white"}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${editor?.isActive("bulletList") ? "bg-cyan-950 text-white" : "text-gray-400 hover:text-white"}`}
        >
          • Lista
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="p-3 min-h-40 focus:outline-none prose prose-invert max-w-none"
      />
    </div>
  )
}

export default RichTextEditor