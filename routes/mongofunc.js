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