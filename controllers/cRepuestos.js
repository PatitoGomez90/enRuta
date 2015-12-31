//requiriendo modelo mensaje.js:
var mRepuestos = require('../models/mRepuestos');
var mBorro = require('../models/mBorro');
var mRubros = require('../models/mRubros');
// var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getCantRepuestosEnRubroById: getCantRepuestosEnRubroById
}

function getLista(req, res) {
	req.session.nromenu = 3;
  	mRepuestos.getAll(function (repuestos){
  		res.render('repuestoslista', {
			pagename: 'Archivo de Repuestos',
			repuestos: repuestos
		});
  	});
}

function getAlta(req, res){
	mRubros.getAll(function (rubros){
		res.render('repuestosalta', {
			pagename: 'Alta de Repuestos',
			rubros: rubros
		});
	});
}

function postAlta(req, res){
	params = req.body;
	id_rubro = params.rubro;
	codigo1 = params.codigo1;
	codigo2 = params.codigo2;
	nombre = params.nombre;
	stock = params.stock;
	valor = params.valor;
	calle = params.calle;
	modulo = params.modulo;
	estante = params.estante;
	minimo = params.minimo;
	maximo = params.maximo;
	descripcion = params.descripcion;
	marca = params.marca;
	if (marca == 'on')
		marca = 1;
	else
		marca = 0;
	observaciones = params.observaciones;
	puntopedido = params.puntopedido;
	coche = params.coche;

	codigo = codigo1+codigo2;
	mRepuestos.getByCodigo(codigo, function (repuesto){
		if (repuesto[0]==null){
			mRepuestos.insert(codigo, nombre, stock, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, observaciones, puntopedido, coche, id_rubro, function (){
				res.redirect('repuestoslista');
			});
		}else{
			res.render('error', {
      			error: "Codigo de Repuesto existente. Intente con otro Codigo."
      		});
		}
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mRubros.getAll(function (rubros){
		mRepuestos.getById(id, function (repuesto){
			codigo = repuesto[0].codigo;
			codigo1 = codigo.substring(0, 5);
			codigo2 = codigo.substring(5, 8);
			res.render("repuestosmodificar", {
				pagename: "Modificar Repuesto",
				repuesto: repuesto[0],
				codigo1: codigo1,
				codigo2: codigo2,
				rubros: rubros
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id_repuesto = params.id;
	id_rubro = params.rubro;
	codigo1 = params.codigo1;
	codigo2 = params.codigo2;
	nombre = params.nombre;
	stock = params.stock;
	valor = params.valor;
	calle = params.calle;
	modulo = params.modulo;
	estante = params.estante;
	minimo = params.minimo;
	maximo = params.maximo;
	descripcion = params.descripcion;
	marca = params.marca;
	if (marca == 'on')
		marca = 1;
	else
		marca = 0;
	observaciones = params.observaciones;
	puntopedido = params.puntopedido;
	coche = params.coche;

	codigo = codigo1+codigo2;

	mRepuestos.getByCodigo(codigo, function (repuestosporcodigo){
		if (repuestosporcodigo.length == 0){
			mRepuestos.update(id_repuesto, codigo, nombre, stock, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, observaciones, puntopedido, id_rubro, function(){
				res.redirect('repuestoslista');
			});
		}else{
			if (repuestosporcodigo.length == 1){
				if (repuestosporcodigo[0].id == id){
					mRepuestos.update(id_repuesto, codigo, nombre, stock, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, observaciones, puntopedido, id_rubro, function(){
				res.redirect('repuestoslista');
			});
				}else{				
					res.render('error', {
		      			error: "Codigo de Repuesto existente. Intente con otro Codigo."
		      		});
		      	}
			}else{
				var aparece = false;
				for (var i = 0 ; i < repuestosporcodigo.length ; i++) {
					if (repuestosporcodigo[i].id == id){
						console.log(i+": aca está!")
						aparece = true;
						break;
					}else{
						console.log(i+": aca no está.")
					}
				}
				if (aparece) {
					res.render('error', {
		      			error: "Codigo de Repuesto existente. Intente con otro Codigo."
		      		});
				}else{
					res.render('error', {
		      			error: "Codigo de Repuesto existente. Intente con otro Codigo.."
		      		});
				}
			}			
      	}
	});	
}

function getDel(req, res){
	params = req.params;
	id_repuesto = params.id;

	mRepuestos.del(id_repuesto, function (){
		res.redirect('repuestoslista');
	});
}

function getCantRepuestosEnRubroById(req, res){
	params = req.params;
	id_rubro = params.id_rubro;

	mRepuestos.getCantRepuestosEnRubroById(id_rubro, function (repuestos){
		res.send(repuestos);
	})
}