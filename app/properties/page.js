'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PropertiesPage() {
  const [properties] = useState([
    {
      id: 1,
      name: 'Luxury Downtown Condo',
      address: '123 Main St, San Francisco, CA',
      totalValue: 2500000,
      availableTokens: 10000,
      pricePerToken: 250,
      image: '/images/property1.jpg',
      apy: 8.5,
    },
    {
      id: 2,
      name: 'Beachfront Villa',
      address: '456 Ocean Ave, Miami, FL',
      totalValue: 5000000,
      availableTokens: 20000,
      pricePerToken: 250,
      image: '/images/property2.jpg',
      apy: 7.2,
    },
    {
      id: 3,
      name: 'Urban Loft Complex',
      address: '789 Tech Blvd, Austin, TX',
      totalValue: 1800000,
      availableTokens: 7200,
      pricePerToken: 250,
      image: '/images/property3.jpg',
      apy: 9.1,
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
            <h1 className="text-4xl font-bold text-[#0A2540]">Available Properties</h1>
            <Link href="/" className="text-[#635BFF] hover:text-[#5348E8] font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
          <p className="text-gray-600 text-lg">
            Browse tokenized real estate opportunities and start building your portfolio
          </p>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="card group cursor-pointer hover:scale-105 transition-transform">
              {/* Property Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-[#635BFF] to-[#00D4FF] rounded-xl mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>

              {/* Property Details */}
              <h3 className="text-xl font-bold text-[#0A2540] mb-2">{property.name}</h3>
              <p className="text-gray-600 text-sm mb-4 flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.address}
              </p>

              {/* Stats */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Total Value</span>
                  <span className="font-bold text-[#0A2540]">{formatCurrency(property.totalValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Price per Token</span>
                  <span className="font-bold text-[#0A2540]">{formatCurrency(property.pricePerToken)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Available Tokens</span>
                  <span className="font-bold text-[#0A2540]">{property.availableTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-gray-600 text-sm">Est. APY</span>
                  <span className="font-bold text-green-600 text-lg">{property.apy}%</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full btn-primary">
                Invest Now
              </button>
            </div>
          ))}
        </div>

        {/* Empty State (if no properties) */}
        {properties.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Properties Available</h3>
            <p className="text-gray-600">Check back soon for new investment opportunities</p>
          </div>
        )}
      </div>
    </div>
  )
}
