"use client";

import { useState } from "react";
import type { AnalyzedTicket, TicketCategory } from "@/lib/types";
import SeverityBadge from "@/components/SeverityBadge";
import { TICKET_CATEGORY_LABELS } from "@/lib/policies";

const CATEGORY_STYLE: Record<TicketCategory, string> = {
  hardware_defect:    "text-red-300    bg-red-500/15    border-red-500/40",
  firmware_software:  "text-blue-300   bg-blue-500/15   border-blue-500/40",
  shipping_logistics: "text-amber-300  bg-amber-500/15  border-amber-500/40",
  refund_return:      "text-purple-300 bg-purple-500/15 border-purple-500/40",
  warranty_claim:     "text-yellow-300 bg-yellow-500/15 border-yellow-500/40",
  general_inquiry:    "text-cyan-300   bg-cyan-500/15   border-cyan-500/40",
};

const CATEGORY_ICON: Record<TicketCategory, string> = {
  hardware_defect:    "⚙️",
  firmware_software:  "⚡",
  shipping_logistics: "📦",
  refund_return:      "↩️",
  warranty_claim:     "🛡️",
  general_inquiry:    "💬",
};

interface Props {
  analysis: AnalyzedTicket | null;
  isAnalyzing: boolean;
}

export default function AnalysisPanel({ analysis, isAnalyzing }: Props) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis.draftResponse).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  /* ── Loading state ── */
  if (isAnalyzing) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 min-h-[360px] flex flex-col items-center justify-center gap-6 p-8">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping"
            style={{ animationDuration: "1.2s" }}
          />
          <div
            className="absolute inset-3 rounded-full border-2 border-blue-400/20 animate-ping"
            style={{ animationDuration: "1.2s", animationDelay: "0.2s" }}
          />
          <span className="text-3xl z-10">⚡</span>
        </div>
        <div className="text-center">
          <p className="text-slate-200 font-semibold text-base mb-1">
            Analyzing ticket…
          </p>
          <p className="text-slate-400 text-sm">Applying PulseForge policies</p>
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ── Empty state ── */
  if (!analysis) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 min-h-[400px] flex flex-col items-center justify-center gap-5 p-8 text-center">
        <div className="w-20 h-20 rounded-2xl bg-slate-700 border border-slate-600 flex items-center justify-center text-4xl">
          🤖
        </div>
        <div>
          <p className="text-slate-200 font-semibold text-lg mb-2">
            AI Analysis Panel
          </p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[230px]">
            Select a ticket and click{" "}
            <span className="text-blue-400 font-semibold">Analyze Ticket</span>{" "}
            to generate severity, routing, and a draft response.
          </p>
        </div>
        <ul className="flex flex-col gap-2 text-left">
          {[
            "Category & severity level",
            "Department routing",
            "Issue summary",
            "Draft customer response",
            "Policy rule applied",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-slate-500"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* ── Results ── */
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
      {/* Panel header */}
      <div className="px-5 py-3.5 border-b border-slate-700 flex items-center justify-between bg-blue-600/10">
        <span className="text-sm font-semibold text-slate-200">
          AI Analysis
        </span>
        <span className="text-xs text-slate-500 font-mono">
          {new Date(analysis.analyzedAt).toLocaleTimeString()}
        </span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">
        {/* Category */}
        <Field label="Category">
          <span
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${CATEGORY_STYLE[analysis.category]}`}
          >
            <span>{CATEGORY_ICON[analysis.category]}</span>
            {TICKET_CATEGORY_LABELS[analysis.category]}
          </span>
        </Field>

        {/* Severity */}
        <Field label="Severity Level">
          <SeverityBadge severity={analysis.severity} size="lg" />
        </Field>

        {/* Routing */}
        <Field label="Routed To">
          <div className="bg-slate-700/60 border border-slate-600 rounded-lg p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/25 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-lg">
              →
            </div>
            <div>
              <div className="text-slate-100 font-semibold text-sm leading-tight">
                {analysis.department}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{analysis.tier}</div>
            </div>
          </div>
        </Field>

        {/* Summary */}
        <Field label="Summary">
          <p className="text-slate-300 text-sm leading-relaxed bg-slate-700/40 border border-slate-600 rounded-lg p-4">
            {analysis.summary}
          </p>
        </Field>

        {/* Draft response */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <FieldLabel>Draft Response</FieldLabel>
            <button
              type="button"
              onClick={handleCopy}
              className={`text-xs font-semibold rounded-lg px-3 py-1.5 transition-all ${
                copied
                  ? "bg-green-500/20 text-green-300 border border-green-500/40"
                  : "bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600 hover:text-slate-100"
              }`}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={analysis.draftResponse}
            rows={9}
            className="w-full resize-none bg-slate-700/40 border border-slate-600 rounded-lg text-slate-300 text-sm leading-relaxed p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        {/* Policy applied */}
        <div className="rounded-lg border border-blue-500/30 bg-blue-600/10 p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-blue-400 mb-2">
            Policy Applied
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {analysis.policyApplied}
          </p>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}
