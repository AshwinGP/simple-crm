import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  DollarSign,
  Activity
} from 'lucide-react'
import type { DashboardStats } from '../types'

// Mock data - in a real app, this would come from an API
const mockStats: DashboardStats = {
  totalCustomers: 124,
  totalContacts: 342,
  totalDeals: 89,
  totalRevenue: 1250000,
  dealsByStage: {
    'lead': 15,
    'qualified': 23,
    'proposal': 18,
    'negotiation': 12,
    'closed-won': 15,
    'closed-lost': 6
  },
  recentActivity: [
    {
      id: '1',
      type: 'customer_created',
      description: 'New customer "Acme Corp" added',
      timestamp: '2024-01-15T10:30:00Z',
      entityId: '1',
      entityType: 'customer'
    },
    {
      id: '2',
      type: 'deal_updated',
      description: 'Deal "Enterprise Software License" moved to negotiation',
      timestamp: '2024-01-15T09:15:00Z',
      entityId: '2',
      entityType: 'deal'
    },
    {
      id: '3',
      type: 'contact_added',
      description: 'Contact "John Smith" added to Tech Solutions Inc',
      timestamp: '2024-01-15T08:45:00Z',
      entityId: '3',
      entityType: 'contact'
    }
  ]
}

const stats = [
  {
    name: 'Total Customers',
    value: mockStats.totalCustomers,
    icon: Users,
    change: '+12%',
    changeType: 'positive' as const
  },
  {
    name: 'Total Contacts',
    value: mockStats.totalContacts,
    icon: UserCheck,
    change: '+8%',
    changeType: 'positive' as const
  },
  {
    name: 'Active Deals',
    value: mockStats.totalDeals,
    icon: TrendingUp,
    change: '+5%',
    changeType: 'positive' as const
  },
  {
    name: 'Total Revenue',
    value: `$${(mockStats.totalRevenue / 1000000).toFixed(1)}M`,
    icon: DollarSign,
    change: '+23%',
    changeType: 'positive' as const
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Deals by Stage */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Deals by Stage
            </h3>
            <div className="mt-5 space-y-4">
              {Object.entries(mockStats.dealsByStage).map(([stage, count]) => (
                <div key={stage} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-3" />
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {stage.replace('-', ' ')}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Recent Activity
              </h3>
            </div>
            <div className="mt-5 flow-root">
              <ul className="-mb-8">
                {mockStats.recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== mockStats.recentActivity.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <Activity className="h-4 w-4 text-white" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              {activity.description}
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime={activity.timestamp}>
                              {new Date(activity.timestamp).toLocaleDateString()}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 