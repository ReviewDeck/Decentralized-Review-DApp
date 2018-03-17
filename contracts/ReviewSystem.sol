
pragma solidity ^0.4.2;

contract ReviewSystem {

   struct Product{
       uint32 id;
       bytes pUrl;
       string info;
       string timestamp;
   }

   struct Review{
       address author;
       uint32 productid;
       string timestamp;
       uint32 rating; //later replace that with enum
       string content;
   }

   Product[] public products;
   Review[] public reviews;

   function isProductAvailable(bytes _pUrl) view private returns (bool){
        for(uint i=0;i<products.length;i++)
            if(keccak256(products[i].pUrl) == keccak256(_pUrl)) return false;
        return true;
   }

   function addProduct(bytes _pUrl,string _info, string _timestamp) public {
       if(isProductAvailable(_pUrl) == false)
              require(false);

       uint32  prods = uint32(products.length) + 1;
       products.push(Product(prods,_pUrl,_info,_timestamp)) -1;
   }

   function getProducts() public constant returns (Product[]) {
        return products;
   }

}
