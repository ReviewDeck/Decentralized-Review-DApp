import zulip from 'zulip-js';
import getSentiments from './azure';

username = "reviews-bot@reviewsdapp.zulipchat.com"
key = "F5X2TttJxpj9onxUMQjurIsNQOZZ33Oc";
realm = "";

const config = {
    username: username,
    apiKey: key,
    realm: realm
};

const zulip = zulip(config);

function sendToZulip(product_url, message_content, userid){

    zulip.streams.subscriptions().then(res => {
        console.log(res);
    }).catch(function(e){
            alert(e);
    });
    
    stream_name =  project_url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    
    
    const config = {
        zuliprc: 'zuliprc-dev',
    };
    
    zulip(config).then((client) => {
        // Send a message
        const params = {
            to: 'general',
            type: 'stream',
            subject: stream_name,
            content:  project_url+ "\n" + message_content + "\n reviewer - " + userid
        }
    
        client.messages.send(params).then(function(response){
            mid = response.id;
            zulip(config).then((client) => {
                // add emoji to message
                var paramss = {
                    message_id: mid,
                    emoji: ":simple_smile:"
                }
                /* change emoji according to sentiment */
                var sentiment = getSentiments(message_content);
                if(sentiment == "negative"){
                    paramss['emoji'] = ":angry_face:";   
                }else if(sentiment == "neutral"){
                    paramss['emoji'] = "neutral";
                }
                
                zulip.reactions.add(paramss).then(function(resp){
                    console.log(resp); 
                });
            });
        });
    }
}
export default sendToZulip;