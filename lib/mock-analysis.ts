import type { AnalyzedTicket, RawTicket, TicketSeverity } from "@/lib/types";
import { MOCK_TICKETS } from "@/lib/mock-tickets";

type AnalysisTemplate = Omit<AnalyzedTicket, "raw" | "analyzedAt">;

const ANALYSES: Record<string, AnalysisTemplate> = {
  "TK-001": {
    category: "hardware_defect",
    severity: "critical",
    department: "Hardware Replacements",
    tier: "Priority",
    summary:
      "Customer reports left-click double-firing after only 3 weeks on a PulseForge Viper X (Order PF-2025-88421). The symptom pattern — single-click registering as double, and drag-and-drop failures — is consistent with the known Batch B23 switch defect. This qualifies for immediate Priority escalation.",
    draftResponse:
      "Hi Alex,\n\nThank you for reaching out to PulseForge Gaming Support. I'm truly sorry your Viper X is double-firing — that's completely unacceptable after just three weeks, and I understand how disruptive this is.\n\nI've reviewed your order (PF-2025-88421) and flagged your case for our Priority Replacements team. You'll receive a prepaid return label via email within 24 hours, and a brand-new replacement unit will be dispatched as soon as your return is in transit — no waiting for us to receive it first.\n\nExpect a follow-up from our Priority team within 2 business hours. We're committed to getting you back in the game.\n\nWarm regards,\nPulseForge Gaming Support",
    policyApplied:
      "Policy 2 — Double-click defect on switch under 6 months (Batch B23 pattern). Triggers automatic Priority Hardware Replacement escalation.",
  },

  "TK-002": {
    category: "hardware_defect",
    severity: "high",
    department: "Hardware Replacements",
    tier: "Tier 1",
    summary:
      "Customer reports scroll wheel skipping and reversing on PulseForge Apex Pro after 8 months of use (Order PF-2025-44009). Standard troubleshooting steps have been exhausted without improvement, pointing to a mechanical encoder failure. The device is within the 12-month warranty window.",
    draftResponse:
      "Hi Priya,\n\nThank you for contacting PulseForge Gaming Support. I'm sorry you're dealing with a faulty scroll wheel — that definitely shouldn't happen at 8 months.\n\nSince you've already ruled out software causes (driver reinstall, port changes), this points to a hardware encoder issue. Your Apex Pro is fully covered under our 12-month warranty (Order PF-2025-44009). I'm routing your case to our Hardware Replacements Tier 1 team, who will contact you within 1–2 business days with warranty replacement instructions at no charge.\n\nThank you for your patience — we'll make this right.\n\nWarm regards,\nPulseForge Gaming Support",
    policyApplied:
      "Policy 1 — Hardware defect within 12-month warranty window. Routed to Hardware Replacements Tier 1 for warranty replacement.",
  },

  "TK-003": {
    category: "hardware_defect",
    severity: "high",
    department: "Tech Support",
    tier: "Tier 2",
    summary:
      "Customer reports random DPI sensor spiking on PulseForge Phantom at 1600 DPI after 5 months of use (Order PF-2025-51872). Customer has performed a self-guided firmware update but the issue persists. Per policy, a Tech Support-guided re-flash and diagnostic must be completed before a hardware replacement is issued.",
    draftResponse:
      "Hi Marcus,\n\nThank you for writing in — cursor spiking makes competitive play impossible, and I completely understand the frustration.\n\nI can see you've updated your firmware, which is a good start. Our Tech Support Tier 2 team needs to run a full guided re-flash with sensor calibration, as the self-update process can sometimes miss corrupted data. They'll reach out within 1 business day to schedule a quick remote session.\n\nIf the re-flash doesn't resolve the issue, your Phantom is within the 12-month warranty and qualifies for an immediate hardware replacement — we've seen this in some units and we stand behind our product.\n\nWarm regards,\nPulseForge Gaming Support",
    policyApplied:
      "Policy 5 — Sensor issues must route to Tech Support Tier 2 for guided re-flash before replacement. Policy 6 — If issue persists after re-flash, qualifies as warranty hardware defect.",
  },

  "TK-004": {
    category: "firmware_software",
    severity: "medium",
    department: "Tech Support",
    tier: "Tier 2",
    summary:
      "Customer reports RGB lighting failure on PulseForge Nova RGB following a PulseSync firmware update (Order PF-2026-02341). Mouse functionality is otherwise intact. This is a known LED controller flash issue that Tech Support can resolve via guided re-flash without a hardware replacement in most cases.",
    draftResponse:
      "Hi Sarah,\n\nThank you for reaching out. I'm sorry the firmware update caused your RGB to go dark — I know the lighting was a key reason you chose the Nova RGB.\n\nThis is a known issue that can occur when the LED controller doesn't flash cleanly, and it's fixable without a replacement in most cases. I'm routing you to our Tech Support Tier 2 team, who will contact you within 1 business day with a guided re-flash procedure that typically restores RGB fully.\n\nIf the issue persists after the re-flash, we'll move to a warranty replacement at no cost.\n\nWarm regards,\nPulseForge Gaming Support",
    policyApplied:
      "Policy 5 — Firmware/software issues always route to Tech Support Tier 2. Hardware replacement not offered before software fix is attempted.",
  },

  "TK-005": {
    category: "shipping_logistics",
    severity: "critical",
    department: "Logistics",
    tier: "Escalation",
    summary:
      "Order PF-2026-08812 has not shipped after 14 business days with tracking stuck at 'label created.' This exceeds the 7-business-day escalation threshold. Severity elevated to Critical due to an imminent esports tournament deadline in 3 days. Requires immediate Logistics Escalation with express re-shipment evaluation and free shipping voucher.",
    draftResponse:
      "Hi James,\n\nI sincerely apologize — a 14-day delay with no tracking update is completely unacceptable, and I understand the urgency with your tournament this Saturday.\n\nI am escalating your case to our Logistics Escalation team right now and marking it as time-critical. They will investigate the shipment and contact you within 2–4 hours. If delivery before Saturday cannot be guaranteed, we will arrange an express re-shipment or an immediate refund so you can source locally in time.\n\nWe're also crediting a free shipping voucher to your account for the inconvenience. We're on this immediately — I'm sorry again for the impact on your tournament.\n\nWarm regards,\nPulseForge Gaming Support",
    policyApplied:
      "Policy 4 — Shipping delay ≥ 7 business days without tracking movement → Logistics Escalation + free shipping voucher. Severity elevated to Critical due to imminent event deadline.",
  },

  "TK-006": {
    category: "refund_return",
    severity: "medium",
    department: "Billing & Returns",
    tier: "Tier 1",
    summary:
      "Customer requesting a full refund for PulseForge Stealth (Order PF-2026-09104) received 5 days ago, factory-sealed and unopened. Request falls clearly within the 30-day return window for unopened product and qualifies for a full refund per policy.",
    draftResponse:
      "Hi Diana,\n\nThank you for reaching out! No problem at all — since your PulseForge Stealth arrived just 5 days ago and is still factory-sealed, you're well within our 30-day return window for a full refund.\n\nI'm routing your case to our Billing & Returns team, who will send you a prepaid return label within 1 business day. Once we receive the sealed package, your full refund will be processed to your original payment method within 3–5 business days.\n\nPlease keep the original packaging intact for the return. Let us know if you have any questions!\n\nWarm regards,\nPulseForge Gaming Support",
    policyApplied:
      "Policy 3 — Unopened return within 30 days of delivery qualifies for full refund. Routed to Billing & Returns Tier 1.",
  },

  "TK-007": {
    category: "warranty_claim",
    severity: "critical",
    department: "Hardware Replacements",
    tier: "Priority",
    summary:
      "Customer reports near-total left-click failure on PulseForge Viper X — requiring 4–5 presses per registration and sometimes not registering at all (Order PF-2025-67334). Device is 5 months old. Complete primary button failure under 6 months qualifies as Critical severity and matches the Batch B23 switch failure pattern, triggering Priority escalation.",
    draftResponse:
      "Hi Chen,\n\nThank you for contacting PulseForge Gaming Support. An unreliable left click is a complete show-stopper, and I'm sincerely sorry this happened after only 5 months.\n\nI've reviewed your order (PF-2025-67334) and your Viper X is well within our 12-month warranty. Given the severity of the failure, I'm escalating this directly to our Priority Hardware Replacements team. You'll receive a prepaid return label and a brand-new Viper X will be dispatched as soon as your return is confirmed in transit — no wait needed.\n\nExpect an email from our Priority team within 2 business hours.\n\nWarm regards,\nPulseForge Gaming Support",
    policyApplied:
      "Policy 1 — Hardware defect within 12-month warranty. Policy 2 — Switch failure under 6 months escalated to Priority. Severity Critical: total primary button failure.",
  },

  "TK-008": {
    category: "firmware_software",
    severity: "medium",
    department: "Tech Support",
    tier: "Tier 2",
    summary:
      "Customer reports PulseSync crashing on launch on Windows 11 24H2 (Order PF-2026-10087). Mouse functions as a basic plug-and-play HID device. This is a documented compatibility issue between PulseSync and Windows 11 24H2 that Tech Support can resolve with a targeted fix procedure.",
    draftResponse:
      "Hi Fatima,\n\nThank you for reaching out, and congratulations on your new Nova RGB! I'm sorry PulseSync is giving you trouble on launch.\n\nCrashing on Windows 11 24H2 is a known compatibility issue that our Tech Support Tier 2 team has a documented fix for. I'm routing your case to them now — they'll contact you within 1 business day with step-by-step instructions (typically a clean runtime reinstall with a minor registry fix).\n\nIn the meantime, your mouse will continue to work as a plug-and-play device with its default DPI setting.\n\nWarm regards,\nPulseForge Gaming Support",
    policyApplied:
      "Policy 5 — Software/firmware issues route to Tech Support Tier 2. No hardware replacement offered before software fix is attempted.",
  },
};

export function getMockAnalysis(ticket: RawTicket): AnalyzedTicket {
  const template = ANALYSES[ticket.id];
  if (!template) {
    return {
      raw: ticket,
      category: "general_inquiry",
      severity: "low",
      department: "General Support",
      tier: "Tier 1",
      summary:
        "Ticket reviewed by AI. Routed to General Support based on available context.",
      draftResponse: `Hi ${ticket.customerName.split(" ")[0]},\n\nThank you for reaching out to PulseForge Gaming Support. We've received your ticket and a support agent will review it shortly.\n\nWarm regards,\nPulseForge Gaming Support`,
      policyApplied: "General inquiry — routed to General Support Tier 1.",
      analyzedAt: new Date().toISOString(),
    };
  }
  return { ...template, raw: ticket, analyzedAt: new Date().toISOString() };
}

export const ALL_MOCK_ANALYSES: AnalyzedTicket[] =
  MOCK_TICKETS.map(getMockAnalysis);

export const SEVERITY_MAP: Record<string, TicketSeverity> =
  Object.fromEntries(ALL_MOCK_ANALYSES.map((a) => [a.raw.id, a.severity]));
