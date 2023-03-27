/* eslint-disable prettier/prettier */
import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import camiao from './routes/camiaoRoute';
import rota from './routes/rotaRoute';
import empacotamento from './routes/empacotamentoRoute';
import plano from './routes/planoRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	camiao(app);
	rota(app);
	empacotamento(app);
	plano(app);
	
	return app
}