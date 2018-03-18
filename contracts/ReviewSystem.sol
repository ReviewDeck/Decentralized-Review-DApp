pragma solidity ^0.4.18;
//pragma experimental ABIEncoderV2;

contract ReviewSystem {

    struct Product{
        bytes32 pUrl;
        string info;
    }
    mapping(bytes32=>Product) public products;


    bytes32[] productUrls ;/* //urls for all products*/

    function getProductCount() public constant returns(uint count) {
        return productUrls.length;//have to return it there is not way of getting it outside
    }
    function isProductAvailable(bytes32 _productUrl) view public returns (bool flag){
        //        for(uint i=0;i<productCount;i++)

        for(uint i=0;i<productUrls.length;i++)
            if(productUrls[i]==_productUrl) return false;
        return true;
    }

   
    /*//function for product*/
    event OnProductAdded();

    function addProduct(bytes32 _productUrl,string _info)  public {
        products[_productUrl]=Product(_productUrl,_info);//dictionary of products
        productUrls.push(_productUrl) -1;
        OnProductAdded();
    }
    function getProductUrls() view returns (bytes32[]){
        //using this will remove 'invalid opmode'
        return productUrls;
    }
    //    --------------REVIEW------------------------------
    
    struct Review{
        uint rIndex;
        bytes32 pUrl;
        address author;
        uint64 timestamp;
        uint8 rating;
        string content;
    }
    event OnReviewAdded();
    mapping(bytes32=>mapping(uint=>Review)) public reviews;/*// product=>(rIndex=>Review)*/

    mapping(bytes32=>uint) public reviewCounts; /*//product=>reviewCount, review count for each product*/

    function getReviewCount(bytes32 _pUrl) view public returns(uint reviewCount){
        return reviewCounts[_pUrl];
    }
    function addReview(bytes32 _pUrl,uint64 _timestamp,uint8 _rating,string _content) public{
        address _author=msg.sender;
        reviews[_pUrl][reviewCounts[_pUrl]]=Review(reviewCounts[_pUrl],_pUrl,_author,_timestamp,_rating,_content);
        reviewCounts[_pUrl]++;//because by default 0 will be value in dictionary
        OnReviewAdded();
    }
    function addProductAndReview(bytes32 _pUrl,string _pInfo,uint64 _timestamp,uint8 _rating,string _content) pgublic{
        addProduct(_pUrl,_pInfo);
        addReview(_pUrl,_timestamp,_rating,_content);
    }

}

