var express = require('express'),
    compression = require('compression'),
    app = express();

app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'));