var mTurnos = require('../models/mTurnos');
var mAyuda = require('../models/mAyuda')
var mSectores = require('../models/mSectores');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getTurnosBySectorId: getTurnosBySectorId
};

function getLista(req, res) {
	req.session.nromenu = 17;
	mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
	mTurnos.getAll(function (turnos){
		res.render('turnoslista', {
        	pagename: 'Lista de Turnos',
        	turnos: turnos,
        	ayuda: ayuda[0]
      		}); 
		});    
	});
};

function getAlta(req, res){
	mSectores.getAllActivos(function (sectores){
		res.render('turnosalta', {
			pagename: 'Agregar Nuevo Turno',
			sectores: sectores
		});
	});
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	sector = params.sector;

	mTurnos.insert(codigo, sector, function (){
		res.redirect('turnoslista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mTurnos.getById(id, function (turno){
		mSectores.getAllActivos(function (sectores){
			res.render('turnosmodificar', {
				pagename: 'Modificar Turno',
				turno: turno[0],
				sectores: sectores
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	sector = params.sector;

	mTurnos.update(id, codigo, sector, function (){
		res.redirect('turnoslista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mTurnos.del(id, function(){
		res.redirect('turnoslista');
	});
}

//para el emple.modificar
function getTurnosBySectorId(req, res){
	params = req.params;
	sectorid = params.sectorid;

	mTurnos.getByIdSector(sectorid, function (turnos){
		res.send(turnos);
	});
}