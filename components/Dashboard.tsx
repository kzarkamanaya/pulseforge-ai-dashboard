"use client";

import { useState, useCallback } from "react";
import type { RawTicket, AnalyzedTicket, TicketSeverity } from "@/lib/types";
import { MOCK_TICKETS } from "@/lib/mock-tickets";
import { ALL_MOCK_ANALYSES, getMockAnalysis } from "@/lib/mock-analysis";
import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import TicketQueue from "@/components/TicketQueue";
import TicketAnalyzer from "@/components/TicketAnalyzer";
import AnalysisPanel from "@/components/AnalysisPanel";

const SEVERITY_MAP: Record<string, TicketSeverity> = Object.fromEntries(
  ALL_MOCK_ANALYSES.map((a) => [a.raw.id, a.severity])
);

export default function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState<RawTicket | null>(null);
  const [analysis, setAnalysis] = useState<AnalyzedTicket | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelectTicket = useCallback((ticket: RawTicket) => {
    setSelectedTicket(ticket);
    setAnalysis(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedTicket || isAnalyzing) return;
    setIsAnalyzing(true);
    await new Promise<void>((r) => setTimeout(r, 1800));
    setAnalysis(getMockAnalysis(selectedTicket));
    setIsAnalyzing(false);
  }, [selectedTicket, isAnalyzing]);

  return (
    <div className="min-h-screen">
      <Header ticketCount={MOCK_TICKETS.length} />
      <StatsBar analyses={ALL_MOCK_ANALYSES} />

      {/* Three-column layout */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Left – Ticket Queue */}
          <div className="w-full lg:w-80 xl:w-[300px] flex-shrink-0">
            <TicketQueue
              tickets={MOCK_TICKETS}
              severityMap={SEVERITY_MAP}
              selectedId={selectedTicket?.id ?? null}
              onSelect={handleSelectTicket}
            />
          </div>

          {/* Center – Ticket Analyzer */}
          <div className="flex-1 min-w-0">
            <TicketAnalyzer
              ticket={selectedTicket}
              isAnalyzing={isAnalyzing}
              onAnalyze={handleAnalyze}
            />
          </div>

          {/* Right – AI Analysis */}
          <div className="w-full lg:w-80 xl:w-[360px] flex-shrink-0">
            <AnalysisPanel analysis={analysis} isAnalyzing={isAnalyzing} />
          </div>

        </div>
      </div>
    </div>
  );
}
