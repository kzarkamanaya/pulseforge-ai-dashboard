import type { AnalyzedTicket, TicketSeverity } from "@/lib/types";

interface Props {
  analyses: AnalyzedTicket[];
}

function countBySeverity(
  analyses: AnalyzedTicket[],
  severity: TicketSeverity
): number {
  return analyses.filter((a) => a.severity === severity).length;
}

export default function StatsBar({ analyses }: Props) {
  const total = analyses.length;
  const critical = countBySeverity(analyses, "critical");
  const high = countBySeverity(analyses, "high");
  const medium = countBySeverity(analyses, "medium");
  const low = countBySeverity(analyses, "low");

  const deptMap = analyses.reduce<Record<string, number>>((acc, a) => {
    acc[a.department] = (acc[a.department] ?? 0) + 1;
    return acc;
  }, {});
  const topDepts = Object.entries(deptMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="bg-slate-800/60 border-b border-slate-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 flex-wrap">
        <Stat label="Total" value={total} textColor="text-slate-200" bg="bg-slate-700/70" />
        <Sep />
        <Stat label="Critical" value={critical} textColor="text-red-400"    bg="bg-red-500/15"    dot="bg-red-400" />
        <Stat label="High"     value={high}     textColor="text-orange-400" bg="bg-orange-500/15" dot="bg-orange-400" />
        <Stat label="Medium"   value={medium}   textColor="text-yellow-400" bg="bg-yellow-500/15" dot="bg-yellow-400" />
        <Stat label="Low"      value={low}      textColor="text-green-400"  bg="bg-green-500/15"  dot="bg-green-400" />
        <Sep />
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 font-medium">Top Routes:</span>
          {topDepts.map(([dept, cnt]) => (
            <span
              key={dept}
              className="text-xs text-slate-300 bg-slate-700 border border-slate-600 rounded-md px-2.5 py-1 font-medium"
            >
              {dept}{" "}
              <span className="text-slate-500">({cnt})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sep() {
  return <div className="w-px h-7 bg-slate-700" />;
}

interface StatProps {
  label: string;
  value: number;
  textColor: string;
  bg: string;
  dot?: string;
}

function Stat({ label, value, textColor, bg, dot }: StatProps) {
  return (
    <div className={`flex items-center gap-2 rounded-lg ${bg} px-3 py-1.5 border border-white/5`}>
      {dot && <span className={`w-2 h-2 rounded-full ${dot} flex-shrink-0`} />}
      <span className={`text-xl font-bold leading-none ${textColor}`}>{value}</span>
      <span className="text-slate-400 text-xs font-medium">{label}</span>
    </div>
  );
}
