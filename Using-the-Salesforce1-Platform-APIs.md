---
layout: module
title: Module 10&#58; Using the Salesforce1 Platform APIs
---
In this module, you create an application that runs outside your Salesforce instance: it uses OAuth to authenticate with Salesforce, and the REST APIs to access Salesforce data.

![](images/api.jpg)

### Requirement

You need Node.js to perform the exercises this module. If you don't already have Node.js installed on your system, you can install it [here](http://nodejs.org/).

### Step 1: Create a Connected App

1. In Setup, click **Build** > **Create** > **Apps**

1. In the Connected Apps section, click **New**, and define the Connected App as follows:

    ![](images/connected-app.jpg)

1. Click **Save**.


### Step 2: Install the Supporting Files

1. Download and unzip [this file](https://github.com/ccoenraets/salesforce-developer-workshop/archive/master.zip), or clone [this repository](https://github.com/ccoenraets/salesforce-developer-workshop)

1. Using your favorite code editor, examine the code in **client/index.html**:
    - It provides the basic markup to render a list of sessions as shown in the screenshot above.
    - It uses the ratchet.css. [Ratchet](http://goratchet.com/) is a simple CSS toolkit that provides styles for mobile applications.
    - It uses [ForceTK](https://github.com/developerforce/Force.com-JavaScript-REST-Toolkit), the Force.com JavaScript REST Toolkit, to integrate with Salesforce. 
    - You will code the logic of the application (OAuth login) and data access logic in js/app.js which is empty at this time.  

1. Using your favorite code editor, examine the code in **client/oauthcallback.html**:
    
    At the end of the OAuth workflow, the Salesforce authentication process loads the redirect URI you specified in your Connected App and passes the access token and other OAuth values (server instance, refresh token, etc.) in the query string. Your redirect URI page simply needs to parse the query string, extract the access token and the other OAuth values, and pass that information back to your application by invoking the oauthCallback() function you will code in Step 4.    
    
1. Using your favorite code editor, examine the code in **server.js**. server.js implements a small HTTP server that provides two features:
    - Web server for static content. The document root for the web server is the client directory. 
    - Proxy for Salesforce REST requests. Because of the browser’s cross-origin restrictions, your JavaScript application hosted on your own server (or localhost) will not be able to make API calls directly to the *.salesforce.com domain. The solution is to proxy your API calls through your own server.

### Step 3: Start the Node.js server


1. Open Terminal (Mac) or a Command prompt (Windows)

1. Navigate to the **salesforce-developer-workshop** (or salesforce-developer-workshop-master) directory

1. Install the Node.js server dependencies:

  ```
  npm install
  ```

1. Start the server:  

  ```
  node server
  ```

1. Test the application. Open a browser and access the following URL:

  ```
  http://localhost:3000
  ```

  Since we didn't authenticate with Salesforce yet, all you should see at this point is an empty list of sessions.

### Step 4: Authenticate with Salesforce using OAuth

1. Using your favorite code editor, open **app.js** in **salesforce-developer-workshop/client/js**

1. Declare the following variables:

  ```
  var apiVersion = 'v30.0',
    clientId = 'YOUR_CONSUMER_KEY',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = 'http://localhost:3000/oauthcallback.html',
    proxyURL = 'http://localhost:3000/proxy/',
    client = new forcetk.Client(clientId, loginUrl, proxyURL);
  ```

1. In **Setup** (back in Salesforce), click **Build** > **Create** > **Apps**. In the **Connected Apps** section, click **MyConference**, and copy the **Consumer Key** to your clipboard.

1. In app.js, replace YOUR&#95;CONSUMER_KEY with the consumer key you copied to your clipboard

1. Declare a function named **login()** implemented as follows:

    ```
    function login() {
        var url = loginUrl + 'services/oauth2/authorize?display=popup&response_type=token'
                    + '&client_id=' + encodeURIComponent(clientId)
                    + '&redirect_uri=' + encodeURIComponent(redirectURI);
        window.open(url);
    }
    ```

1. Declare a function named **oauthCallback()** implemented as follows:

    ```
    function oauthCallback(response) {
        if (response && response.access_token) {
            client.setSessionToken(response.access_token, 
                                   apiVersion, 
                                   response.instance_url);
            console.log('OAuth authentication succeeded');
        } else {
            alert("AuthenticationError: No Token");
        }
    }
    ```
    
    > oauthCallback() is called by the oauthcallback.html page at the end of the OAuth workflow (see oauthcallback.html in step 2 for details).

1. Invoke the login() function as the last line of the app.js file:

  ```
  login();
  ```

1. Test the application
  - Open a browser and access http://localhost:3000
  - Login with your Developer Edition credentials
  - Open the browser console: you should see the **OAuth authentication succeeded** message


### Step 5: Using the REST APIs

1. In app.js, declare a function named **getSessions()** implemented as follows:

    ```
    function getSessions() {
        var soql = "SELECT Id, Name, Session_Date__c FROM Session__c",
            html = '';
        client.query(soql,
            function (data) {
                var sessions = data.records;
                for (var i=0; i<sessions.length; i++) {
                    html += '<li class="table-view-cell">' + sessions[i].Name + '</li>';
                }
                $('.session-list').html(html);
            },
            function (error) {
                alert("Error: " + JSON.stringify(error));
            });
        return false;
    }
    ```

1. Modify the oauthCallback() function to invoke getSessions() when the user has been successfully authenticated.

  ```
  console.log('OAuth authentication succeeded');
  getSessions();
  ```

1. Test the application

  - Open a browser and access http://localhost:3000
  - Login with your Developer Edition credentials
  - You should now see the list of sessions
