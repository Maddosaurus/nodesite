var express      = require('express');
	nodeSite	 = require('./routes/nodesite');
	mongoFunc	 = require('./routes/mongofunc');
	path		 = require('path');
	app          = express();

app.configure(function(){
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.bodyParser());
}); 

app.post('/user/create', mongoFunc.saveUser);
app.get('/user/:email', mongoFunc.readUser);

app.listen(64742);
console.log('Listening on port 64742...');