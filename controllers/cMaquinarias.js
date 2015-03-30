var mMaq= require('../models/mMaquinarias');
var mBorro = require('../models/mBorro');
var mControl = require('../models/mTipoControl');
var mCombustible = require('../models/mTipoCombustible');
var mMaquinaria = require('../models/mTipoMaquinaria');

var mAyuda = require('../models/mAyuda');

module.exports = {
	getAll: getAll,
	getAlta: getAlta,
	postAlta: postAlta,
	getVer: getVer,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
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
	mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
	  	mMaq.getAll(function(allmaq){
	  		mMaquinaria.getAll(function(allmaquinaria){
		  		res.render('maqlista', {
					pagename: 'Archivo de Maquinas / Equipos / Vehiculos',
					maqs: allmaq,
					tipos: allmaquinaria,
					ayuda: ayuda[0]
				});
	  		});
	  	});
	});
}

function getAlta(req, res){
	mMaq.getUltimoCodigo(function(ultimocodigo){
		mControl.getAll(function(allcontrol){
			mCombustible.getAll(function(allcombustible){
				mMaquinaria.getAll(function(allmaquinaria){
					if (ultimocodigo[0].codigo == null){
						res.render('maqalta',{
							pagename: "Alta de Maquinas / Equipos / Vehiculos",
							ultimocodigo: 1,
							controles: allcontrol,
							combs: allcombustible,
							maquinarias: allmaquinaria
						});
					}else{
						res.render('maqalta',{
							pagename: "Alta de Maquinas / Equipos / Vehiculos",
							ultimocodigo: ultimocodigo[0].codigo+1,
							controles: allcontrol,
							combs: allcombustible,
							maquinarias: allmaquinaria
						});
					}
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
	tipo = params.tipomaquinaria;
	modelo = params.modelo;
	anio = params.anio;
	serie = params.serie;
	motor = params.nmotor;
	fcompra = params.fcompra;
	if(fcompra.length>1){
    	fcompra = changeDate(fcompra);
  	}else{
  		fcompra="";
  	}
	control = params.tipocontrol;
	comb = params.tipocomb;
	titular = params.titular;
	fbaja = null;
	mbaja = "";
	datos = params.datos;
	linkfab = params.linkfab;
	activa = 1

	mMaq.insert(codigo, dominio, nombre, marca, tipo, modelo, anio, serie, motor, fcompra, control, comb, titular, fbaja, mbaja, datos, linkfab, activa, function(){
		res.redirect('maqlista');
	});
}

function getVer(req, res){
	params = req.params;
	id = params.id;
	mMaq.getMaqPorID(id, function(maqporid){
		mControl.getAll(function(allcontrol){
			mCombustible.getAll(function(allcombustible){
				mMaquinaria.getAll(function(allmaquinaria){
					//console.log("maqporid.fbaja: " + maqporid[0].fbaja)
					if (maqporid[0].fbaja === null)
						fbaja = "";
					else{
						fbaja = maqporid[0].fbaja;
						fbaja = changeDate2(fbaja.toString());
					}						
					//console.log("fbaja: "+fbaja)
					res.render('maqver',{
						pagename: "Ficha de Maquinas / Equipos / Vehiculos ",
						maq: maqporid[0],
						controles: allcontrol,
						combs: allcombustible,
						maquinarias: allmaquinaria,
						fbaja: fbaja
					});
				});
			});
		});
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mControl.getAll(function(allcontrol){
		mCombustible.getAll(function(allcombustible){
			mMaquinaria.getAll(function(allmaquinaria){
				mMaq.getMaqPorID(id, function(maqporid){
					//console.log("maqporid.fbaja: " + maqporid[0].fbaja)
					if (maqporid[0].fbaja === null)
						fbaja = "";
					else{
						fbaja = maqporid[0].fbaja;
						fbaja = changeDate2(fbaja.toString());
					}						
					//console.log("fbaja: "+fbaja)
					res.render('maqmodificar',{
						pagename: "Modificar Maquinas / Equipos / Vehiculos",
						maq: maqporid[0],
						maquinarias: allmaquinaria,
						combs: allcombustible,
						controles: allcontrol,
						fbaja: fbaja
					});
				});
			});
		});
	});
}

function postModificar(req,res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	dominio = params.dominio;
	nombre = params.nombre;
	marca = params.marca;
	tipo = params.tipomaquinaria;
	modelo = params.modelo;
	anio = params.anio;
	serie = params.serie;
	motor = params.nmotor;
	fcompra = params.fcompra;
	if(fcompra.length>1){
    	fcompra = changeDate(fcompra);
  	}
	control = params.tipocontrol;
	comb = params.tipocomb;
	titular = params.titular;
	fbaja = params.fbaja;
	console.log(fbaja);
	if(fbaja.length>1){
    	fbaja = changeDate(fbaja);
  	}else{
  		fbaja = null;
  	}
	mbaja = params.mbaja;
	datos = params.datos;
	linkfab = params.linkfab;
	activa = params.activa;
	if (activa=="on")
		activa = 1;
	else
		activa = 0;

	mMaq.update(id, codigo, dominio, nombre, marca, tipo, modelo, anio, serie, motor, fcompra, control, comb, titular, fbaja, mbaja, datos, linkfab, activa, function(){
		res.redirect('maqlista');
	})	
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mMaq.del(id, function(){
		res.redirect('maqlista');
	});
}