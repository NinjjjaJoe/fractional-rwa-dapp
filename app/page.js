'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Stripe-inspired gradient */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Invest in Real Estate,
            <br />
            Own Fractional Tokens
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Transform real estate ownership with blockchain technology. 
            Buy, sell, and trade fractional property tokens on Ethereum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="btn-primary bg-white text-[#635BFF] hover:bg-gray-100">
              Browse Properties
            </Link>
            <Link href="/dashboard" className="btn-secondary bg-transparent border-white text-white hover:bg-white/10">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#0A2540]">
            Why Choose FractionalRE?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card">
              <div className="w-12 h-12 bg-[#635BFF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Transparent</h3>
              <p className="text-gray-600">
                All transactions secured by Ethereum blockchain with complete transparency
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div className="w-12 h-12 bg-[#00D4FF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Liquidity</h3>
              <p className="text-gray-600">
                Buy and sell property tokens 24/7 without traditional real estate delays
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div className="w-12 h-12 bg-[#635BFF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Low Minimum Investment</h3>
              <p className="text-gray-600">
                Start investing in premium real estate with as little as $100
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#0A2540]">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Connect Wallet', desc: 'Link your Web3 wallet to get started' },
              { step: '2', title: 'Browse Properties', desc: 'Explore tokenized real estate listings' },
              { step: '3', title: 'Purchase Tokens', desc: 'Buy fractional ownership shares' },
              { step: '4', title: 'Earn Returns', desc: 'Receive rental income and appreciation' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#635BFF] to-[#00D4FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Investing?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Join thousands of investors building wealth through fractional real estate
          </p>
          <Link href="/properties" className="btn-primary bg-white text-[#635BFF] hover:bg-gray-100 inline-block">
            Explore Properties Now
          </Link>
        </div>
      </section>
    </div>
  )
}
