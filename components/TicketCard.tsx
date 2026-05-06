import type { RawTicket, TicketSeverity } from "@/lib/types";
import SeverityBadge from "@/components/SeverityBadge";
import { formatRelativeTime } from "@/lib/utils";

const LEFT_BORDER: Record<TicketSeverity, string> = {
  critical: "border-l-red-500",
  high:     "border-l-orange-500",
  medium:   "border-l-yellow-400",
  low:      "border-l-green-500",
};

interface Props {
  ticket: RawTicket;
  severity: TicketSeverity;
  isSelected: boolean;
  onSelect: (ticket: RawTicket) => void;
}

export default function TicketCard({
  ticket,
  severity,
  isSelected,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(ticket)}
      className={`
        w-full text-left px-4 py-4 border-l-4 transition-colors duration-150 cursor-pointer
        ${LEFT_BORDER[severity]}
        ${isSelected
          ? "bg-blue-600/15 border-r border-t border-b border-r-slate-700 border-t-slate-700/50 border-b-slate-700/50"
          : "hover:bg-slate-700/50 border-r border-t border-b border-transparent"
        }
      `}
    >
      {/* Row 1: ID + name + time */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`font-mono text-xs font-bold flex-shrink-0 ${
              isSelected ? "text-blue-400" : "text-slate-500"
            }`}
          >
            {ticket.id}
          </span>
          <span
            className={`font-semibold text-base truncate ${
              isSelected ? "text-blue-100" : "text-slate-100"
            }`}
          >
            {ticket.customerName}
          </span>
        </div>
        <span className="text-xs text-slate-500 flex-shrink-0">
          {formatRelativeTime(ticket.submittedAt)}
        </span>
      </div>

      {/* Row 2: subject */}
      <p
        className={`text-sm leading-snug line-clamp-2 mb-3 ${
          isSelected ? "text-slate-300" : "text-slate-400"
        }`}
      >
        {ticket.subject}
      </p>

      {/* Row 3: badge */}
      <SeverityBadge severity={severity} size="sm" />
    </button>
  );
}
