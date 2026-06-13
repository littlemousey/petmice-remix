import { useEffect, useRef, useState } from "react";
import type { ViewType } from "../types/reddit";
import { getRedditImportUrl } from "../utils/getRedditImportUrl";

interface ImportDataDialogProps {
  onImport: (rawJson: string) => void;
  view: ViewType;
}

const buttonStyling = {
  background: "black",
  fontSize: "16px",
  fontWeight: "600",
  border: "1px solid black",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
  textDecoration: "none",
  padding: "7px",
};

export default function ImportDataDialog({ onImport, view }: ImportDataDialogProps) {
  const { url, label } = getRedditImportUrl(view);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const close = () => {
    setOpen(false);
    setError(null);
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setText(await file.text());
    setError(null);
  };

  const handleImport = () => {
    try {
      onImport(text);
      setText("");
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import data");
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} style={buttonStyling}>
        📥 Import Data
      </button>

      <dialog
        ref={dialogRef}
        onCancel={close}
        style={{
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "560px",
          width: "90vw",
          border: "none",
          color: "black",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Import Reddit data 🐁</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.5 }}>
          While logged in to Reddit, open{" "}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            {label}
          </a>
          , copy the JSON, and paste it below (or upload the saved file).
        </p>

        <input
          type="file"
          accept="application/json,.json"
          onChange={(e) => handleFile(e.target.files?.[0])}
          style={{ marginBottom: "12px" }}
        />

        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError(null);
          }}
          placeholder='{"kind": "Listing", "data": { "children": [ ... ] }}'
          style={{
            width: "100%",
            minHeight: "200px",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontFamily: "monospace",
            fontSize: "13px",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />

        {error && (
          <p style={{ color: "#c0392b", fontSize: "14px", margin: "8px 0 0" }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
          <button
            onClick={handleImport}
            disabled={text.trim() === ""}
            style={{
              padding: "8px 16px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: text.trim() === "" ? "not-allowed" : "pointer",
              opacity: text.trim() === "" ? 0.6 : 1,
            }}
          >
            Import
          </button>
          <button
            onClick={close}
            style={{
              padding: "8px 16px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
}
