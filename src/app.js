const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser')

require('dotenv').config();

require('./database/database');

const webRoutes = require('./routes/web.routes');
const employeeRoutes = require('./routes/employee.routes');
const categoryRoutes = require('./routes/category.routes');
const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');
const noticeRoutes = require('./routes/notice.routes');
const testimonialRoutes = require('./routes/testimonial.routes')

const app = express();
const PORT = process.env.PORT;

// Views config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// App config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

app.use('/', webRoutes);
app.use('/admin/funcionarios?', employeeRoutes)
app.use('/admin/categorias?', categoryRoutes)
app.use('/admin/usuarios?', userRoutes)
app.use('/admin/cursos?', courseRoutes)
app.use('/admin/noticias?', noticeRoutes)
app.use('/admin/depoimentos?', testimonialRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 