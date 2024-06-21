// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.25;
import  "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/*
1.listing
2.buying
3.updating price
4.delete listing
5.withdraw proceeds
 */
error NFTmarket_PriceCannotBeZero();
error NFTmarket_NotApproved();
error NFTmarket_AlreadyListed(address nft,uint256 tokenId);
error NFTmarket_NotListed(address nft,uint256 tokenId);

error NFTmarket_NotOwner(address nft,uint256 token,address owner);
error NFTmarket_NotEnoughPrice(uint256 value,address sender);
error NFTmarket_transferFailed(address sender,uint256 proceeds);
error NFTmarket_NoProceeds();
contract NFTmarket{
    //contract  variables
    struct Listing{
        address seller;
        uint256 price;

    }
    mapping(address=>mapping(uint256 => Listing)) private s_listings;
    mapping(address=>uint256) private s_proceeds;
    //events
    event ItemListed(address indexed nft, uint256 indexed tokenId, uint256 price,address sender);
    event ItemBought(address indexed nftAddress,uint256 indexed tokenId,uint256 price,address buyer);
    event ItemCanceled(address indexed nftAddress,uint256  indexed tokenId  );  
    
    //constructor

    //modifiers
    modifier alreadyListed(address nft,uint256 tokenId) {
        Listing memory listing = s_listings[nft][tokenId];

        if(listing.price>0){
            revert NFTmarket_AlreadyListed(nft,tokenId);
        }
        _;

    }
    modifier isListed(address nft,uint256 tokenId) {
        Listing memory listing = s_listings[nft][tokenId];

        if(listing.price<=0){
            revert NFTmarket_NotListed(nft,tokenId);
        }
        _;

    }
    modifier isOwner(address nftAdd,uint256 tokenId,address owner){
        IERC721 nft = IERC721(nftAdd);
        if(nft.ownerOf(tokenId) != owner){
            revert NFTmarket_NotOwner(nftAdd,tokenId,owner);
        }
        _;
            
        }
    
    //main functions
    function listItem(address nftAddress,uint256 tokenId,uint256 price) isOwner(nftAddress,tokenId,msg.sender) alreadyListed(nftAddress,tokenId) external {
        if(price<=0){
            revert NFTmarket_PriceCannotBeZero();
        }
        IERC721 nft = IERC721(nftAddress);
        if(nft.getApproved(tokenId)!= address(this)){
            revert NFTmarket_NotApproved();
        }
        s_listings[nftAddress][tokenId] = Listing(msg.sender,price);
        emit ItemListed(nftAddress,tokenId,price,msg.sender);
    }

    function buyItem(address nftAddress,uint256 tokenId)   isListed(nftAddress,tokenId) public payable{
        Listing memory listing = s_listings[nftAddress][tokenId];
        if(msg.value<listing.price){
            revert NFTmarket_NotEnoughPrice(msg.value,msg.sender);
        }
        s_proceeds[listing.seller] = s_proceeds[listing.seller] + msg.value;
        delete s_listings[nftAddress][tokenId];
        IERC721 nft = IERC721(nftAddress);
        nft.safeTransferFrom(listing.seller,msg.sender,tokenId);
        emit ItemBought(nftAddress,tokenId,msg.value,msg.sender);


    }

    function cancelListing(address nftAddress,uint256 tokenId) external isListed(nftAddress,tokenId) isOwner(nftAddress,tokenId,msg.sender) {
        delete s_listings[nftAddress][tokenId];
        emit ItemCanceled(nftAddress,tokenId  );  
    }

    function updateListing(address nftAddress,uint256 tokenId,uint256 price) external isListed(nftAddress,tokenId) isOwner(nftAddress,tokenId,msg.sender){
        if(price<=0){
            revert NFTmarket_PriceCannotBeZero();
        }
        s_listings[nftAddress][tokenId].price =price;
        emit ItemListed(nftAddress,tokenId,price,msg.sender);
    }

    function withdraw() external payable{
        uint256 proceeds = s_proceeds[msg.sender];
        if(proceeds==0){
            revert NFTmarket_NoProceeds();
        }
        delete (s_proceeds[msg.sender]);
        (bool send,) = payable(msg.sender).call{value:proceeds}("");
        if(!send){
            revert NFTmarket_transferFailed(msg.sender,proceeds);
        }
    }

    //view functions
    
    function getListing(address nft,uint256 id) view external returns(Listing memory)
    {
        return s_listings[nft][id];
    }

    function getProceeds() external view returns(uint256){
        return s_proceeds[msg.sender];
    }
}
