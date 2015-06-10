var mMaq= require('../models/mMaquinarias');
var mBorro = require('../models/mBorro');
var mControl = require('../models/mTipoControl');
var mCombustible = require('../models/mTipoCombustible');
var mTipoMaquinaria = require('../models/mTipoMaquinaria');

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
	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	  	mMaq.getAllMaq(function (allmaq){
	  		mTipoMaquinaria.getAll(function (alltipomaquinaria){
		  		res.render('maqlista', {
					pagename: 'Archivo de Maquinas',
					maqs: allmaq,
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
				if (ultimocodigo[0].codigo == null){
					res.render('maqalta',{
						pagename: "Alta de Herramientas Electricas",
						ultimocodigo: 1,
						controles: allcontrol,
						combs: allcombustible
					});
				}else{
					res.render('maqalta',{
						pagename: "Alta de Herramientas Electricas",
						ultimocodigo: ultimocodigo[0].codigo+1,
						controles: allcontrol,
						combs: allcombustible
					});
				}
			});
		});
	});	
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	nombre = params.nombre;
	marca = params.marca;
	tipo = 1;
	modelo = params.modelo;
	serie = params.serie;
	fcompra = params.fcompra;
	if(fcompra.length>1){
    	fcompra = changeDate(fcompra);
  	}else{
  		fcompra="";
  	}
	fbaja = null;
	mbaja = "";
	datos = params.datos;
	linkfab = params.linkfab;
	activa = 1

	mMaq.insertMaq(codigo, nombre, marca, tipo, modelo, serie, fcompra, fbaja, mbaja, datos, linkfab, activa, function(){
		res.redirect('maqlista');
	});
}

function getVer(req, res){
	params = req.params;
	id = params.id;
	mMaq.getMaqPorID(id, function (maqporid){
		mControl.getAll(function (allcontrol){
			mCombustible.getAll(function (allcombustible){
				mTipoMaquinaria.getAll(function (allmaquinaria){
					//console.log("maqporid.fbaja: " + maqporid[0].fbaja)
					if (maqporid[0].fbaja === null)
						fbaja = "";
					else{
						fbaja = maqporid[0].fbaja;
						fbaja = changeDate2(fbaja.toString());
					}						
					//console.log("fbaja: "+fbaja)
					res.render('maqver',{
						pagename: "Ficha de Herramientas Electricas",
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
	mControl.getAll(function (allcontrol){
		mCombustible.getAll(function (allcombustible){
			mTipoMaquinaria.getAll(function (allmaquinaria){
				mMaq.getMaqPorID(id, function (maqporid){
					//console.log("maqporid.fbaja: " + maqporid[0].fbaja)
					if (maqporid[0].fbaja === null)
						fbaja = "";
					else{
						fbaja = maqporid[0].fbaja;
						fbaja = changeDate2(fbaja.toString());
					}						
					//console.log("fbaja: "+fbaja)
					res.render('maqmodificar',{
						pagename: "Modificar Herramienta Electrica",
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
	nombre = params.nombre;
	marca = params.marca;
	modelo = params.modelo;
	serie = params.serie;
	fcompra = params.fcompra;
	if(fcompra.length>1){
    	fcompra = changeDate(fcompra);
  	}
	fbaja = params.fbaja;
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

	mMaq.update(id, codigo, nombre, marca, modelo, serie, fcompra, fbaja, mbaja, datos, linkfab, activa, function(){
		res.redirect('maqlista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mMaq.del(id, function(){
		res.redirect('maqlista');
	});
}