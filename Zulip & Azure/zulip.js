username = "reviews-bot@reviewsdapp.zulipchat.com"
key = "F5X2TttJxpj9onxUMQjurIsNQOZZ33Oc";
realm = "";

const config = {
    username: username,
    apiKey: key,
    realm: realm
};

const zulip = require('zulip-js')(config);
  
zulip.streams.subscriptions().then(res => {
    console.log(res);
}).catch(e){
    alert(e);
};

/* Create new stream if it does not exists for a URL */
product_url = "https://google.com";
stream_name =  product_url.split()
const config = {
    zuliprc: 'zuliprc-dev',
};

zulip(config).then((client) => {
    // Get all streams that the user has access to
    client.streams.retrieve().then(function(streams){
        console.log();
        if(  )
    });
});

/* Create new message in the stream & add topic based on sentiment */
