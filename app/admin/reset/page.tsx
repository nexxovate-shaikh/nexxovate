"use client";

import { Suspense } from "react";
import ResetContent from "./ResetContent";

export default function ResetPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ResetContent />
    </Suspense>
  );
}