"use client";

import { useState } from "react";

export default function UploadPage() {

  const [file, setFile] = useState<File | null>(null);

  async function upload() {

    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    await fetch("/api/upload-doc", {
      method: "POST",
      body: form,
    });

    alert("Document uploaded successfully");
  }

  return (
    <div className="min-h-screen p-10">

      <h1 className="text-2xl font-bold">
        Upload Knowledge Documents
      </h1>

      <input
        type="file"
        className="mt-6"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button
        onClick={upload}
        className="block mt-4 bg-purple-600 text-white px-6 py-3 rounded"
      >
        Upload
      </button>

    </div>
  );
}