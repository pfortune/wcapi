
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

var port = (process.env.VMC_APP_PORT || 3001);
var host = (process.env.VCAP_APP_HOST || 'localhost');

// MongoDB

if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-1.8'][0]['credentials'];
} else {
  var mongo = {
    "hostname": "localhost",
    "port": 27017,
    "username": "",
    "password": "",
    "name": "",
    "db": "api"
  }
}

var generate_mongo_url = function(obj){
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'test');

  if(obj.username && obj.password){
    return "mongodb://" + obj.username + ":" 
                        + obj.password + "@" 
                        + obj.hostname + ":"
                        + obj.port + "/"
                        + obj.id;
  } else {
    return "mongodb://" + obj.hostname + ":" 
                        + obj.port + "/" 
                        + obj.db;
  }
}

var mongourl = generate_mongo_url(mongo);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({ secret: 'joLi45eZq2' }));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

// API Routes
// creates a location
app.post('/locations', function(req, res){
  require('mongodb').connect(mongourl, function(err, conn){
    conn.collection('locations', function(err, coll){
      coll.insert( req.body, {safe:true}, function(err){
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.end(JSON.stringify(req.body));
      });
    });
  });
 });

app.listen(port, host);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);