import type { RawTicket, TicketSeverity } from "@/lib/types";
import TicketCard from "@/components/TicketCard";

interface Props {
  tickets: RawTicket[];
  severityMap: Record<string, TicketSeverity>;
  selectedId: string | null;
  onSelect: (ticket: RawTicket) => void;
}

export default function TicketQueue({
  tickets,
  severityMap,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col">
      {/* Panel header */}
      <div className="px-4 py-3.5 border-b border-slate-700 flex items-center justify-between flex-shrink-0">
        <h2 className="text-sm font-semibold text-slate-200">Ticket Queue</h2>
        <span className="text-xs font-semibold text-slate-400 bg-slate-700 rounded-full px-2.5 py-0.5">
          {tickets.length}
        </span>
      </div>

      {/* Scrollable list — max-height keeps the page usable on desktop */}
      <div className="overflow-y-auto max-h-[72vh] divide-y divide-slate-700/60">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            severity={severityMap[ticket.id] ?? "low"}
            isSelected={selectedId === ticket.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
