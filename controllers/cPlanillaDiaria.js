//requiriendo modelo mensaje.js:
var mPlanillaDiaria = require('../models/mPlanillaDiaria');
var mBorro = require('../models/mBorro');
var mAyuda = require('../models/mAyuda');

var mUsuarios = require('../models/mUsuarios');
var mVehiculos = require('../models/mVehiculos');
var mLineas = require('../models/mLineas');
var mRepuestos = require('../models/mRepuestos');
var mTanques = require('../models/mTanques');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getByFecha: getByFecha,
	getVerFechasConDatos: getVerFechasConDatos,
	getFechasConDatos: getFechasConDatos
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function changeDate2(date){
	// input: yyyy/mm/dd
	fechaus = date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
	return fechaus;
	// output: dd/mm/yyyy
}

function getLista(req, res) {
	req.session.nromenu = 3;
	res.render('planilladiarialista', {
		pagename: 'Archivo de Planilla Diaria de Combustibles'
	});
}

function getAlta(req, res){
	mUsuarios.getAllUsuarios(function (usuarios){
		mVehiculos.getAll(function (vehiculos){
			mLineas.getAll(function (lineas){
				mRepuestos.getAllAceites(function (repuestos){
					mRepuestos.getLastAceite(function (ultimoaceite){
						console.log(ultimoaceite[0].id_repuesto_fk)
						mTanques.getAll(function (tanques){
							res.render('planilladiariaalta', {
								pagename: 'Alta en Planilla Diaria de Combustibles',
								usuarios: usuarios,
								coches: vehiculos,
								lineas: lineas,
								articulos: repuestos,
								tanques: tanques,
								ultimoaceite: ultimoaceite[0].id_repuesto_fk
							});
						});
					});					
				});
			});
		});
	});
}


function postAlta(req, res){
	params = req.body;
	// console.log(params)
	// console.log(req.session.user.unica)
	fecha = params.fecha;
	legajo = params.cargarealizadopor;
	articulo = params.articulo;
	coche = params.coche;
	linea = params.linea;
	hora = params.horacarga;
	if (hora == ''){
		var d = new Date(); // for now
		hr = d.getHours(); // => 9
		min = d.getMinutes(); // =>  30
		hora = hr +":"+min;
	}
	gas = params.lt_gasoil;
	if (gas == '')
		gas = 0;
	oil = params.lt_aceite;
	if (oil == '')
		oil = 0;
	agua = params.lt_agua;
	if (agua == '')
		agua = 0;
	valgas = params.val_gasoil;
	if (valgas == '')
		valgas = 0;
	valoil = params.val_aceite;
	if (valoil == '')
		valoil = 0;
	tanque = params.tanque;
	noper = req.session.user.unica;

	fecha = changeDate(fecha);

	mPlanillaDiaria.insert(fecha, legajo, articulo, coche, linea, hora, gas, oil, agua, valgas, valoil, tanque, noper, function(){
		res.redirect('planilladiarialista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mUsuarios.getAllUsuarios(function (usuarios){
		mVehiculos.getAll(function (vehiculos){
			mLineas.getAll(function (lineas){
				mRepuestos.getAllAceites(function (repuestos){
					mTanques.getAll(function (tanques){
						mPlanillaDiaria.getById(id, function (planilla){
							res.render('planilladiariamodificar', {
								pagename: 'Modificar registro en Planilla Diaria de Combustibles',
								usuarios: usuarios,
								coches: vehiculos,
								lineas: lineas,
								articulos: repuestos,
								tanques: tanques,
								planilla: planilla[0]
							});
						});
					});
				});
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	fecha = params.fecha;
	legajo = params.cargarealizadopor;
	articulo = params.articulo;
	coche = params.coche;
	linea = params.linea;
	hora = params.horacarga;
	gas = params.lt_gasoil;
	oil = params.lt_aceite;
	agua = params.lt_agua;
	valgas = params.val_gasoil;
	valoil = params.val_aceite;
	tanque = params.tanque;
	noper = req.session.user.unica;

	fecha = changeDate(fecha);

	mPlanillaDiaria.update(id, fecha, legajo, articulo, coche, linea, hora, gas, oil, agua, valgas, valoil, tanque, noper, function(){
		res.redirect('planilladiarialista');
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;
	mPlanillaDiaria.del(id, function(){
		res.redirect('/planilladiarialista'); 
	});
}

function getByFecha(req, res){
	params = req.params;
	fecha = params.fecha;
	fecha = decodeURIComponent(fecha)
	fecha = changeDate(fecha);

	mPlanillaDiaria.getByFecha(fecha, function (planilladiria){
		res.send(planilladiria);
	});
}

function getVerFechasConDatos(req, res){
	res.render("planilladiriaverfechascondatos", {
		pagename: "Buscar Fechas con Datos"
	});
}

function getFechasConDatos(req, res){
	params = req.params;
	desde = params.desde;
	hasta = params.hasta;

	desde_decoded = decodeURIComponent(desde);
	hasta_decoded = decodeURIComponent(hasta);

	desde_decoded = changeDate(desde_decoded);
	hasta_decoded = changeDate(hasta_decoded);
	
	mPlanillaDiaria.getFechasConDatos(desde_decoded, hasta_decoded, function (fechascondatos){
		res.send(fechascondatos);
	});
}