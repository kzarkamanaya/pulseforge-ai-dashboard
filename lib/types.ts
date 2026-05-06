export type TicketSeverity = 'critical' | 'high' | 'medium' | 'low'

export type TicketCategory =
  | 'hardware_defect'
  | 'firmware_software'
  | 'shipping_logistics'
  | 'refund_return'
  | 'warranty_claim'
  | 'general_inquiry'

export interface RawTicket {
  id: string
  customerName: string
  customerEmail: string
  subject: string
  body: string
  submittedAt: string // ISO 8601
}

export interface AnalyzedTicket {
  raw: RawTicket
  category: TicketCategory
  severity: TicketSeverity
  department: string
  tier: string
  summary: string
  draftResponse: string
  policyApplied: string
  analyzedAt: string // ISO 8601
}
