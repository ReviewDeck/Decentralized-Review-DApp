pragma solidity ^0.4.2;

contract ReviewSystem {

    struct Product{
        bytes32 pUrl;
        string info;
    }
    mapping(bytes32=>Product) public products;

    bytes32[] public productUrls ; //urls for all products

    function isProductAvailable(bytes32 _productUrl) view private returns (bool){
        for(uint i=0;i<productUrls.length;i++)
            if(productUrls[i]==_productUrl) return false;
        return true;
    }

    struct Review{
        uint rIndex;
        bytes32 pUrl;
        address author;
        uint64 timestamp;
        uint8 rating;
        string content;
    }

    mapping(bytes32=>mapping(uint=>Review)) public reviews;// product=>(rIndex=>Review)

    mapping(bytes32=>uint) public reviewCounts; //product=>reviewCount, review count for each product

    //function for product

    function addProduct(bytes32 _productUrl,string _info)  public {
        if(!isProductAvailable(_productUrl))
            require(false);//throw exception

        products[_productUrl]=Product(_productUrl,_info);//dictionary of products

        productUrls.push(_productUrl);
    }

    function addReview(bytes32 _pUrl,uint64 _timestamp,uint8 _rating,string _content) public{
        address _author=msg.sender;
        reviews[_pUrl][reviewCounts[_pUrl]]=Review(reviewCounts[_pUrl],_pUrl,_author,_timestamp,_rating,_content);
        reviewCounts[_pUrl]++;
    }

    function getReviews(bytes32 _pUrl) public returns (Review[]){
        Review[] temp;
        uint count=reviewCounts[_pUrl];
        for(uint i=0;i<count;i++)
            temp.push(reviews[_pUrl][i]);
        return temp;
    }
}

//
