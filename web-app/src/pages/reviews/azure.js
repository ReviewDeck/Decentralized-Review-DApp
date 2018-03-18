let api_endpoint = "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";

let key1 = "d36a4f9417e649149ab5f0b6082f4fb6";
let key2 = "e97da104d2f445a4ba21c8d1929612f5";

var params = {
    "documents": [
        {
            "language": "en",
            "id": "1",
            "text": null
        }
    ]
};

function getSentiments(message) {
    params.documents[0].text = message;

    fetch(api_endpoint, {
        method: 'POST',
        headers:{
        "Content-Type":"application/json",
        "Ocp-Apim-Subscription-Key":key1,
        "Accept":"application/json"
        },
        body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(function(response) {
        let sentiment="negative";
        console.log('Here: ' + response);
        let score = response.documents[0].score*100;
        
        if(score > 40 && score < 60){
            sentiment="neutral";
        }else if(score>=60){
            sentiment="positive";
        }
        return sentiment;        
    })
    .catch(function(data) {
        console.log("errorr" + JSON.stringify(data));
    });
}

export default getSentiments;