var express = require('express');
var app = express();  

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load singe page front end
});

app.listen(8000);
console.log("App listening on port 8000");