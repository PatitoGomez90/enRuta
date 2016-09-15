var cIndex = require('./controllers/cIndex');
var cUsuarios = require('./controllers/cUsuarios');
var cAdmin = require('./controllers/cAdmin');
var cAccesos = require('./controllers/cAccesos');
var cEmpresas = require('./controllers/cEmpresas');

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
	app.get('/', cIndex.getInicio);
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
	
	// EMPRESAS
		app.get('/empresas/lista', cEmpresas.getLista);
		app.get('/empresas/alta', cEmpresas.getAlta);
		app.post('/empresas/alta', cEmpresas.postAlta);

	

};