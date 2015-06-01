var mEq = require('../models/mEquipos');
var mBorro = require('../models/mBorro');
var mControl = require('../models/mTipoControl');
var mCombustible = require('../models/mTipoCombustible');
var mTipoMaquinaria = require('../models/mTipoMaquinaria');
var mTipoEquipo = require('../models/mTipoEquipo');
var mAyuda = require('../models/mAyuda');
var mMaq = require('../models/mMaquinarias');

module.exports = {
	getAll: getAll,
	getAlta: getAlta,
	postAlta: postAlta
};

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

function getAll(req, res) {
	req.session.nromenu = 6;
	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	  	mEq.getAll(function (alleqs){
	  		console.log(alleqs)
	  		mTipoMaquinaria.getAll(function (alltipomaquinaria){
		  		res.render('equipolista', {
					pagename: 'Lista de Equipos / Vehiculos',
					eqs: alleqs,
					tipos: alltipomaquinaria,
					ayuda: ayuda[0]
				});
	  		});
	  	});
	});
}

function getAlta(req, res){
	mMaq.getUltimoCodigo(function (ultimocodigo){
		mControl.getAll(function (allcontrol){
			mCombustible.getAll(function (allcombustible){
				mTipoMaquinaria.getAll(function (tipomaqs){
					mTipoEquipo.getAll(function (tipoeqs){
						if (ultimocodigo[0].codigo == null){
							res.render('equipoalta',{
								pagename: "Alta de Equipos / Vehiculos",
								ultimocodigo: 1,
								controles: allcontrol,
								combs: allcombustible,
								tipomaqs: tipomaqs,
								tipoeqs: tipoeqs
							});
						}else{
							res.render('equipoalta',{
								pagename: "Alta de Equipos / Vehiculos",
								ultimocodigo: ultimocodigo[0].codigo+1,
								controles: allcontrol,
								combs: allcombustible,
								tipomaqs: tipomaqs,
								tipoeqs: tipoeqs
							});
						}
					});
				});
			});
		});
	});	
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	dominio = params.dominio;
	nombre = params.nombre;
	marca = params.marca;
	modelo = params.modelo;
	serie = params.serie;
	nmotor = params.nmotor;
	tipomaq = params.tipomaq;
	tipoequipo = params.tipoeq;
	anio = params.anio;
	fcompra = params.fcompra;
	if(fcompra.length>1){
    	fcompra = changeDate(fcompra);
  	}else{
  		fcompra="";
  	}
  	tipocontrol = params.tipocontrol;
  	tipocomb = params.tipocomb;
  	base = params.base;
  	titular = params.titular;
  	datos = params.datos;
	linkfab = params.linkfab;
	activa = 1

	mEq.insert(codigo, dominio, nombre, marca, modelo, serie, nmotor, tipomaq, tipoequipo, anio, fcompra, tipocontrol, tipocomb, base, titular, datos, linkfab, activa, function(){
		res.redirect('equipolista');
	});
}