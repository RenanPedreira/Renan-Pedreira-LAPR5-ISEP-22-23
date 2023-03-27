import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  //Schemas
  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };
  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };
  const camiaoSchema = {
    name: 'camiaoSchema',
    schema: '../persistence/schemas/camiaoSchema',
  };
  const rotaSchema = {
    name: 'rotaSchema',
    schema: '../persistence/schemas/rotaSchema',
  };
  const empacotamentoSchema = {
    name: 'empacotamentoSchema',
    schema: '../persistence/schemas/empacotamentoSchema',
  };
  const planoSchema = {
    name: 'planoSchema',
    schema: '../persistence/schemas/planoSchema',
  };

  //Controllers
  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  };
  const camiaoController = {
    name: config.controllers.camiao.name,
    path: config.controllers.camiao.path
  };
  const rotaController = {
    name: config.controllers.rota.name,
    path: config.controllers.rota.path
  };
  const empacotamentoController = {
    name: config.controllers.empacotamento.name,
    path: config.controllers.empacotamento.path
  };
  const planoController = {
    name: config.controllers.plano.name,
    path: config.controllers.plano.path
  };

  //Repos
  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  };
  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  };
  const camiaoRepo = {
    name: config.repos.camiao.name,
    path: config.repos.camiao.path
  };
  const rotaRepo = {
    name: config.repos.rota.name,
    path: config.repos.rota.path
  };
  const empacotamentoRepo = {
    name: config.repos.empacotamento.name,
    path: config.repos.empacotamento.path
  };
  const planoRepo = {
    name: config.repos.plano.name,
    path: config.repos.plano.path
  };

  //Services
  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  };
  const camiaoService = {
    name: config.services.camiao.name,
    path: config.services.camiao.path
  };
  const rotaService = {
    name: config.services.rota.name,
    path: config.services.rota.path
  };
  const empacotamentoService = {
    name: config.services.empacotamento.name,
    path: config.services.empacotamento.path
  };
  const planoService = {
    name: config.services.plano.name,
    path: config.services.plano.path
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      camiaoSchema,
      rotaSchema,
      empacotamentoSchema,
      planoSchema
    ],
    controllers: [
      roleController,
      camiaoController,
      rotaController,
      empacotamentoController,
      planoController
    ],
    repos: [
      roleRepo,
      userRepo,
      camiaoRepo,
      rotaRepo,
      empacotamentoRepo,
      planoRepo
    ],
    services: [
      roleService,
      camiaoService,
      rotaService,
      empacotamentoService,
      planoService
    ]
    
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};