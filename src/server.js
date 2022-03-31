const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const colors = require('colors');
const hbs = require('express-handlebars');

const { dbConectionMongo } = require('./db/mongo');
const DB = require('./db/postgres');

class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = express();
        this.Server = require('http').createServer(this.app);

        this.midelwares();

        //routes
        this.users = '/user';
        this.routes();
        this.databases();

    }

    async databases() {
        await dbConectionMongo();
        const postgres = new DB();
    }


    routes() {
        this.app.use(this.users, require('./routes/user.routes'));

        this.app.get('/', (req, res) => {
            res.render('index');
        });

        //configurate 404
        this.app.use((req, res, next) => {
            res.status(404).send('404 Not Found');
        });
    }



    midelwares() {
        this.app.use(cors());
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, 'public')));

        console.log(path.join(__dirname, 'public'));

        this.app.engine('.hbs', hbs.engine({
            defaultLayout: 'default',
            extname: '.hbs',
            layoutsDir: path.join(__dirname, 'views', 'layouts'),
            partialsDir: path.join(__dirname, 'views', 'partials')
        }));

        this.app.set('view engine', '.hbs');
        this.app.set('views', path.join(__dirname, 'views'));

    }



    launcher() {
        this.Server.listen(this.port, () => {
            console.log(`Server listening on port http://localhost:${this.port}`.blue);
        });
    }

}

module.exports = Server;
