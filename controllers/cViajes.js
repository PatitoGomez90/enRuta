var mViajes = require('../models/mViajes');
const mLocalidades = require('../models/mLocalidades');
const mTractores = require('../models/mTractores');
const mSemis = require('../models/mSemis');
// const mChoferes = require('../mChoferes');
const mProductos = require('../models/mProductos');
const mEmpresas = require('../models/mEmpresas');

const tools = require('../public/js/utils.js');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mViajes.getAll(function (viajes){
  		// console.log(viajes)
  		res.render('viajes_lista', {
			pagename: 'Lista de Viajes',
			viajes: viajes
		});
  	});
}

function getAlta(req, res){
	mLocalidades.getAll(function (localidades){
		// console.log(localidades)
		mTractores.getAll(function (tractores){
			mSemis.getAll(function (semis){
				mProductos.getAll(function (productos){
					mEmpresas.getAll(function(empresas){
						res.render('viajes_alta', {
							pagename: "Alta de Viaje",
							localidades: localidades,
							tractores: tractores,
							semis: semis,
							productos: productos,
							empresas: empresas
						});
					});					
				});
			});
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	// console.log(params);
	const nro_comprobante = params.nro_comprobante;
	const origen = params.origen;
	const origen_id = params.origen_id;
	const destino = params.destino;
	const destino_id = params.destino_id;
	const empresa = params.empresa;
	const producto = params.producto;
	const tractor = params.tractor;
	const semi = params.semi;
	const chofer = params.chofer;
	const apodo = params.apodo;
	const toneladas = params.toneladas;
	var fecha_gen = tools.generateTodayDateYMD();
	var fecha_salida = params.fecha_salida;
	fecha_salida = tools.changeDate(fecha_salida);
	var fecha_llegada_aprox = params.fecha_llegada_aprox;
	fecha_llegada_aprox = tools.changeDate(fecha_llegada_aprox);
	var fecha_llegada_real = params.fecha_llegada_real;
	fecha_llegada_real = tools.changeDate(fecha_llegada_real);
	const observaciones = params.observaciones;

	mViajes.insert(nro_comprobante, origen, destino, empresa, producto, tractor, semi, chofer, apodo, toneladas, fecha_gen, fecha_salida, fecha_llegada_aprox, fecha_llegada_real, observaciones, function(){
		res.redirect('/viajes/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;
	mViajes.getBy_Id(id, function (viaje){
		mLocalidades.getAll(function (localidades){
			mTractores.getAll(function (tractores){
				mSemis.getAll(function (semis){
					mProductos.getAll(function (productos){
						mEmpresas.getAll(function(empresas){
							res.render('viajes_modificar', {
								pagename: "Modificar Viaje",
								viaje: viaje[0],
								localidades: localidades,
								tractores: tractores,
								semis: semis,
								productos: productos,
								empresas: empresas
							});
						});
					});
				});
			});
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const nro_comprobante = params.nro_comprobante;
	const origen = params.origen;
	const origen_id = params.origen_id;
	const destino = params.destino;
	const destino_id = params.destino_id;
	const empresa = params.empresa;
	const producto = params.producto;
	const tractor = params.tractor;
	const semi = params.semi;
	const chofer = params.chofer;
	const apodo = params.apodo;
	const toneladas = params.toneladas;
	var fecha_gen = tools.generateTodayDateYMD();
	var fecha_salida = params.fecha_salida;
	fecha_salida = tools.changeDate(fecha_salida);
	var fecha_llegada_aprox = params.fecha_llegada_aprox;
	fecha_llegada_aprox = tools.changeDate(fecha_llegada_aprox);
	var fecha_llegada_real = params.fecha_llegada_real;
	fecha_llegada_real = tools.changeDate(fecha_llegada_real);
	const observaciones = params.observaciones;

	mViajes.update(id, nro_comprobante, origen, destino, empresa, producto, tractor, semi, chofer, apodo, toneladas, fecha_gen, fecha_salida, fecha_llegada_aprox, fecha_llegada_real, observaciones, function(){
		res.redirect('/viajes/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;
	mViajes.del(id, function(){
		res.redirect('/viajes/lista');
	});
}