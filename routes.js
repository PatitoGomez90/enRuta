var cIndex = require('./controllers/cIndex');
var cUsuarios = require('./controllers/cUsuarios');
var cAdmin = require('./controllers/cAdmin');
var cAccesos = require('./controllers/cAccesos');
// var cCargos = require('./controllers/cCargos');


var mEventos = require('./models/mEventos');
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
	//usuarios
	app.get('/usuarioslista', auth, cUsuarios.getUsuarios);
	app.get('/usuariosalta', auth, cUsuarios.getUsuariosAlta);
	app.post('/usuariosalta', auth, cUsuarios.putUsuario);
	app.get('/usuariosmodificar/:id', auth, cUsuarios.getUsuarioModificar);
	app.post('/usuariosmodificar', auth, cUsuarios.postUsuarioModificar);
	app.get('/usuariosborrar/:id', auth, cUsuarios.getDelUsuario);
	//configurar accesos CREO QUE ESTO NO LO VAMOS A USAR
	// app.get('/accesoslista/:id', auth, cAccesos.getAccesos);
	// app.post('/accesoslista', auth, cAccesos.postAccesos);	
	
	


	// //random
	// app.get('/random', auth, cRandom.getRandom);
	// app.get('/updateRepuestosConIdRubroFk', auth, cRandom.updateRepuestosConIdRubroFk);
	// app.get("/updateTablaVehiculosConFive", auth, cRandom.updateTablaVehiculosConFive);
	// app.get("/updateTablaSecr", auth, cRandom.updateTablaSecrConOperariosTemp);
	// app.get("/actualizarOtrosGastos", auth, cRandom.updateOtrosGastos);
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