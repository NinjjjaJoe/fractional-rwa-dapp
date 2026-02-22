// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./PropertyToken.sol";

/**
 * @title PropertyRegistry
 * @dev Central registry for managing all tokenized properties
 */
contract PropertyRegistry is AccessControl, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    error PropertyNotFound();
    error PropertyAlreadyRegistered();

    struct Property {
        address tokenAddress;
        string propertyAddress;
        uint256 totalValue;
        uint256 totalTokens;
        address owner;
        uint64 registeredAt;
        bool isActive;
    }

    // propertyId => Property
    mapping(uint256 => Property) public properties;
    uint256 public propertyCount;

    // User address => array of property IDs they own tokens in
    mapping(address => uint256[]) public userProperties;

    event PropertyRegistered(
        uint256 indexed propertyId,
        address indexed tokenAddress,
        string propertyAddress,
        uint256 totalValue
    );
    event PropertyStatusChanged(uint256 indexed propertyId, bool isActive);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Register a new property and deploy its token contract
     */
    function registerProperty(
        string memory name,
        string memory symbol,
        string memory propertyAddress,
        uint256 totalValue,
        uint256 initialSupply
    ) external onlyRole(ADMIN_ROLE) nonReentrant returns (uint256 propertyId) {
        propertyId = ++propertyCount;

        // Deploy new PropertyToken contract
        PropertyToken token = new PropertyToken(
            name,
            symbol,
            propertyId,
            propertyAddress,
            totalValue,
            initialSupply
        );

        properties[propertyId] = Property({
            tokenAddress: address(token),
            propertyAddress: propertyAddress,
            totalValue: totalValue,
            totalTokens: initialSupply,
            owner: msg.sender,
            registeredAt: uint64(block.timestamp),
            isActive: true
        });

        emit PropertyRegistered(propertyId, address(token), propertyAddress, totalValue);
    }

    /**
     * @dev Get property details
     */
    function getProperty(uint256 propertyId) 
        external 
        view 
        returns (Property memory) 
    {
        if (properties[propertyId].tokenAddress == address(0)) {
            revert PropertyNotFound();
        }
        return properties[propertyId];
    }

    /**
     * @dev Get all active properties (paginated)
     */
    function getActiveProperties(uint256 offset, uint256 limit) 
        external 
        view 
        returns (Property[] memory activeProps) 
    {
        uint256 activeCount = 0;
        
        // Count active properties
        for (uint256 i = 1; i <= propertyCount; i++) {
            if (properties[i].isActive) activeCount++;
        }

        uint256 returnSize = limit;
        if (offset + limit > activeCount) {
            returnSize = activeCount - offset;
        }

        activeProps = new Property[](returnSize);
        uint256 currentIndex = 0;
        uint256 returnIndex = 0;

        for (uint256 i = 1; i <= propertyCount && returnIndex < returnSize; i++) {
            if (properties[i].isActive) {
                if (currentIndex >= offset) {
                    activeProps[returnIndex] = properties[i];
                    returnIndex++;
                }
                currentIndex++;
            }
        }
    }

    /**
     * @dev Toggle property active status
     */
    function setPropertyStatus(uint256 propertyId, bool isActive) 
        external 
        onlyRole(ADMIN_ROLE) 
    {
        if (properties[propertyId].tokenAddress == address(0)) {
            revert PropertyNotFound();
        }
        properties[propertyId].isActive = isActive;
        emit PropertyStatusChanged(propertyId, isActive);
    }

    /**
     * @dev Get total number of active properties
     */
    function getActivePropertyCount() external view returns (uint256 count) {
        for (uint256 i = 1; i <= propertyCount; i++) {
            if (properties[i].isActive) count++;
        }
    }
}
