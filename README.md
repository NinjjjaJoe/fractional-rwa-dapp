# FractionalRE - Tokenized Real Estate Platform

A production-grade dApp for fractional real estate tokenization on Ethereum, featuring Stripe-inspired UI/UX.

## 🏗️ Architecture

### Smart Contracts
- **PropertyToken.sol** - ERC-20 tokens representing fractional property ownership
- **PropertyRegistry.sol** - Central registry for managing tokenized properties
- **EscrowContract.sol** - Fund management and distribution (Phase 2)
- **PropertyValuationOracle.sol** - Chainlink integration for real-time valuations (Phase 2)

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Stripe-inspired design system
- **Ethers.js v6** - Web3 integration
- **RainbowKit** - Wallet connection UI (optional)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask or Web3 wallet
- Ethereum testnet ETH (Sepolia)

### Installation

\`\`\`bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Add your private keys and RPC URLs to .env
\`\`\`

### Local Development

\`\`\`bash
# Start Hardhat local node
npx hardhat node

# In another terminal, deploy contracts
npm run deploy:local

# Start Next.js dev server
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## 📝 Smart Contract Development

### Compile Contracts
\`\`\`bash
npm run compile
\`\`\`

### Run Tests
\`\`\`bash
npm test
\`\`\`

### Deploy to Testnet
\`\`\`bash
# Sepolia testnet
npm run deploy:sepolia
\`\`\`

### Gas Optimization
\`\`\`bash
REPORT_GAS=true npm test
\`\`\`

## 🎨 UI/UX Features

### Design System (Stripe-inspired)
- **Colors**: Purple (#635BFF), Blue (#00D4FF), Dark (#0A2540)
- **Typography**: Inter font family
- **Components**: Gradient backgrounds, subtle shadows, rounded corners
- **Navigation**: Sticky header with persistent home button
- **Responsive**: Mobile-first design

### Pages
1. **Home** - Hero section, features, how it works, CTA
2. **Properties** - Browse available tokenized properties
3. **Dashboard** - Portfolio overview, holdings, transactions

### Navigation Flow
- All pages have "Back to Home" button in header
- Persistent navigation bar with Home/Properties/Dashboard links
- Mobile-responsive hamburger menu

## 🔐 Security Features

### Smart Contract Security
- ✅ OpenZeppelin AccessControl for role management
- ✅ ReentrancyGuard for protection against reentrancy attacks
- ✅ Pausable functionality for emergency stops
- ✅ Custom errors for gas optimization
- ✅ Time-lock mechanisms (Phase 2)
- ✅ Multi-signature support (Phase 2)

### Auditing
\`\`\`bash
# Install Slither
pip3 install slither-analyzer

# Run security audit
slither contracts/
\`\`\`

## 🌐 Deployment

### Vercel Deployment
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Environment Variables (Vercel)
Set these in Vercel dashboard:
- \`NEXT_PUBLIC_NETWORK\`
- \`NEXT_PUBLIC_REGISTRY_ADDRESS\`
- \`NEXT_PUBLIC_INFURA_ID\`

## 📊 Contract Addresses

### Local Network
- PropertyRegistry: (deployed after \`npm run deploy:local\`)

### Sepolia Testnet
- PropertyRegistry: (TBD)

### Ethereum Mainnet
- PropertyRegistry: (TBD)

## 🛠️ Tech Stack

- **Blockchain**: Ethereum (Solidity 0.8.20)
- **Framework**: Hardhat
- **Frontend**: Next.js 14, React 19
- **Styling**: Tailwind CSS
- **Web3**: Ethers.js v6
- **Testing**: Hardhat (Mocha/Chai)
- **Deployment**: Vercel

## 📈 Roadmap

### Phase 1: Core Smart Contracts ✅
- [x] PropertyToken ERC-20 implementation
- [x] PropertyRegistry with CRUD operations
- [x] Gas-optimized structs and storage
- [x] Basic access control

### Phase 2: Security & Oracles
- [ ] Multi-signature wallet integration
- [ ] Chainlink oracle for property valuations
- [ ] Time-lock mechanisms
- [ ] Emergency pause functionality
- [ ] Comprehensive test suite

### Phase 3: Frontend Integration
- [x] Stripe-inspired UI design
- [x] Property listing page
- [x] Dashboard with portfolio tracking
- [ ] Wallet connection (RainbowKit/WalletConnect)
- [ ] Real-time blockchain interaction
- [ ] Transaction history
- [ ] Token purchase flow

### Phase 4: Advanced Features
- [ ] Secondary marketplace
- [ ] Rental income distribution
- [ ] Governance voting
- [ ] Property valuation updates
- [ ] KYC/AML integration

## 👤 Developer

Built by **King F50** - AI Production Engineer

## 📄 License

MIT License - See LICENSE file for details

---

**Note**: This is a production-grade starter. Always conduct thorough security audits before mainnet deployment.
