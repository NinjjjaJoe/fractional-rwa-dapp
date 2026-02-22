'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [portfolio] = useState({
    totalInvested: 50000,
    currentValue: 54250,
    totalReturns: 4250,
    returnPercentage: 8.5,
  })

  const [holdings] = useState([
    {
      id: 1,
      propertyName: 'Luxury Downtown Condo',
      tokensOwned: 100,
      investedAmount: 25000,
      currentValue: 27125,
      apy: 8.5,
    },
    {
      id: 2,
      propertyName: 'Beachfront Villa',
      tokensOwned: 100,
      investedAmount: 25000,
      currentValue: 27125,
      apy: 7.2,
    },
  ])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-[#0A2540]">My Dashboard</h1>
            <Link href="/" className="text-[#635BFF] hover:text-[#5348E8] font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </div>
          <p className="text-gray-600 text-lg">
            Track your portfolio performance and manage your investments
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card">
            <p className="text-gray-600 text-sm mb-1">Total Invested</p>
            <p className="text-3xl font-bold text-[#0A2540]">{formatCurrency(portfolio.totalInvested)}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm mb-1">Current Value</p>
            <p className="text-3xl font-bold text-[#0A2540]">{formatCurrency(portfolio.currentValue)}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm mb-1">Total Returns</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(portfolio.totalReturns)}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm mb-1">Return Rate</p>
            <p className="text-3xl font-bold text-green-600">+{portfolio.returnPercentage}%</p>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#0A2540]">My Holdings</h2>
            <Link href="/properties" className="btn-primary text-sm">
              Browse More Properties
            </Link>
          </div>

          {holdings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">Property</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium text-sm">Tokens Owned</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium text-sm">Invested</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium text-sm">Current Value</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium text-sm">APY</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => (
                    <tr key={holding.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-[#0A2540]">{holding.propertyName}</div>
                      </td>
                      <td className="py-4 px-4 text-right font-medium">{holding.tokensOwned}</td>
                      <td className="py-4 px-4 text-right">{formatCurrency(holding.investedAmount)}</td>
                      <td className="py-4 px-4 text-right font-bold text-green-600">
                        {formatCurrency(holding.currentValue)}
                      </td>
                      <td className="py-4 px-4 text-right text-green-600 font-medium">{holding.apy}%</td>
                      <td className="py-4 px-4 text-right">
                        <button className="text-[#635BFF] hover:text-[#5348E8] font-medium text-sm">
                          Sell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Holdings Yet</h3>
              <p className="text-gray-600 mb-6">Start investing in tokenized real estate today</p>
              <Link href="/properties" className="btn-primary inline-block">
                Browse Properties
              </Link>
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#0A2540]">Purchased Tokens</p>
                  <p className="text-sm text-gray-600">Luxury Downtown Condo</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#0A2540]">+100 tokens</p>
                <p className="text-sm text-gray-600">2 days ago</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#0A2540]">Purchased Tokens</p>
                  <p className="text-sm text-gray-600">Beachfront Villa</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#0A2540]">+100 tokens</p>
                <p className="text-sm text-gray-600">5 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
