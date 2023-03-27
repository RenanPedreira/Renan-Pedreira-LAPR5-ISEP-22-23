/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3001,

  /**
   * That long string from mlab
   */
  //databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/monsus",
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:e13f44451c1c521f7c6ad594@vsgate-s1.dei.isep.ipp.pt:11017/admin",
  
  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    camiao: {
      name: "CamiaoController",
      path: "../controllers/camiaoController"
    },
    rota: {
      name: "RotaController",
      path: "../controllers/rotaController"
    },
    empacotamento: {
      name: "EmpacotamentoController",
      path: "../controllers/empacotamentoController"
    },
    plano: {
      name: "PlanoController",
      path: "../controllers/planoController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    camiao: {
      name: "CamiaoRepo",
      path: "../repos/camiaoRepo"
    },
    rota: {
      name: "RotaRepo",
      path: "../repos/rotaRepo"
    },
    empacotamento: {
      name: "EmpacotamentoRepo",
      path: "../repos/empacotamentoRepo"
    },
    plano: {
      name: "PlanoRepo",
      path: "../repos/planoRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    camiao: {
      name: "CamiaoService",
      path: "../services/camiaoService"
    },
    rota: {
      name: "RotaService",
      path: "../services/rotaService"
    },
    empacotamento: {
      name: "EmpacotamentoService",
      path: "../services/empacotamentoService"
    },
    plano: {
      name: "PlanoService",
      path: "../services/planoService"
    }
  },
};
