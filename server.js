var express      = require('express');
	mongoFunc	 = require('./routes/mongofunc');
	path		 = require('path');
	app          = express();

app.configure(function(){
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.bodyParser());
}); 

app.get('/cam/:from/:to', mongoFunc.getFilelist);

app.listen(64742);
console.log('Listening on port 64742...');