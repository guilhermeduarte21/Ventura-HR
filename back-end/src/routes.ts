import { Router } from 'express';
import { CreateEmpresaController } from './modules/empresas/useCases/createEmpresa/CreateEmpresaController';
import { CreateCandidatoController } from './modules/candidatos/useCases/createCandidato/CreateCandidatoController';
import { CreateVagaController } from './modules/vagas/useCases/createVaga/CreateVagaController';
import { FindAllVagasController } from './modules/vagas/useCases/findAllVagas/FindAllVagasController';
import { FindVagaByIdController } from './modules/vagas/useCases/findVagaById/FindVagaByIdController';
import { AuthenticateController } from './modules/account/authenticate/AuthenticateController';
import { GetUsuarioAutenticadoController } from './modules/usuario/useCases/getUsuarioAutenticado/GetUsuarioAutenticadoController';
import { ensureAuthenticate } from './middlewares/ensureAuthenticate';
import { CreateAdminController } from './modules/usuario/useCases/createAdmin/CreateAdminController';
import { FindAllEmpresasController } from './modules/empresas/useCases/findAllEmpresas/FindAllEmpresasController';
import { FindAllCandidatosController } from './modules/candidatos/useCases/findAllCandidatos/FindAllCandidatosController';
import { FindUsuarioByIdController } from './modules/usuario/useCases/findUsuarioById/FindUsuarioByIdController';
import { UpdateUsuarioController } from './modules/usuario/useCases/updateUsuario/UpdateUsuarioController';
import { FindUserEmpresaByIdController } from './modules/empresas/useCases/findUserEmpresaById/FindUserEmpresaByIdController';
import { FindVagasEmpresaController } from './modules/vagas/useCases/findVagasEmpresa/FindVagasEmpresaController';
import { UpdateVagaController } from './modules/vagas/useCases/updateVaga/UpdateVagaController';

const routes = Router();

const authenticateController = new AuthenticateController();
const getUsuarioAutenticadoController = new GetUsuarioAutenticadoController();
const findUsuarioByIdController = new FindUsuarioByIdController();
const updateUsuarioController = new UpdateUsuarioController();

const createEmpresaController = new CreateEmpresaController();
const findAllEmpresasController = new FindAllEmpresasController();
const findUserEmpresaByIdController = new FindUserEmpresaByIdController();

const createAdminController = new CreateAdminController();

const createCandidatoController = new CreateCandidatoController();
const findAllCandidatosController = new FindAllCandidatosController();

const createVagaController = new CreateVagaController();
const findAllVagasController = new FindAllVagasController();
const findVagaByIdController = new FindVagaByIdController();
const findVagasEmpresaController = new FindVagasEmpresaController();
const updateVagaController = new UpdateVagaController();

//---AUTENTICACAO---//
routes.post('/authenticate/', authenticateController.handle);

//---USUARIO---//
routes.get(
  '/usuario-autenticado',
  ensureAuthenticate,
  getUsuarioAutenticadoController.handle,
);
routes.get(
  '/usuario/:id',
  ensureAuthenticate,
  findUsuarioByIdController.handle,
);
routes.put('/usuario/:id', ensureAuthenticate, updateUsuarioController.handle);

//---ADMIN---//
routes.post('/admin/', createAdminController.handle);

//---EMPRESAS---//
routes.post('/empresas/', ensureAuthenticate, createEmpresaController.handle);
routes.get('/empresas/', ensureAuthenticate, findAllEmpresasController.handle);
routes.get(
  '/empresas/:id',
  ensureAuthenticate,
  findUserEmpresaByIdController.handle,
);

//---CANDIDATOS---//
routes.post('/candidatos/', createCandidatoController.handle);
routes.get(
  '/candidatos/',
  ensureAuthenticate,
  findAllCandidatosController.handle,
);

//---VAGAS---//
routes.post('/vagas/', ensureAuthenticate, createVagaController.handle);
routes.get('/vagas/', findAllVagasController.handle);
routes.get('/vaga/:id', findVagaByIdController.handle);
routes.get('/vagas/:id', ensureAuthenticate, findVagasEmpresaController.handle);
routes.put('/vaga/:id', ensureAuthenticate, updateVagaController.handle);

export { routes };
