
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

   Product[] products;
   Review[] reviews;

   function isProductAvailable(bytes32 _pUrl) private returns (bool){
        for(uint i=0;i<products.length;i++)
            if(products[i].pUrl==_pUrl) return false;
        return true;
   }

   function addProduct(bytes _pUrl,string _info, string _timestamp) public {
       if(!isProductAvailable(_pUrl))
              require(false);

       products.push(Product(products.length+1,_pUrl,_info,_timestamp)) -1;
   }
}


