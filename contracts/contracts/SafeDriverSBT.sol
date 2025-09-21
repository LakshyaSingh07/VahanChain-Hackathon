// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract SafeDriverSBT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    mapping(address => uint256) public driverScores;
    mapping(address => bool) public hasSBT;

    constructor() ERC721("SafeDriverSBT", "VDS") Ownable(msg.sender) {}

    /**
     * @dev Mints a new Safe Driver SBT to a specific address.
     * Only the contract owner can call this.
     * A driver can only have one SBT.
     * @param to The address of the driver to mint the SBT for.
     */
    function mint(address to) public onlyOwner {
        require(!hasSBT[to], "Driver already has an SBT"); // Ensure only one SBT per driver

        _tokenIdCounter++; // Get next available token ID
        uint256 newItemId = _tokenIdCounter; // Store the current ID

        _safeMint(to, newItemId); // Mint the ERC721 token
        hasSBT[to] = true; // Mark that this address now has an SBT
        driverScores[to] = 0; // Initialize safety score to 0 upon minting
    }

    /**
     * @dev Overrides the internal ERC721 update function to make tokens non-transferable.
     * This makes the SBT "Soul-Bound".
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("SafeDriverSBTs are non-transferable");
        }
        return super._update(to, tokenId, auth);
    }

    /**
     * @dev Updates the safety score for a specific driver.
     * Only the contract owner can call this.
     * Requires the driver to already have an SBT.
     * @param driver The address of the driver whose score to update.
     * @param newScore The new safety score.
     */
    function updateSafetyScore(
        address driver,
        uint256 newScore
    ) public onlyOwner {
        require(hasSBT[driver], "Driver does not have an SBT to update score");
        driverScores[driver] = newScore; // Update the score
        // You could emit an event here to notify off-chain systems of the score change
    }

    /**
     * @dev Returns the current safety score of a specific driver.
     * This is a view function and does not cost gas.
     * @param driver The address of the driver.
     * @return The current safety score of the driver.
     */
    function getSafetyScore(address driver) public view returns (uint256) {
        return driverScores[driver];
    }
}
