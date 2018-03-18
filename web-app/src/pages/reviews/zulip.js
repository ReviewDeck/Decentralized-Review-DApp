import {zulip} from 'zulip-js';
import getSentiments from './azure';

let username = "reviews-bot@reviewsdapp.zulipchat.com"
let key = "F5X2TttJxpj9onxUMQjurIsNQOZZ33Oc";
let realm = "";

const config = {
    username: username,
    apiKey: key,
    realm: realm
};

const zulipp = zulip(config);

function sendToZulip(product_url, message_content, userid){

    zulipp.streams.subscriptions().then(res => {
        console.log(res);
    }).catch(function(e){
            alert(e);
    });
    
    let stream_name =  product_url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    
    
    const config = {
        zuliprc: 'zuliprc-dev',
    };
    
    zulipp(config).then((client) => {
        // Send a message
        const params = {
            to: 'general',
            type: 'stream',
            subject: stream_name,
            content:  product_url+ "\n" + message_content + "\n reviewer - " + userid
        }
    
        client.messages.send(params).then(function(response){
            let mid = response.id;
            zulipp(config).then((client) => {
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
                
                zulipp.reactions.add(paramss).then(function(resp){
                    console.log(resp); 
                });
            });
        });
    })
}
export default sendToZulip;