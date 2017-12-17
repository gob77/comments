let gzippo = require("gzippo");
let express = require("express");
let app = express();

app.use(gzippo.staticGzip('' + __dirname + '/dist'));
app.listen(process.env.PORT || 5000);