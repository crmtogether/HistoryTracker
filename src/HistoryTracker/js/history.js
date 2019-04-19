///////////////////////////////////////////////////////////////
/////////Requires Accelerator for Sage CRM
///////////////////////////////////////////////////////////////
//This updates the search history that Accelerator uses
///////////////////////////////////////////////////////////////
console.log('Loading js/history.js');
crm.ready(function()
{

  setTimeout(function(){ __addToSearchHistory(); }, 1000);

});

function __addToSearchHistory() {
    console.log('__addToSearchHistory');
    var _RecentValue = crm.url({ arg: 'RecentValue' });
    var __Key0 = "";
    var __Key0id = "";
    if (!_RecentValue) {
        __Key0 = crm.url({ arg: 'Key0' });
        __Key0id = crm.url({ arg: 'Key' + __Key0 });
    } else {
        var _RecentValueArr = _RecentValue.split("X");
        __Key0 = _RecentValueArr[1];
        __Key0id = _RecentValueArr[2];
    }
    console.log('__addToSearchHistory __Key0:' + __Key0);
    console.log('__addToSearchHistory __Key0id:' + __Key0id);
    var Entity = _getEntityFromKey(__Key0);
    if (Entity == "") {
        return;
    }
    if ((__Key0id == "") || (__Key0id == "-1")) {
        return;
    }
    var _postdata = "Entity=" + Entity;
    _postdata += "&EntityId=" + __Key0id;
	__url=crm.url("HistoryTracker/update.asp");
    _makePostRequest(__url, _postdata, __addToSearchHistory_callback);
}

function __addToSearchHistory_callback(requestresult, postdata) {
    console.log('__addToMySearchHistory_callback:' + requestresult);
}
function _getEntityFromKey(_key) {
    var res = "";
    console.log('_getEntityFromKey:' + _key);
    switch (_key) {
        case "1":
            res = "company";
            break;
        case "58":
            res = "custom";
            break;
        case "2":
            res = "person";
            break;
        case "8":
            res = "cases";
            break;
        case "44":
            res = "lead";
            break;
        case "86":
            res = "quotes";
            break;
        case "71":
            res = "orders";
            break;
        case "68":
            res = "solutions";
            break;
        case "7":
            res = "opportunity";
            break;
    }
    console.log('_getEntityFromKey res:' + res);
    return res;
}

function __GetKeys() {
    var res = "";
    try {
        res = GetKeys();
    } catch (e) { }

    return res;
}

function _makePostRequest(__url, postdata, callback) {
    $.ajax({
        type: "post",
        url: __url,
        dataType: "text",
        data: postdata,
        async: true,
        crossDomain: true,
        beforeSend: function () {
        },
        timeout: 100000,
        error: function (request, error, status) {
            console.log('Request Data:' + postdata);
            console.log("ERROR: " + error + "\nStatus:" + status + "\nData:" + request.responseText);
        },
        success: function (requestresult) {
            callback(requestresult, postdata);
        } // End success
    }); // End ajax method
}
