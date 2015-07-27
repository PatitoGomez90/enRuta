var indexController = require('./controllers/cIndex');
var usuarioController = require('./controllers/cUsuario');
var adminController = require('./controllers/cAdmin');
var empleController = require('./controllers/cEmple');
var accesosController = require('./controllers/cAccesos');
var cargoController = require('./controllers/cCargos');
var umedController = require('./controllers/cUmed');
var sectoresController = require('./controllers/cSectores');
var maqController = require('./controllers/cMaquinarias');
var familiaController = require('./controllers/cFamilia');
var artController = require('./controllers/cArticulos');
var valesController = require('./controllers/cVale');
var test = require('./controllers/cTest');
var chk1Controller = require('./controllers/cChk1');
var chk2Controller = require('./controllers/cChk2');
var mEventos = require('./models/mEventos');
var otController = require('./controllers/cOt');
var equipoController = require('./controllers/cEquipos');
var tipoequipoController = require('./controllers/cTipoEquipo');
var etiquetaController = require('./controllers/cEtiquetas');
var tipotareaController = require('./controllers/cTipoTarea');
var modelom1Controller = require('./controllers/cModeloMantenimiento');
var modelom2Controller = require('./controllers/cModeloMantenimientoDetalle');
var itemsController = require('./controllers/cItems');
var tipohoraController = require('./controllers/cTipoHora');
var codigohoraController = require('./controllers/cCodigoHora');
var relojesController = require('./controllers/cRelojes');
var lugaresController = require('./controllers/cLugares');
var clasificacionController = require('./controllers/cClasificacion');
var imputaController = require('./controllers/cImputacion');
var partediario1Controller = require('./controllers/cPartediario1');
var partediario2Controller = require('./controllers/cPartediario2');
var fichadasController = require('./controllers/cFichadas');
var categoriaController = require('./controllers/cCategorias');

var pruebasqlController = require('./controllers/cPruebaSQL');
var randomController = require('./controllers/cRandom');

function logout (req, res) {
	fecha = new Date();
	day = fecha.getDate();
	month = fecha.getMonth();
	if (day<10)
		day = "0" + day;
	if (month<10)
		month = "0" + month;
	fecha = fecha.getFullYear() + "/"+month+"/"+day+" "+fecha.getHours()+":"+fecha.getMinutes()
	mEventos.add(req.session.user.unica, fecha, "Logout", "", function(){
	});
	req.session = null;
	return res.redirect('/');
}

// Verifica que este logueado
function auth (req, res, next) {
	if (req.session.auth) {
		return next();
	} else {
		res.redirect('/')
	}
}

module.exports = function(app) {
	app.get('/', adminController.getLogin);
	app.get('/login', adminController.getLogin)
	app.post('/login', adminController.postLogin);
	app.get('/logout', logout);
	app.get('/inicio', auth, indexController.getInicio);
	app.get('/error', indexController.getError);
	//ayuda
	app.get('/ayuda', indexController.getAyuda);
	app.get('/ayudaver/:id', indexController.AyudaVer);
	//novedades
	app.get('/listanovedades', indexController.getNovedades);
	//usuarios
	app.get('/usuarioslista', auth, usuarioController.getUsuarios);
	app.get('/usuariosalta', auth, usuarioController.getUsuariosAlta);
	app.post('/usuariosalta', auth, usuarioController.putUsuario);
	app.get('/usuariosmodificar/:id', auth, usuarioController.getUsuarioModificar);
	app.post('/usuariosmodificar', auth, usuarioController.postUsuarioModificar);
	app.get('/usuariosborrar/:id', auth, usuarioController.getDelUsuario);
	//configurar accesos
	app.get('/accesoslista/:id', auth, accesosController.getAccesos);
	app.post('/accesoslista', auth, accesosController.postAccesos);
	//empleados
	app.get('/emplelista', auth, empleController.getEmpleados);
	app.get('/emplealta', auth, empleController.getAlta);
	app.post('/emplealta', auth, empleController.postAlta);
	app.get('/emplemodificar/:codigo', auth, empleController.getModificar);
	app.post('/emplemodificar', auth, empleController.postModificar);
	app.get('/empleborrar/:codigo', auth, empleController.getDelEmple);
	app.get('/emplever/:codigo', auth, empleController.getVer);
	app.get('/getallemple', auth, empleController.getAllEmple);
	//cargos de empleados
	app.get('/cargoslista', auth, cargoController.getAllCargos);
	app.get('/cargosalta', auth, cargoController.getAlta);
	app.post('/cargosalta', auth, cargoController.postAlta);
	app.get('/cargosmodificar/:id', auth, cargoController.getModificar);
	app.post('/cargosmodificar', auth, cargoController.postModificar);
	app.get('/cargosborrar/:id', auth, cargoController.getDelCargo);
	//unidades de medida "umed"
	app.get('/umedlista', auth, umedController.getAllUmed);
	app.get('/umedalta', auth, umedController.getAlta);
	app.post('/umedalta', auth, umedController.postAlta);
	app.get('/umedmodificar/:id', auth, umedController.getModificar);
	app.post('/umedactualizar', auth, umedController.postModificar);
	app.get('/umedborrar/:id', auth, umedController.getDelUmed);
	//sectores
	app.get('/sectoreslista', auth, sectoresController.getAll);
	app.get('/sectoresalta', auth, sectoresController.getAlta);
	app.post('/sectoresalta', auth, sectoresController.postAlta);
	app.get('/sectoresmodificar/:id', auth, sectoresController.getModificar);
	app.post('/sectoresmodificar', auth, sectoresController.postModificar);
	app.get('/sectoresborrar/:id', auth, sectoresController.getDel);
	//maquinarias abm
	app.get('/maqlista', auth, maqController.getAll);
	app.get('/maqalta', auth, maqController.getAlta);
	app.post('/maqalta', auth, maqController.postAlta);
	app.get('/maqver/:id', auth, maqController.getVer);
	app.get('/maqmodificar/:id', auth, maqController.getModificar);
	app.post('/maqmodificar', auth, maqController.postModificar);
	app.get('/maqborrar/:id', auth, maqController.getDel);
	//equipos/vehiculos abm
	app.get('/equipolista', auth, equipoController.getAll);
	app.get('/equipoalta', auth, equipoController.getAlta);
	app.post('/equipoalta', auth, equipoController.postAlta);
	app.get('/equipomodificar/:id', auth, equipoController.getModificar);
	app.post('/equipomodificar', auth, equipoController.postModificar);
	app.get('/equipoborrar/:id', auth, equipoController.getDel);
	app.get('/equipover/:id', auth, equipoController.getVer);
	//Familia de articulos
	app.get('/familialista', auth, familiaController.getAll);
	app.get('/familiaalta', auth, familiaController.getAlta);
	app.post('/familiaalta', auth, familiaController.postAlta);
	app.get('/familiamodificar/:id', auth, familiaController.getModificar);
	app.post('/familiamodificar', auth, familiaController.postModificar);
	app.get('/familiaborrar/:id', auth, familiaController.getDel);
	//Articulos
	app.get('/articulosalta', auth, artController.getAlta);
	app.post('/articulosalta', auth, artController.postAlta);
	app.get('/articulosconsulta', auth, artController.getConsulta);
	app.get('/articulosver/:id', auth, artController.getVerArt);
	app.get('/articulosmodificar/:id', auth, artController.getModificar);
	app.post('/articulosmodificar', auth, artController.postModificar);
	app.get('/articulosborrar/:id', auth, artController.getDel); 
	app.get('/:idart/costou', auth, artController.getCostou);
	app.get('/buscarart/:columna/:busqueda', auth, artController.getBuscar);
	app.get('/buscarartpornombre/:columna/:busqueda', auth, artController.getBuscarPorNombre);
	app.get('/getartporcdfabrica/:cdfabrica', auth, artController.getArtporCdFabrica2);
		//etiquetas
	app.get('/addartaetiquetas/:id', auth, etiquetaController.addArt);
	app.get('/articulosimprimir', auth, etiquetaController.getImprimir);
	app.get('/articulosimprimirlimpiar', auth, etiquetaController.getListaImpresion);
		//get borrar fila
	app.get('/articulosimmprimirborrarfila/:id', auth, etiquetaController.getBorrarFila);
		//get borrar todo
	app.get('/articulosimprimirborrartodo', auth, etiquetaController.getBorrarTodo);
	//VALES
	app.get('/valesalta', auth, valesController.getAlta);
	app.post('/valesalta', auth, valesController.postAlta);
	app.get('/valesconsulta', auth, valesController.getConsulta);
	app.get('/buscarvales/:finicio/:ffin/:sector', auth, valesController.getVales);
	app.get('/valesver/:id', auth, valesController.getVerVales);
	app.get('/valesborrar/:id', auth, valesController.getDel);
	app.get('/getayudaporid/:id', auth, valesController.getAyuda);
	app.post('/printselection', auth, valesController.getPrintSelection);
	//prueba xls to json
	app.get('/test', auth, test.getTest);
	//checklist 1 02/07/2015-> ahora se llama Modelo de Checklist [ABM]
	app.get('/chk1lista', auth, chk1Controller.getLista);
	app.get('/chk1alta', auth, chk1Controller.getAlta);
	app.post('/chk1alta', auth, chk1Controller.postAlta);
	//checklist 2
	app.get('/chk2lista/:id', auth, chk2Controller.getLista);
	app.get('/chk2alta/:id', auth, chk2Controller.getAlta);
	app.post('/chk2alta', auth, chk2Controller.postAlta);
	app.get('/chk2modificar/:id', auth, chk2Controller.getModificar);
	app.post('/chk2modificar', auth, chk2Controller.postModificar);
	app.get('/chk2borrar/:id', auth, chk2Controller.getDel);
	//ot
	app.get('/otlista', auth, otController.getLista);
	app.get('/otalta', auth, otController.getAlta);
	app.post('/otalta', auth, otController.postAlta);
	app.get('/otmodificar/:id', auth, otController.getModificar);
	app.post('/otmodificar', auth, otController.postModificar);
	//tipo equipos
	app.get('/tipoequipolista', auth, tipoequipoController.getAll);
	app.get('/tipoequipoalta', auth, tipoequipoController.getAlta);
	app.post('/tipoequipoalta', auth, tipoequipoController.postAlta);
	app.get('/tipoequipomodificar/:id', auth, tipoequipoController.getModificar);
	app.post('/tipoequipomodificar', auth, tipoequipoController.postModificar);
	app.get('/tipoequipoborrar/:id', auth, tipoequipoController.getDel);
	//tipo tarea
	app.get('/tipotarealista', auth, tipotareaController.getLista);
	app.get('/tipotareaalta', auth, tipotareaController.getAlta);
	app.post('/tipotareaalta', auth, tipotareaController.postAlta);
	app.get('/tipotareamodificar/:id', auth, tipotareaController.getModificar);
	app.post('/tipotareamodificar', auth, tipotareaController.postModificar);
	app.get('/tipotareaborrar/:id', auth, tipotareaController.getDel);
	//modelo m1
	app.get('/modelomantenimientolista', auth, modelom1Controller.getLista);
	app.get('/modelomantenimientoalta', auth, modelom1Controller.getAlta);
	app.post('/modelomantenimientoalta', auth, modelom1Controller.postAlta);
	app.get('/modelomantenimientomodificar/:id', auth, modelom1Controller.getModificar);
	app.post('/modelomantenimientomodificar', auth, modelom1Controller.postModificar);
	app.get('/modelomantenimientoborrar/:id', auth, modelom1Controller.getDel);
	//modelo m2
	app.get('/modelodetallelista/:id', auth, modelom2Controller.getLista);
	app.get('/modelodetallealta/:id', auth, modelom2Controller.getAlta);
	app.post('/modelodetallealta', auth, modelom2Controller.postAlta);
	app.get('/modelodetallemodificar/:id', auth, modelom2Controller.getModificar);
	app.post('/modelodetallemodificar', auth, modelom2Controller.postModificar);
	app.get('/modelodetalleborrar/:idm1/:idm2', auth, modelom2Controller.getDel);
	app.get('/modelodetallerepuestover/:id', auth, modelom2Controller.getVerRepuestos);
	//items de trabajo
	app.get('/itemslista', auth, itemsController.getLista);
	app.get('/itemsalta', auth, itemsController.getAlta);
	app.post('/itemsalta', auth, itemsController.postAlta);
	app.get('/itemsmodificar/:id', auth, itemsController.getModificar);
	app.post('/itemsmodificar', auth, itemsController.postModificar);
	app.get('/itemsborrar/:id', auth, itemsController.getDel);
	//tipos de hora
	app.get('/tipohoralista', auth, tipohoraController.getLista);
	app.get('/tipohoraalta', auth, tipohoraController.getAlta);
	app.post('/tipohoraalta', auth, tipohoraController.postAlta);
	app.get('/tipohoramodificar/:id', auth, tipohoraController.getModificar);
	app.post('/tipohoramodificar', auth, tipohoraController.postModificar);
	app.get('/tipohoraborrar/:id', auth, tipohoraController.getDel);
	//codigo de hora
	app.get('/codigohoralista', auth, codigohoraController.getLista);
	app.get('/codigohoraalta', auth, codigohoraController.getAlta);
	app.post('/codigohoraalta', auth, codigohoraController.postAlta);
	app.get('/codigohoramodificar/:id', auth, codigohoraController.getModificar);
	app.post('/codigohoramodificar', auth, codigohoraController.postModificar);
	app.get('/codigohoraborrar/:id', auth, codigohoraController.getDel);
	//relojes
	app.get('/relojeslista', auth, relojesController.getLista);
	app.get('/relojesalta', auth, relojesController.getAlta);
	app.post('/relojesalta', auth, relojesController.postAlta);
	app.get('/relojesmodificar/:id', auth, relojesController.getModificar);
	app.post('/relojesmodificar', auth, relojesController.postModificar);
	app.get('/relojesborrar/:id', auth, relojesController.getDel);
	//lugares
	app.get('/lugareslista', auth, lugaresController.getLista);
	app.get('/lugaresalta', auth, lugaresController.getAlta);
	app.post('/lugaresalta', auth, lugaresController.postAlta);
	app.get('/lugaresmodificar/:id', auth, lugaresController.getModificar);
	app.post('/lugaresmodificar', auth, lugaresController.postModificar);
	app.get('/lugaresborrar/:id', auth, lugaresController.getDel);
	//clasificacion de horas
	app.get('/clasificacionlista', auth, clasificacionController.getLista);
	app.get('/clasificacionalta', auth, clasificacionController.getAlta);
	app.post('/clasificacionalta', auth, clasificacionController.postAlta);
	app.get('/clasificacionmodificar/:id', auth, clasificacionController.getModificar);
	app.post('/clasificacionmodificar', auth, clasificacionController.postModificar);
	app.get('/clasificacionborrar/:id', auth, clasificacionController.getDel);
	//imputacion de horas 02/07/2015-> ahora se llama ITEMS
	app.get('/imputacionlista', auth, imputaController.getLista);
	app.get('/imputacionalta', auth, imputaController.getAlta);
	app.post('/imputacionalta', auth, imputaController.postAlta);
	app.get('/imputacionmodificar/:id', auth, imputaController.getModificar);
	app.post('/imputacionmodificar', auth, imputaController.postModificar);
	app.get('/imputacionborrar/:id', auth, imputaController.getDel);
	//parte diario 1
	app.get('/partediario1lista', auth, partediario1Controller.getLista);
	app.get('/partediario1alta', auth, partediario1Controller.getAlta);
	app.post('/partediario1alta', auth, partediario1Controller.postAlta);
	app.get('/partediario1modificar/:id', auth, partediario1Controller.getModificar);
	app.post('/partediario1modificar', auth, partediario1Controller.postModificar);
	app.get('/partediario1borrar/:id', auth, partediario1Controller.getDel);
	//parte diario 2
	app.get('/partediario2lista/:id', auth, partediario2Controller.getLista);
	app.get('/partediario2alta/:id', auth, partediario2Controller.getAlta);
	app.post('/partediario2alta', auth, partediario2Controller.postAlta);
	app.get('/partediario2modificar/:id', auth, partediario2Controller.getModificar);
	app.post('/partediario2modificar', auth, partediario2Controller.postModificar);
	app.get('/partediario2borrar/:id', auth, partediario2Controller.getDel);
	app.get('/getemplesbysector/:id', auth, partediario2Controller.getEmples);
	app.get('/getempleinpd2/:idp1/:idemple', auth, partediario2Controller.getEmpleInPartediario2);
	//pruebasql
	app.get('/pruebasql', auth, pruebasqlController.getPrueba);
	//fichadas
	app.get('/fichadaslista', auth, fichadasController.getLista);
	app.get('/buscarfichadas/:fecha', auth, fichadasController.getFichadas);
	app.get('/fichadasver/:reloj/:fecha', auth, fichadasController.getVer);
	//categorias
	app.get('/categoriaslista', auth, categoriaController.getLista);
	app.get('/categoriasalta', auth, categoriaController.getAlta);
	app.post('/categoriasalta', auth, categoriaController.postAlta);
	app.get('/categoriamodificar/:id', auth, categoriaController.getModificar);
	app.post('/categoriamodificar', auth, categoriaController.postModificar);
	app.get('/categoriaborrar/:id', auth, categoriaController.del);
	//random
	app.get('/random', auth, randomController.getAsd);
	app.post('/random', auth, randomController.postAsd);
}; 
