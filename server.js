var express = require('express'),
    http = require('http'),
    path = require('path'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    request = require('request'),
    app = express();

app.use(bodyParser());          // pull information from html in POST
app.use(methodOverride());      // simulate DELETE and PUT

app.use(express.static(__dirname + '/client'));

app.all('/proxy', function(req, res) {
    var url = req.header('SalesforceProxy-Endpoint');
    console.log("proxying: " + url);
    request({ url: url, method: req.method, json: req.body, headers: {'Authorization': req.header('X-Authorization')} }).pipe(res);
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});