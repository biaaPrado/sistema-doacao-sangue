import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    duration?: number;
  } | null>(null);

  function showToast(
    message: string,
    type: "success" | "error" = "success",
    duration = 5000
  ) {
    setToast({ message, type, duration });

    setTimeout(() => {
      setToast(null);
    }, duration);
  }

  return { toast, showToast };
}