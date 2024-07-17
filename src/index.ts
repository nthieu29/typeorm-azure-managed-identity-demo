import "reflect-metadata";
import {DataSource} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import {User} from "./entity/User";
import 'dotenv/config';

const port = process.env.PORT || 3000;

const appDataSource = new DataSource({
    type: "mssql",
    host: process.env.AZURE_SQL_SERVER, // Use environment variable for host
    database: process.env.AZURE_SQL_DATABASE, // Use environment variable for database
    synchronize: true,
    logging: true,
    entities: [User],
    options: {
        encrypt: true,
        trustServerCertificate: false
    },
    extra: {
        authentication: {
            type: 'azure-active-directory-default'
        }
    }
});

appDataSource.initialize().then(() => {
    const userRepository = appDataSource.getRepository(User);

    const app = express();
    app.use(express.json());

    app.get('/users', async (req: Request, res: Response) => {
        const users = await userRepository.find();
        res.json(users);
    });

    app.post('/users', async (req: Request, res: Response) => {
        const user = userRepository.create(req.body);
        await userRepository.save(user);
        res.status(201).send(user);
    });

    app.put('/users/:id', async (req: Request, res: Response) => {
        const user = await userRepository.findOneBy({id: parseInt(req.params.id)});
        if (user) {
            userRepository.merge(user, req.body);
            await userRepository.save(user);
            res.send(user);
        } else {
            res.status(404).send("User not found");
        }
    });

    app.delete('/users/:id', async (req: Request, res: Response) => {
        const result = await userRepository.delete(req.params.id);
        res.send(result);
    });

    app.listen(port, () => {
        console.log("Server started on port" + port);
    });
}).catch(error => {
    console.error("Error during Data Source initialization", error);
});
