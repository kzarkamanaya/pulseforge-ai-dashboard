import type { TicketSeverity } from "@/lib/types";

const CONFIG: Record<
  TicketSeverity,
  { bg: string; text: string; border: string; dot: string; label: string }
> = {
  critical: {
    bg: "bg-red-500/15",
    text: "text-red-300",
    border: "border-red-500/50",
    dot: "bg-red-400",
    label: "Critical",
  },
  high: {
    bg: "bg-orange-500/15",
    text: "text-orange-300",
    border: "border-orange-500/50",
    dot: "bg-orange-400",
    label: "High",
  },
  medium: {
    bg: "bg-yellow-500/15",
    text: "text-yellow-300",
    border: "border-yellow-500/50",
    dot: "bg-yellow-400",
    label: "Medium",
  },
  low: {
    bg: "bg-green-500/15",
    text: "text-green-300",
    border: "border-green-500/50",
    dot: "bg-green-400",
    label: "Low",
  },
};

interface Props {
  severity: TicketSeverity;
  size?: "sm" | "md" | "lg";
}

export default function SeverityBadge({ severity, size = "sm" }: Props) {
  const c = CONFIG[severity];
  const textSize = size === "lg" ? "text-sm" : "text-xs";
  const padding =
    size === "lg" ? "px-3 py-1.5" : size === "md" ? "px-2.5 py-1" : "px-2.5 py-0.5";
  const dotSize = size === "lg" ? "w-2.5 h-2.5" : "w-2 h-2";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${textSize} ${padding} ${c.bg} ${c.text} ${c.border}`}
    >
      <span className={`rounded-full flex-shrink-0 ${dotSize} ${c.dot} animate-pulse`} />
      {c.label}
    </span>
  );
}
