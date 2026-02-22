import { expect } from "chai";
import hre from "hardhat";

describe("PropertyRegistry", function () {
  let propertyRegistry;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await hre.ethers.getSigners();

    const PropertyRegistry = await hre.ethers.getContractFactory("PropertyRegistry");
    propertyRegistry = await PropertyRegistry.deploy();
    await propertyRegistry.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const DEFAULT_ADMIN_ROLE = await propertyRegistry.DEFAULT_ADMIN_ROLE();
      expect(await propertyRegistry.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.true;
    });

    it("Should start with zero properties", async function () {
      expect(await propertyRegistry.propertyCount()).to.equal(0);
    });
  });

  describe("Property Registration", function () {
    it("Should register a new property successfully", async function () {
      const tx = await propertyRegistry.registerProperty(
        "Test Property Token",
        "TPT",
        "123 Test St",
        ethers.parseEther("1000000"),
        10000
      );

      await tx.wait();

      expect(await propertyRegistry.propertyCount()).to.equal(1);

      const property = await propertyRegistry.getProperty(1);
      expect(property.propertyAddress).to.equal("123 Test St");
      expect(property.totalValue).to.equal(hre.ethers.parseEther("1000000"));
      expect(property.totalTokens).to.equal(10000);
      expect(property.isActive).to.be.true;
    });

    it("Should fail if non-admin tries to register property", async function () {
      await expect(
        propertyRegistry.connect(addr1).registerProperty(
          "Test Property",
          "TPT",
          "123 Test St",
          hre.ethers.parseEther("1000000"),
          10000
        )
      ).to.be.reverted;
    });

    it("Should deploy PropertyToken contract when registering", async function () {
      const tx = await propertyRegistry.registerProperty(
        "Test Property Token",
        "TPT",
        "123 Test St",
        hre.ethers.parseEther("1000000"),
        10000
      );

      await tx.wait();

      const property = await propertyRegistry.getProperty(1);
      expect(property.tokenAddress).to.not.equal(hre.ethers.ZeroAddress);
    });
  });

  describe("Property Management", function () {
    beforeEach(async function () {
      await propertyRegistry.registerProperty(
        "Property 1",
        "P1",
        "Address 1",
        hre.ethers.parseEther("1000000"),
        10000
      );

      await propertyRegistry.registerProperty(
        "Property 2",
        "P2",
        "Address 2",
        hre.ethers.parseEther("2000000"),
        20000
      );
    });

    it("Should toggle property status", async function () {
      await propertyRegistry.setPropertyStatus(1, false);
      const property = await propertyRegistry.getProperty(1);
      expect(property.isActive).to.be.false;

      await propertyRegistry.setPropertyStatus(1, true);
      const propertyAfter = await propertyRegistry.getProperty(1);
      expect(propertyAfter.isActive).to.be.true;
    });

    it("Should get active property count correctly", async function () {
      expect(await propertyRegistry.getActivePropertyCount()).to.equal(2);

      await propertyRegistry.setPropertyStatus(1, false);
      expect(await propertyRegistry.getActivePropertyCount()).to.equal(1);
    });

    it("Should get active properties with pagination", async function () {
      const properties = await propertyRegistry.getActiveProperties(0, 10);
      expect(properties.length).to.equal(2);
    });

    it("Should revert when getting non-existent property", async function () {
      await expect(propertyRegistry.getProperty(999)).to.be.revertedWithCustomError(
        propertyRegistry,
        "PropertyNotFound"
      );
    });
  });
});
