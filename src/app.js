const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

require('dotenv').config();

require('./database/database');

const webRoutes = require('./routes/web.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const PORT = process.env.PORT;

// Views config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// App config
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/', webRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 