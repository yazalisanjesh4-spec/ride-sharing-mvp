"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";

export function useFirebaseTest() {
  useEffect(() => {
    // This confirms Firebase initialized correctly
    console.log("✅ Firebase initialized");
    console.log("Auth app name:", auth.app.name);
  }, []);
}