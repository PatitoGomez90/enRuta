var cIndex = require('./controllers/cIndex');
var cUsuario = require('./controllers/cUsuario');
var cAdmin = require('./controllers/cAdmin');
var cAccesos = require('./controllers/cAccesos');
// var cCargos = require('./controllers/cCargos');
var cUmed = require('./controllers/cUmed');
var cRubros = require('./controllers/cRubros');
var cRubrosGrupos = require('./controllers/cRubrosGrupos');
var cRepuestos = require('./controllers/cRepuestos');
var cVehiculos = require('./controllers/cVehiculos');
var cProveedores = require('./controllers/cProveedores');
var cAgenda = require('./controllers/cAgenda');
var cOtrosGastos = require('./controllers/cOtrosGastos');
var cPlanillaDiaria = require('./controllers/cPlanillaDiaria');


var mEventos = require('./models/mEventos');
// var cPruebaSQL = require('./controllers/cPruebaSQL');
var cRandom = require('./controllers/cRandom');

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
	app.get('/', cAdmin.getLogin);
	app.get('/login', cAdmin.getLogin)
	app.post('/login', cAdmin.postLogin);
	app.get('/logout', logout);
	app.get('/inicio', auth, cIndex.getInicio);
	app.get('/error', cIndex.getError);
	//ayuda
	app.get('/ayuda', cIndex.getAyuda);
	app.get('/ayudaver/:id', cIndex.AyudaVer);
	//novedades
	app.get('/listanovedades', cIndex.getNovedades);
	//usuarios
	app.get('/usuarioslista', auth, cUsuario.getUsuarios);
	app.get('/usuariosalta', auth, cUsuario.getUsuariosAlta);
	app.post('/usuariosalta', auth, cUsuario.putUsuario);
	app.get('/usuariosmodificar/:id', auth, cUsuario.getUsuarioModificar);
	app.post('/usuariosmodificar', auth, cUsuario.postUsuarioModificar);
	app.get('/usuariosborrar/:id', auth, cUsuario.getDelUsuario);
	//configurar accesos
	app.get('/accesoslista/:id', auth, cAccesos.getAccesos);
	app.post('/accesoslista', auth, cAccesos.postAccesos);	
	//unidades de medida "umed"
	app.get('/umedlista', auth, cUmed.getAllUmed);
	app.get('/umedalta', auth, cUmed.getAlta);
	app.post('/umedalta', auth, cUmed.postAlta);
	app.get('/umedmodificar/:id', auth, cUmed.getModificar);
	app.post('/umedactualizar', auth, cUmed.postModificar);
	app.get('/umedborrar/:id', auth, cUmed.getDelUmed);
	//rubros
	app.get('/rubroslista', auth, cRubros.getLista);
	app.get('/rubrosalta', auth, cRubros.getAlta);
	app.post('/rubrosalta', auth, cRubros.postAlta);
	app.get('/rubrosmodificar/:id', auth, cRubros.getModificar);
	app.post('/rubrosmodificar', auth, cRubros.postModificar);
	app.get('/rubrosborrar/:id', auth, cRubros.getDel);
	app.get('/getRubrosPorGrupo/:id_grupo', auth, cRubros.getRubrosPorGrupo);
	//grupos de rubros
	app.get('/rubrosgruposlista', auth, cRubrosGrupos.getLista);
	app.get('/rubrosgruposalta', auth, cRubrosGrupos.getAlta);
	app.post('/rubrosgruposalta', auth, cRubrosGrupos.postAlta);
	app.get('/rubrosgruposmodificar/:id', auth, cRubrosGrupos.getModificar);
	app.post('/rubrosgruposmodificar', auth, cRubrosGrupos.postModificar);
	app.get('/rubrosgruposborrar/:id', auth, cRubrosGrupos.getDel);
	//repuestos
	app.get('/repuestoslista', auth, cRepuestos.getLista);
	app.get('/repuestosalta', auth, cRepuestos.getAlta);
	app.post('/repuestosalta', auth, cRepuestos.postAlta);
	app.get('/repuestosmodificar/:id', auth, cRepuestos.getModificar);
	app.post('/repuestosmodificar', auth, cRepuestos.postModificar);
	app.get('/repuestosborrar/:id', auth, cRepuestos.getDel);
	app.get('/getCantRepuestosEnRubro/:id_rubro', auth, cRepuestos.getCantRepuestosEnRubroById);
	//vehiculos
	app.get('/vehiculoslista', auth, cVehiculos.getLista);
	app.get('/vehiculosalta', auth, cVehiculos.getAlta);
	app.post('/vehiculosalta', auth, cVehiculos.postAlta);
	app.get('/vehiculosmodificar/:id', auth, cVehiculos.getModificar);
	app.post('/vehiculosmodificar', auth, cVehiculos.postModificar);
	app.get('/vehiculosborrar/:id', auth, cVehiculos.getDel);
	app.get('/vehiculosver/:id', auth, cVehiculos.getVer);
	//proveedores
	app.get('/proveedoreslista', auth, cProveedores.getLista);
	app.get('/proveedoresalta', auth, cProveedores.getAlta);
	app.post('/proveedoresalta', auth, cProveedores.postAlta);
	app.get('/proveedoresmodificar/:id', auth, cProveedores.getModificar);
	app.post('/proveedoresmodificar', auth, cProveedores.postModificar);
	app.get('/proveedoresborrar/:id', auth, cProveedores.getDel);
	app.get('/proveedoresver/:id', auth, cProveedores.getVer);
	//agenda
	app.get('/agendalista', auth, cAgenda.getLista);
	app.get('/agendaalta', auth, cAgenda.getAlta);
	app.post('/agendaalta', auth, cAgenda.postAlta);
	app.get('/agendamodificar/:id', auth, cAgenda.getModificar);
	app.post('/agendamodificar', auth, cAgenda.postModificar);
	app.get('/agendaborrar/:id', auth, cAgenda.getDel);
	app.get('/agendaupdatehecho/:id/:valor', auth, cAgenda.updateHecho);
	//otrosgastos
	app.get("/otrosgastoslista", auth, cOtrosGastos.getLista);
	app.get("/otrosgastosalta", auth, cOtrosGastos.getAlta),
	app.post("/otrosgastosalta", auth, cOtrosGastos.postAlta);
	app.get("/otrosgastosmodificar/:id", auth, cOtrosGastos.getModificar);
	app.post("/otrosgastosmodificar", auth, cOtrosGastos.postModificar);
	app.get("/otrosgastosborrar/:id", auth, cOtrosGastos.getDel);
	//combustibles - planilla diaria
	app.get("/planilladiarialista", auth, cPlanillaDiaria.getLista);
	app.get("/planilladiariaalta", auth, cPlanillaDiaria.getAlta);
	app.post("/planilladiariaalta", auth, cPlanillaDiaria.postAlta);
	app.get("/planilladiariamodificar/:id", auth, cPlanillaDiaria.getModificar);
	app.post("/planilladiariamodificar", auth, cPlanillaDiaria.postModificar);
	app.get("/planilladiariaborrar/:id", auth, cPlanillaDiaria.getDel);
	app.get("/getplanilladiariabyfecha/:fecha", auth, cPlanillaDiaria.getByFecha);


	//pruebasql
	// app.get('/pruebasql', auth, cPruebaSQL.getPrueba);
	// //random
	app.get('/random', auth, cRandom.getRandom);
	app.get('/updateRepuestosConIdRubroFk', auth, cRandom.updateRepuestosConIdRubroFk);
	app.get("/updateTablaVehiculosConFive", auth, cRandom.updateTablaVehiculosConFive);
	app.get("/updateTablaSecr", auth, cRandom.updateTablaSecrConOperariosTemp);
	app.get("/actualizarOtrosGastos", auth, cRandom.updateOtrosGastos);
	// app.post('/random', auth, cRandom.postAsd);
	// app.get('/random2', auth, cRandom.getr2);
	// app.post('/random2', auth, cRandom.postr2);
	// app.get('/random3', auth, cRandom.getRandom3);
	// app.post('/random3', auth, cRandom.postRandom3);
	// app.get('/random4', auth, cRandom.getRandom4);
	// app.post('/random4', auth, cRandom.postRandom4);
	// app.get('/random5', auth, cRandom.getRandom5);
	// app.post('/random5', auth, cRandom.postRandom5);
	// app.get('/random6', auth, cRandom.getRandom6);
	// app.post('/random6', auth, cRandom.postRandom6);
};