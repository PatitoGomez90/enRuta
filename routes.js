var cIndex = require('./controllers/cIndex');
var cUsuario = require('./controllers/cUsuario');
var cAdmin = require('./controllers/cAdmin');
var cAccesos = require('./controllers/cAccesos');
// var cCargos = require('./controllers/cCargos');
var cUmed = require('./controllers/cUmed');
var cRubros = require('./controllers/cRubros');
var cRubrosGrupos = require('./controllers/cRubrosGrupos');
var cRepuestos = require('./controllers/cRepuestos');


var mEventos = require('./models/mEventos');
// var cPruebaSQL = require('./controllers/cPruebaSQL');
// var cRandom = require('./controllers/cRandom');

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
	//pruebasql
	// app.get('/pruebasql', auth, cPruebaSQL.getPrueba);
	// //random
	// app.get('/random', auth, cRandom.getAsd);
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
