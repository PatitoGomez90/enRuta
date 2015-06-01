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
	app.get('/articulosimprimir/:id', auth, artController.printTicket);
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
	//checklist 1
	app.get('/chk1lista', auth, chk1Controller.getLista);
	app.get('/chk1alta', auth, chk1Controller.getAlta);
	app.post('/chk1alta', auth, chk1Controller.postAlta);
	//checklist 2
	app.get('/chk2lista', auth, chk2Controller.getLista);
	app.get('/chk2alta', auth, chk2Controller.getAlta);
	app.post('/chk2alta', auth, chk2Controller.postAlta);
	app.get('/chk2modificar/:id', auth, chk2Controller.getModificar);
	app.post('/chk2modificar', auth, chk2Controller.postModificar);
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
}; 
