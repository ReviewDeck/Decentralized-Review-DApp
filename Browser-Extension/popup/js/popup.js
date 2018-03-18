// popup.js
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "getUrl"}, function(oldURL) {
    	
		var index = 0;
		var newURL = oldURL;
		index = oldURL.indexOf('?');
		
		if(index == -1){
		    index = oldURL.indexOf('#');
		}
		if(index != -1){
		    newURL = oldURL.substring(0, index);
		}
		
		console.log(newURL);
		document.getElementById("pageUrl").textContent = newURL;    
    });
});
