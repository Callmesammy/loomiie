"use client";

import React from "react";
import { Preloader } from "@/components/Preloader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] text-white flex items-center justify-center">
      <Preloader variant="brief" pageTitle="LOOMIE" />
    </div>
  );
}
