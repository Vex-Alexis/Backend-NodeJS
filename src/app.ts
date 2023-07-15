import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'

//Routes
import IndexRoutes from './routes/index.routes'
import ApiRoutes from './routes/api.routes'
import DoctorRoutes from './routes/doctores.routes'
import patientRoutes from './routes/pacientes.routes'
import quoteRoutes from './routes/citas.routes'
import specialtyRoutes from './routes/especialidades.routes'


export class App {

    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000 )
    }

    middlewares(){
        this.app.use(morgan('dev'))
        this.app.use(cors())
        // this.app.use(express.urlencoded({extended: false})); recibir datos de formularios
        this.app.use(express.json());
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/api', ApiRoutes);
        this.app.use('/api/v1/doctors', DoctorRoutes);
        this.app.use('/api/v1/patients', patientRoutes);
        this.app.use('/api/v1/quote', quoteRoutes);
        this.app.use('/api/v1/specialty', specialtyRoutes);
        
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
        
    }
}