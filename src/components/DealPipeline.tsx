import { useState } from 'react'
import { ChevronRight, Plus, Filter, BarChart3 } from 'lucide-react'
import type { Deal } from '../types'

interface DealPipelineProps {
  deals: Deal[]
  onDealUpdate: (dealId: string, stage: Deal['stage']) => void
}

const stages = [
  { id: 'lead', name: 'Lead', color: 'bg-gray-100 text-gray-800' },
  { id: 'qualified', name: 'Qualified', color: 'bg-blue-100 text-blue-800' },
  { id: 'proposal', name: 'Proposal', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
  { id: 'closed-won', name: 'Closed Won', color: 'bg-green-100 text-green-800' },
  { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-100 text-red-800' }
]

export default function DealPipeline({ deals, onDealUpdate }: DealPipelineProps) {
  const [selectedStage, setSelectedStage] = useState<string>('all')

  const dealsByStage = stages.map(stage => ({
    ...stage,
    deals: deals.filter(deal => deal.stage === stage.id)
  }))

  const totalValue = deals.reduce((sum, deal) => sum + deal.amount, 0)
  const wonValue = deals
    .filter(deal => deal.stage === 'closed-won')
    .reduce((sum, deal) => sum + deal.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deal Pipeline</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage your sales pipeline
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Pipeline</p>
            <p className="text-lg font-semibold text-gray-900">
              ${totalValue.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Won Value</p>
            <p className="text-lg font-semibold text-green-600">
              ${wonValue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Pipeline View */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {dealsByStage.map((stage) => (
          <div key={stage.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">{stage.name}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stage.color}`}>
                {stage.deals.length}
              </span>
            </div>
            
            <div className="space-y-3">
              {stage.deals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedStage(deal.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {deal.title}
                    </h4>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-sm text-gray-500">
                    ${deal.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {deal.probability}% probability
                  </div>
                </div>
              ))}
              
              {stage.deals.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Plus className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">No deals</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <BarChart3 className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Pipeline Analytics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {deals.length > 0 ? Math.round((wonValue / totalValue) * 100) : 0}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Deal Size</p>
            <p className="text-2xl font-bold text-gray-900">
              ${deals.length > 0 ? Math.round(totalValue / deals.length) : 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Deals</p>
            <p className="text-2xl font-bold text-gray-900">
              {deals.filter(d => d.stage !== 'closed-won' && d.stage !== 'closed-lost').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 