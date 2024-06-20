// SPDX-License-Identifier: MIT 
pragma solidity 0.8.25;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
contract BasicNFT is ERC721{
    string constant public TOKEN_URI='ipfs://bafybeigm3yuykzio2alkm4xtevgn6xgl5zmbevjkvli5cdsnnkn7ktclv4/';
    uint256 private s_counter;
    constructor() ERC721("katze","CAR"){
        s_counter=0;
    }
    function mintNft() public returns(uint256){
        _safeMint(msg.sender,s_counter);
        s_counter = s_counter +1;
        return s_counter;
    }

    function getTokenCounter() public view returns(uint256){
        return s_counter;
    }

    function tokenURI(uint256/*token id*/) public pure override returns(string memory){
        return TOKEN_URI;
    }

}
