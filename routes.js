const cIndex = require('./controllers/cIndex');
const cUsuarios = require('./controllers/cUsuarios');
const cAdmin = require('./controllers/cAdmin');
const cAccesos = require('./controllers/cAccesos');
const cEmpresas = require('./controllers/cEmpresas');
const cTractores = require('./controllers/cTractores');
const mEventos = require('./models/mEventos');
const cRandom = require('./controllers/cRandom');
const cSemis = require('./controllers/cSemis');
const cTipoTractor = require('./controllers/cTipoTractor');
const cTipoSemi = require('./controllers/cTipoSemi');
const cTipoCuenta = require('./controllers/cTipoCuenta');
const cProductos = require('./controllers/cProductos');
const cTipoProductos = require('./controllers/cTipoProductos');
const cViajes = require('./controllers/cViajes');
const cLocalidades = require('./controllers/cLocalidades');
const cChoferes = require('./controllers/cChoferes');

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
	app.get('/login', cAdmin.getLogin);
	app.post('/login', cAdmin.postLogin);
	app.get('/logout', logout);
	app.get('/inicio', cIndex.getInicio);
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
		app.get('/empresas/modificar/:id', cEmpresas.getModificar);
		app.post('/empresas/modificar', cEmpresas.postModificar);
		app.get('/empresas/eliminar/:id', cEmpresas.getEliminar);
	// TRACTORES
		app.get('/tractores/lista', cTractores.getLista);
		app.get('/tractores/alta', cTractores.getAlta);
		app.post('/tractores/alta', cTractores.postAlta);
		app.get('/tractores/modificar/:id', cTractores.getModificar);
		app.post('/tractores/modificar', cTractores.postModificar);
		app.get('/tractores/eliminar/:id', cTractores.getEliminar);
	// CHOFERES
		app.get('/choferes/lista', cChoferes.getLista);
		app.get('/choferes/alta', cChoferes.getAlta);
		app.post('/choferes/alta', cChoferes.postAlta);
		app.get('/choferes/modificar/:id', cChoferes.getModificar);
		app.post('/choferes/modificar', cChoferes.postModificar);
		app.get('/choferes/eliminar/:id', cChoferes.getEliminar);
	// SEMIS
		app.get('/semis/lista', cSemis.getLista);
		app.get('/semis/alta', cSemis.getAlta);
		app.post('/semis/alta', cSemis.postAlta);
		app.get('/semis/modificar/:id', cSemis.getModificar);
		app.post('/semis/modificar', cSemis.postModificar)
		app.get('/semis/eliminar/:id', cSemis.getEliminar);
	// TIPO TRACTOR
		app.get('/tipotractor/lista', cTipoTractor.getLista);
		app.get('/tipotractor/alta', cTipoTractor.getAlta);
		app.post('/tipotractor/alta', cTipoTractor.postAlta);
		app.get('/tipotractor/modificar/:id', cTipoTractor.getModificar);
		app.post('/tipotractor/modificar', cTipoTractor.postModificar)
		app.get('/tipotractor/eliminar/:id', cTipoTractor.getEliminar);
	// TIPO SEMI
		app.get('/tiposemi/lista', cTipoSemi.getLista);
		app.get('/tiposemi/alta', cTipoSemi.getAlta);
		app.post('/tiposemi/alta', cTipoSemi.postAlta);
		app.get('/tiposemi/modificar/:id', cTipoSemi.getModificar);
		app.post('/tiposemi/modificar', cTipoSemi.postModificar)
		app.get('/tiposemi/eliminar/:id', cTipoSemi.getEliminar);
	// TIPO CUENTA
		app.get('/tipocuenta/lista', cTipoCuenta.getLista);
		app.get('/tipocuenta/alta', cTipoCuenta.getAlta);
		app.post('/tipocuenta/alta', cTipoCuenta.postAlta);
		app.get('/tipocuenta/modificar/:id', cTipoCuenta.getModificar);
		app.post('/tipocuenta/modificar', cTipoCuenta.postModificar)
		app.get('/tipocuenta/eliminar/:id', cTipoCuenta.getEliminar);
	// PRODUCTOS
		app.get('/productos/lista', cProductos.getLista);
		app.get('/productos/alta', cProductos.getAlta);
		app.post('/productos/alta', cProductos.postAlta);
		app.get('/productos/modificar/:id', cProductos.getModificar);
		app.post('/productos/modificar', cProductos.postModificar)
		app.get('/productos/eliminar/:id', cProductos.getEliminar);
	// TIPO PRODUCTOS
		app.get('/tipoproducto/lista', cTipoProductos.getLista);
		app.get('/tipoproducto/alta', cTipoProductos.getAlta);
		app.post('/tipoproducto/alta', cTipoProductos.postAlta);
		app.get('/tipoproducto/modificar/:id', cTipoProductos.getModificar);
		app.post('/tipoproducto/modificar', cTipoProductos.postModificar)
		app.get('/tipoproducto/eliminar/:id', cTipoProductos.getEliminar);
	// VIAJES
		app.get('/viajes/lista', cViajes.getLista);
		app.get('/viajes/alta', cViajes.getAlta);
		app.post('/viajes/alta', cViajes.postAlta);
		app.get('/viajes/modificar/:id', cViajes.getModificar);
		app.post('/viajes/modificar', cViajes.postModificar)
		app.get('/viajes/eliminar/:id', cViajes.getEliminar);
	// LOCALIDADES
		app.get('/localidades/all', cLocalidades.getAll);
	// PING
		app.post('/ping', function(req, res){
			var lat = req.body.lat;
			var long = req.body.long;
			res.send('La: '+lat+'; Lo:'+long);
			console.log('La: '+lat+'; Lo:'+long);
		});
};