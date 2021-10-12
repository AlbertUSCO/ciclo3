///Importar express
const express = require('express');
const app= express();
const serverRouter = require('./routers/serverRouter');
//Importar mongoose
const mongoose = require('mongoose');
//Importar url de conexión a la BD
const database = require('./database/db');
//Importar cors
const cors = require('cors');


const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./models/passport')(passport);
//middlewares 
app.use(morgan('dev'));
app.use(cookieParser());
//app.use(bodyParser.urlencoded({extended: false}));
app.use (session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize);
app.use(passport.session());
app.use(flash());

//routes 
require('./routers/routes')(app, passport);

class Server{
    //constructor
    constructor(){
        this.conectarBD();
        this.app = express();
        //Indicar el puerto por el que se ejecutará el servidor
        this.app.set('port', process.env.PORT || 3000);
        //Indicar que las solicitudes http se trabajará en JSON
        this.app.use(express.json());
        this.app.use(cors());
        /**
         * 
         * ******************Rutas**********************
         * 
         * ******/
        const router = express.Router();
        router.get('/', (req, res)=>{
            console.log("Nueva conexión");
            res.status(200).json({message: "Hola mundo!"});
        });
        const serverR = new serverRouter.default();
        
        //añadir las rutas al servidor
        this.app.use(serverR.router);
        this.app.use(router);
        //Levantar el servidor/correr el servidor
        this.app.listen(this.app.get('port'), ()=>{
            console.log("Servidor corriendo por el puerto => ", this.app.get('port'));
        });
    }

    conectarBD(){
        mongoose.connect(database.db).then(()=>{
            console.log("Conexión a BD con éxito");
        }).catch((err)=>{
            console.error("Error de conexión");
        });
    }
}

const objServer = new Server();