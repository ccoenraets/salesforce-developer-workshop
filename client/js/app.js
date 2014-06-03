// App code goes here

var apiVersion = 'v30.0',
    clientId = '3MVG9JZ_r.QzrS7jlKZCsA2sFBPYDfyDw.qEqXhqwTnPxFISIZ_VBlMw8VQin.RzVkC0I1yfqdndZ5.INXFk_',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = "http://localhost:3000/oauthcallback.html",
    proxyURL = 'http://localhost:3000/proxy/',
    client = new forcetk.Client(clientId, loginUrl, proxyURL);

function login() {
    var url = loginUrl + 'services/oauth2/authorize?display=popup&response_type=token' +
        '&client_id=' + encodeURIComponent(clientId) +
        '&redirect_uri=' + encodeURIComponent(redirectURI);
    window.open(url);
}

function oauthCallback(response) {
    if (response && response.access_token) {
        client.setSessionToken(response.access_token, apiVersion, response.instance_url);
        console.log('OAuth authentication succeeded');
        getSessions();
    } else {
        alert("AuthenticationError: No Token");
    }
}

function getSessions() {
    var soql = "SELECT Id, Name, Session_Date__c FROM Session__c",
        html = '';
    client.query(soql,
        function (data) {
            var sessions = data.records;
            for (var i=0; i<sessions.length; i++) {
                html += '<li class="table-view-cell"><a class="navigate-right">' + sessions[i].Name + '</a></li>';
            }
            $('.session-list').html(html);
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

login();
