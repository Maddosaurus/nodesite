/* 
fs = require('fs');

exports.showIndex = function(req, res) {
	console.dir("showIndex...");
	req.setEncoding('utf8');
	console.dir("req.params: " + req.params);

	fs.readFile('public/index.html', function (err, html) {
    if (err) {
        throw err;
    }

    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
 });

}

*/