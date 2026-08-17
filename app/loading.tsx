"use client";

import React from "react";
import { Preloader } from "@/components/Preloader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#F5F3EF] flex items-center justify-center">
      <Preloader variant="brief" pageTitle="LOOMIE KINETIC STUDIO" />
    </div>
  );
}
