import { Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Zap className="h-8 w-8 text-indigo-400 animate-pulse" />
          Predator Grid
        </div>
        <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
