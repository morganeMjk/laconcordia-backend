const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3032;
const sequelize = require('./config/database.config');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static('public/images'));

app.use('/album', require('./src/routes/album.routes'));
app.use('/event', require('./src/routes/event.routes'));
app.use('/instrument', require('./src/routes/instrument.routes'));
app.use('/media', require('./src/routes/media.routes'));
app.use('/message', require('./src/routes/message.routes'));
app.use('/news', require('./src/routes/news.routes'));
app.use('/role', require('./src/routes/role.routes'));
app.use('/sheet', require('./src/routes/sheet.routes'));
app.use('/status', require('./src/routes/status.routes'));
app.use('/user-instrument', require('./src/routes/user-instrument.routes'));
app.use('/sheet', require('./src/routes/sheet.routes'));
app.use('/status', require('./src/routes/status.routes'));
app.use('/user-instrument', require('./src/routes/user-instrument.routes'));
app.use('/user-role', require('./src/routes/user-role.routes'));
app.use('/user-status', require('./src/routes/user-status.routes'));
app.use('/user', require('./src/routes/user.routes'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Example app listening at http://localhost:${port}`);
    } catch (error) {
        console.log('Unable to connect to the database', error);
    }
});