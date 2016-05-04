var express = require('express'),
	app = express();

app.set('port', process.env.PORT || 3500);
app.set('views', __dirname + '/app/');

var router = new express.Router();

router.get('/', function(req, res) {
	res.sendFile(app.get('views') + 'index.html');
});

app.use('/', router);
app.use(express.static(app.get('views')));
app.use(express.static(__dirname));

var server = app.listen(app.get('port'), function() {
	console.log('Server up: http://localhost:' + app.get('port'));
});