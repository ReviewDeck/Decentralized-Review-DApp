// content.js

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "getUrl":
                sendResponse(window.location.href);
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);

/* What features to add in this browser extension?
   - Submit Review for Current Tab
   - Provide button to view past recent reviews for current page
     or show the reviews there itself (whatever is suitable).

*/
