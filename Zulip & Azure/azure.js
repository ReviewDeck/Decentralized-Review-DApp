api_endpoint = "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";

key1 = "d36a4f9417e649149ab5f0b6082f4fb6";
key2 = "e97da104d2f445a4ba21c8d1929612f5";

var params = {
    "documents": [
        {
            "language": "en",
            "id": "1",
            "text": "This is my first test. All is good"
        }
    ]
};

$.ajax({
    method: 'POST',
    url: api_endpoint,
    headers:{
      "Content-Type":"application/json",
      "Ocp-Apim-Subscription-Key":key1,
      "Accept":"application/json"
    },
    data: JSON.stringify(params),
    dataType: 'text',
})
.done(function(data) {
    console.log('Here: ' + data);
    $('#responseData').html(data);
})
.fail(function(data) {
    alert("error" + JSON.stringify(data));
});