// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title PropertyToken
 * @dev ERC20 token representing fractional ownership of a property
 * Gas-optimized with custom errors and efficient storage
 */
contract PropertyToken is ERC20, AccessControl, Pausable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PROPERTY_MANAGER_ROLE = keccak256("PROPERTY_MANAGER_ROLE");

    // Custom errors for gas efficiency
    error InvalidPropertyId();
    error UnauthorizedAccess();
    error PropertyAlreadyExists();
    error InvalidAmount();

    struct PropertyMetadata {
        uint256 propertyId;
        string propertyAddress;
        uint256 totalValue;
        uint256 totalSupply;
        uint64 createdAt;
        bool isActive;
    }

    // Property ID for this token
    uint256 public propertyId;
    PropertyMetadata public metadata;

    event PropertyCreated(uint256 indexed propertyId, string propertyAddress, uint256 totalValue);
    event PropertyValueUpdated(uint256 indexed propertyId, uint256 newValue);

    constructor(
        string memory name,
        string memory symbol,
        uint256 _propertyId,
        string memory _propertyAddress,
        uint256 _totalValue,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        if (_propertyId == 0) revert InvalidPropertyId();
        if (initialSupply == 0) revert InvalidAmount();

        propertyId = _propertyId;
        metadata = PropertyMetadata({
            propertyId: _propertyId,
            propertyAddress: _propertyAddress,
            totalValue: _totalValue,
            totalSupply: initialSupply,
            createdAt: uint64(block.timestamp),
            isActive: true
        });

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PROPERTY_MANAGER_ROLE, msg.sender);

        _mint(msg.sender, initialSupply);

        emit PropertyCreated(_propertyId, _propertyAddress, _totalValue);
    }

    /**
     * @dev Mint additional tokens (for additional investment rounds)
     */
    function mint(address to, uint256 amount) 
        external 
        onlyRole(MINTER_ROLE) 
        whenNotPaused 
    {
        if (amount == 0) revert InvalidAmount();
        _mint(to, amount);
        metadata.totalSupply += amount;
    }

    /**
     * @dev Update property valuation
     */
    function updatePropertyValue(uint256 newValue) 
        external 
        onlyRole(PROPERTY_MANAGER_ROLE) 
    {
        metadata.totalValue = newValue;
        emit PropertyValueUpdated(propertyId, newValue);
    }

    /**
     * @dev Get price per token based on current valuation
     */
    function getPricePerToken() external view returns (uint256) {
        if (metadata.totalSupply == 0) return 0;
        return (metadata.totalValue * 1e18) / metadata.totalSupply;
    }

    /**
     * @dev Pause token transfers (emergency)
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause token transfers
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @dev Override _update to add pause functionality (OZ v5)
     */
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._update(from, to, amount);
    }
}
