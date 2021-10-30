const path = require('path');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const {Articles, Comments, Users} = require('./models');
const session = reqiure('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Express setup
const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars setup
const handlebars = expressHandlebars.create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Session setup
const sessionConfig = {
    secret: 'cancancanyoudothecancan',
    cookie: {},
    resave: false,
    saveUnititialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sessionConfig));

// Express configurations
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// Sync database server for testing, then start the express server
sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}); 