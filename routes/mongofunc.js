var databaseUrl = "192.168.1.119/nodeDB"; // "username:password@example.com/mydb"
var collections = ["users"]
var db = require("mongojs").connect(databaseUrl, collections);

exports.saveUser = function(req, res) {
	db.users.save({email: req.body.email, password: req.body.password, sex: "male"}, function(err, saved) {
		if( err || !saved ) {
			console.log("User not saved");
		} else {
			console.log("User saved");
			res.send("User saved!");
		}
		});
}

exports.readUser = function(req,res) {
db.users.find({email: req.params.email}, function(err, users) {
	if( err || !users) {
		console.log("No user(s) with mail " + email + " found");
	} else {
		// TODO: If result > 1 --> failure
		users.forEach( function(foundUsers) {
			console.log(foundUsers);
			res.send(foundUsers);
		});
	}
});

}