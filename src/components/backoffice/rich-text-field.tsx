"use client";

import {
  EditorContent,
  EditorProvider,
} from "@/components/ui/editor";
import { EditorEssentialExtension } from "@/components/ui/editor-essential";
import { Label } from "@/components/ui/label";

export function RichTextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="min-h-48 overflow-hidden rounded-md border bg-background">
        <EditorProvider
          content={value}
          extensions={[EditorEssentialExtension]}
          onUpdate={({ editor }) => onChange(editor.getHTML())}
          editorProps={{
            attributes: {
              class:
                "min-h-48 px-4 py-3 text-sm leading-relaxed outline-none",
            },
          }}
        >
          <EditorContent />
        </EditorProvider>
      </div>
      <p className="text-xs text-muted-foreground">
        Editor rico baseado no componente Tiptap do shadcn.
      </p>
    </div>
  );
}
