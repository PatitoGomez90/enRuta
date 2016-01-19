//requiriendo modelo mensaje.js:
var mVehiculos = require('../models/mVehiculos');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getVer: getVer
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	req.session.nromenu = 3;
  	mVehiculos.getAll(function (vehiculos){
  		res.render('vehiculoslista', {
			pagename: 'Archivo de Vehiculos',
			vehiculos: vehiculos
		});
  	});
}

function getAlta(req, res){
	res.render("vehiculosalta", {
		pagename: "Alta de Vehiculo"
	});
}

function postAlta(req, res){
	params = req.body;
	// console.log(params)
	numero = params.numero;
	marca = params.marca;
	modelo = params.modelo;
	dominio = params.dominio;
	tipo = params.tipo;
	fecha_alta = params.fecha_alta;
	if (fecha_alta != '')
		fecha_alta = changeDate(fecha_alta);
	chasis = params.chasis;
	chasis_fecha = params.chasis_fecha;
	if (chasis_fecha != '')
		chasis_fecha = changeDate(chasis_fecha);
	chasis_dlls = params.chasis_dlls;
	if (chasis_dlls == '')
		chasis_dlls = 0;
	chasis_pesos = params.chasis_pesos;
	if (chasis_pesos == '')
		chasis_pesos = 0;
	carro = params.carro;
	carro_fecha = params.carro_fecha;
	if (carro_fecha != '')
		carro_fecha = changeDate(carro_fecha);
	carro_dlls = params.carro_dlls;
	if (carro_dlls == '')
		carro_dlls = 0;
	carro_pesos = params.carro_pesos;
	if (carro_pesos == '')
		carro_pesos = 0;
	ano = params.ano;

	mVehiculos.verificarNumero(numero, function (repite){
		if (repite[0] != null){
			res.render('error', {
				error: "El número de vehiculo ingresado ya existe."
			})
		}else{
			mVehiculos.insert(numero, marca, modelo, dominio, tipo, fecha_alta, chasis, chasis_fecha, chasis_dlls, chasis_pesos, carro, carro_fecha, carro_dlls, carro_pesos, ano, function(){
				res.redirect('vehiculoslista');
			});
		}
	});	
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mVehiculos.getbyId(id, function (vehiculo){
		res.render("vehiculosmodificar", {
			pagename: "Modificar Vehiculo",
			vehiculo: vehiculo[0]
		})
	})
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	numero = params.numero;
	marca = params.marca;
	modelo = params.modelo;
	dominio = params.dominio;
	tipo = params.tipo;
	fecha_alta = params.fecha_alta;
	if (fecha_alta != '')
		fecha_alta = changeDate(fecha_alta);
	chasis = params.chasis;
	chasis_fecha = params.chasis_fecha;
	if (chasis_fecha != '')
		chasis_fecha = changeDate(chasis_fecha);
	chasis_dlls = params.chasis_dlls;
	if (chasis_dlls == '')
		chasis_dlls = 0;
	chasis_pesos = params.chasis_pesos;
	if (chasis_pesos == '')
		chasis_pesos = 0;
	carro = params.carro;
	carro_fecha = params.carro_fecha;
	if (carro_fecha != '')
		carro_fecha = changeDate(carro_fecha);
	carro_dlls = params.carro_dlls;
	if (carro_dlls == '')
		carro_dlls = 0;
	carro_pesos = params.carro_pesos;
	if (carro_pesos == '')
		carro_pesos = 0;
	ano = params.ano;
	if (ano == '')
		ano = 0;

	mVehiculos.getByNumero(numero, function (vehi_bynumero){
		if (vehi_bynumero.length == 1 && vehi_bynumero[0].id == id){
			mVehiculos.update(id, numero, marca, modelo, dominio, tipo, fecha_alta, chasis, chasis_fecha, chasis_dlls, chasis_pesos, carro, carro_fecha, carro_dlls, carro_pesos, ano, function(){
				res.redirect('vehiculoslista');
			});
		}else{
			if (vehi_bynumero.length == 0){
				res.render("error", {
					error: "Informacion para el programador: El registro tiene longitud 0."
				});
			}else{
				if (vehi_bynumero.length > 1){
					res.render("error", {
						error: "Informacion para el programador: El registro tiene longitud mayor a 1."
					});
				}
			}
		}
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mVehiculos.del(id, function (){
		res.redirect('vehiculoslista');
	});
}

function getVer(req, res){
	params = req.params;
	id = params.id;

	mVehiculos.getbyId(id, function (vehiculo){
		res.render("vehiculosver", {
			pagename: "Informacion completa de Vehiculo",
			vehiculo: vehiculo[0]
		})
	})
}