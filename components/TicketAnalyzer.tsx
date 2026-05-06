"use client";

import { useState, useEffect } from "react";
import type { RawTicket } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

interface Props {
  ticket: RawTicket | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

export default function TicketAnalyzer({
  ticket,
  isAnalyzing,
  onAnalyze,
}: Props) {
  const [body, setBody] = useState("");

  useEffect(() => {
    setBody(ticket?.body ?? "");
  }, [ticket]);

  /* ── Empty state ── */
  if (!ticket) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 min-h-[400px] flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-700 border border-slate-600 flex items-center justify-center text-3xl">
          📋
        </div>
        <div>
          <p className="text-slate-200 font-semibold text-lg mb-1">
            No ticket selected
          </p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Click any ticket in the queue on the left to load it here for
            review and analysis.
          </p>
        </div>
      </div>
    );
  }

  /* ── Ticket loaded ── */
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
      {/* Ticket meta header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/80">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-mono text-sm font-bold text-blue-400">
            {ticket.id}
          </span>
          <span className="text-slate-100 font-bold text-lg">
            {ticket.customerName}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2 flex-wrap">
          <span>{ticket.customerEmail}</span>
          <span className="text-slate-600">·</span>
          <span>{formatDateTime(ticket.submittedAt)}</span>
        </div>
        <p className="text-sm font-medium text-slate-300">{ticket.subject}</p>
      </div>

      {/* Body + button */}
      <div className="px-6 py-5 flex flex-col gap-4">
        <div>
          <label
            htmlFor="ticket-body"
            className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2"
          >
            Ticket Content
          </label>
          <textarea
            id="ticket-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={9}
            className="w-full resize-none bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 text-sm leading-relaxed p-4 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 transition-colors"
            placeholder="Ticket content will appear here…"
          />
        </div>

        {/* Analyze button */}
        <button
          type="button"
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 ${
            isAnalyzing
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 hover:-translate-y-0.5 active:translate-y-0"
          }`}
        >
          {isAnalyzing ? (
            <>
              <Spinner />
              <span>Analyzing with AI…</span>
            </>
          ) : (
            <>
              <span className="text-xl">⚡</span>
              <span>Analyze Ticket</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span className="inline-block w-5 h-5 border-2 border-slate-500 border-t-blue-300 rounded-full animate-spin" />
  );
}
