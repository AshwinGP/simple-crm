export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  industry?: string
  status: 'active' | 'inactive' | 'prospect'
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  position?: string
  customerId?: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface Deal {
  id: string
  title: string
  description?: string
  amount: number
  currency: string
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  customerId?: string
  contactId?: string
  expectedCloseDate?: string
  probability: number
  createdAt: string
  updatedAt: string
}

export interface DashboardStats {
  totalCustomers: number
  totalContacts: number
  totalDeals: number
  totalRevenue: number
  dealsByStage: Record<string, number>
  recentActivity: Activity[]
}

export interface Activity {
  id: string
  type: 'customer_created' | 'deal_updated' | 'contact_added'
  description: string
  timestamp: string
  entityId: string
  entityType: 'customer' | 'contact' | 'deal'
} 