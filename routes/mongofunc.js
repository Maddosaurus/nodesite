//determine host system ip
var sysip;
var os=require('os');
var ifaces=os.networkInterfaces();
for (var dev in ifaces) {
	var alias=0;
	ifaces[dev].forEach(function(details){
		if (details.family=='IPv4' & details.internal==false) {
			sysip = details.address;
			++alias;
		}
	});
}

//var userDbUrl = "192.168.1.119/nodeDB"; // "username:password@example.com/mydb"
var userDbUrl = sysip + "/nodeDB";
var ucollections = ["users"];
var udb = require("mongojs").connect(userDbUrl, ucollections);

//var gridDbUrl = "192.168.1.119/grDB";
var gridDbUrl  = sysip + "/grDB";
var gcollections = ["fs.files"];
var gdb = require("mongojs").connect(gridDbUrl, gcollections);

exports.saveUser = function(req, res) {
	udb.users.save({email: req.body.email, password: req.body.password, sex: "male"}, function(err, saved) {
		if( err || !saved ) {
			console.log("User not saved");
		} else {
			console.log("User saved");
			res.send("User saved!");
		}
		});
}

exports.readUser = function(req,res) {
	udb.users.find({email: req.params.email}, function(err, users) {
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

exports.getFilelist = function(req, res) {
	var tupel;
	var ret = new Array();

	gdb.fs.files.find({ uploadDate : { $gte : new Date(req.params.from *1000), $lte : new Date(req.params.to *1000) } }, function(err, data) {
		if(err || !data) {
			console.log("No data found with date between " + req.from + " and " + req.to);
		} else {
			data.forEach( function(foundData) {
				//console.dir(foundData.filename);

				tupel = new Array();
				tupel.push(foundData._id);
				tupel.push(foundData.filename);
			
				ret.push(tupel);
			});

			res.send(ret);

			delete ret;
			delete tupel;
		}
	});

}

//{created_on: {$gte: start, $lt: end}});