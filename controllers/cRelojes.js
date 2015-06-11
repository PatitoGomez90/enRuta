var mRelojes = require('../models/mRelojes');
var mAyuda = require('../models/mAyuda');
var mSectores = require('../models/mSectores');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function getLista(req, res) {
	//req.session.nromenu = 5;
	//mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
		mRelojes.getAll(function (relojes){
			res.render('relojeslista', {
	        	pagename: 'Lista de Relojes',
	        	relojes: relojes
	        	//ayuda: ayuda[0]
	      	}); 
		});    
	//});
};

function getAlta(req, res){
	mSectores.getAllActivos(function (sectores){
		res.render('relojesalta',{
			pagename: "Alta de Reloj",
			sectores: sectores
		});
	});	
}

function postAlta(req, res){
	params = req.body;
	numero = params.numero;
	sector = params.sector;
	descripcion = params.descripcion;

	mRelojes.insert(numero, sector, descripcion, function(){
		res.redirect('relojeslista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mSectores.getAllActivos(function (sectores){
		mRelojes.getById(id, function (reloj){
			res.render('relojesmodificar',{
				pagename: "Modificar Reloj",
				reloj: reloj[0],
				sectores: sectores
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	numero = params.numero;
	sector = params.sector;
	descripcion = params.descripcion;

	mRelojes.update(id, numero, sector, descripcion, function(){
		res.redirect('relojeslista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mRelojes.del(id, function(){
		res.redirect('relojeslista');
	})
}