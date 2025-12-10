"use client";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((m) => m.Editor),
  { ssr: false } // ⬅️ QUAN TRỌNG
);

export default function TINYEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_KEY}
        value={value}
        onEditorChange={(content) => onChange(content)}
        init={{
          height: 600,
          plugins: [
            "a11ychecker",
            "accordion",
            "advlist",
            "anchor",
            "autolink",
            "autosave",
            "charmap",
            "code",
            "codesample",
            "directionality",
            "emoticons",
            "exportpdf",
            "exportword",
            "fullscreen",
            "help",
            "image",
            "importcss",
            "importword",
            "insertdatetime",
            "link",
            "lists",
            "markdown",
            "math",
            "media",
            "nonbreaking",
            "pagebreak",
            "preview",
            "quickbars",
            "save",
            "searchreplace",
            "table",
            "visualblocks",
            "visualchars",
            "wordcount",
          ],
          toolbar:
            "undo redo | accordion accordionremove | blockquote | " +
            "importword exportword exportpdf | math | " +
            "blocks fontfamily fontsize | bold italic underline strikethrough | " +
            "align numlist bullist | link image | table media | " +
            "lineheight outdent indent | forecolor backcolor removeformat | " +
            "charmap emoticons | code fullscreen preview | save print | " +
            "pagebreak anchor codesample | ltr rtl",
          menubar: "file edit view insert format tools table help",
        }}
      />
    </>
  );
}
