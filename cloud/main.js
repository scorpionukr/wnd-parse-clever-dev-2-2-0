const CleverTap = require("clevertap");
const clevertap = CleverTap.init(process.env.CLEVERTAP_ACCOUNT_ID, process.env.CLEVERTAP_ACCOUNT_PASSCODE);


Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('clevertaptest', function(req, res) {
    clevertap.profile({objectId:"_p4939050e69e5495b813c839e3f48a7e8", debug:1}).then((r) => {
        res.success(r);
    });
});

Parse.Cloud.define('push', function(req, res) {
    const channels = req.params.channels;

    if (!channels) {
        res.error("channels not present");
    }

    var payload = {
            "name": "test push " + Math.round(new Date().getTime()/1000),
            "when": "now",
            "where": {
                "event_name": "App Launched",
                "from": 20160101,
                "to": 20160630,
                "common_profile_prop": {
                    "profile_fields": [{"name": "channels", "value": channels}]
                }
            },
            "content": {
                "title":"Hello!",
                "body":"Just testing"
            },
            "devices": ["ios"]
    }

    clevertap.targets(clevertap.TARGET_CREATE, payload, {"debug":1}).then((r) => {
        res.success(r);
    });
});
