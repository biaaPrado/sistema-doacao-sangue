import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  duration?: number;
};

export function Toast({
  message,
  type = "success",
  duration = 5000,
}: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 30; // suavidade
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div
      className={`
        fixed top-5 right-5 z-50 w-80 text-white shadow-lg rounded-xl overflow-hidden
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      <div className="px-4 py-3">{message}</div>

      {/* PROGRESS BAR */}
      <div className="h-1 bg-black/20">
        <div
          className="h-full bg-white transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}