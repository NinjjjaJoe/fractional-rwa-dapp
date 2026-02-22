import hre from "hardhat";

async function main() {
  console.log("🚀 Starting deployment...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  // Deploy PropertyRegistry
  console.log("📝 Deploying PropertyRegistry...");
  const PropertyRegistry = await hre.ethers.getContractFactory("PropertyRegistry");
  const registry = await PropertyRegistry.deploy();
  await registry.waitForDeployment();

  const registryAddress = await registry.getAddress();
  console.log("✅ PropertyRegistry deployed to:", registryAddress);
  console.log("\n");

  // Register a sample property
  console.log("🏠 Registering sample property...");
  const tx = await registry.registerProperty(
    "Luxury Downtown Condo Tokens",
    "LDCT",
    "123 Main St, San Francisco, CA",
    hre.ethers.parseEther("2500000"), // $2.5M property value
    10000 // 10,000 tokens
  );
  
  await tx.wait();
  console.log("✅ Sample property registered!");

  // Get the first property details
  const property = await registry.getProperty(1);
  console.log("\n📊 Sample Property Details:");
  console.log("  Token Address:", property.tokenAddress);
  console.log("  Property Address:", property.propertyAddress);
  console.log("  Total Value:", hre.ethers.formatEther(property.totalValue), "ETH equivalent");
  console.log("  Total Tokens:", property.totalTokens.toString());

  console.log("\n🎉 Deployment complete!");
  console.log("\n📝 Next steps:");
  console.log("  1. Update frontend with contract addresses");
  console.log("  2. Verify contracts on Etherscan (if mainnet/testnet)");
  console.log("  3. Test the dApp locally");
  
  console.log("\n📄 Contract Addresses:");
  console.log("  PropertyRegistry:", registryAddress);
  console.log("  Sample Property Token:", property.tokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
