var mFichadas = require('../models/mFichadas');
var mAyuda = require('../models/mAyuda');
var mEmple = require('../models/mEmple');
var mSectores = require('../models/mSectores');
var mRelojes = require('../models/mRelojes');

module.exports = {
	getLista: getLista,
	getFichadas: getFichadas,
	getVer: getVer,
	getAll: getAll,
	updateFichadas: updateFichadas
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	//req.session.nromenu = 11;
	//mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	updateFichadas();
	res.render('fichadaslista', {
		pagename: 'Lista de Fichadas'
	});
}

function getFichadas(req, res){
	params = req.params;
	fecha= params.fecha;
	fecha = changeDate(fecha);

	mFichadas.getFichadas(fecha, function (fichadas){

		console.log(fichadas)
		res.send(fichadas);
	});
}

function getAyuda(req, res){
	params = req.params;
	id = params.id;

	mAyuda.getAyuda(id, function (ayuda){
		res.send(ayuda);
	});
}

function getVer(req, res){
	params = req.params;
	reloj = params.reloj;
	fecha = params.fecha;
	fecha = changeDate(fecha);

	mFichadas.getFichada(reloj, fecha, function (fichada){
		mEmple.getAllActivos(function (emples){	
			mSectores.getAllActivos(function (sectores){
				mRelojes.getAll(function (relojes){
					res.render("fichadasver", {
						pagename: "Detalles de Fichada",
						fichada: fichada,
						relojes: relojes,
						sectores: sectores,
						emples: emples
					});
				});
			});
		});
	});
}

function updateFichadas(){
	var lastficid = 0;
	mFichadas.getLastFicIdMySql(function (lastficidfrommysql){
		console.log(lastficidfrommysql)
		if(lastficidfrommysql[0].maxfic_id == null)
			lastficid = 0;
		else
			lastficid = lastficid[0].maxfic_id;

		mFichadas.getLatestFicSQL(lastficid, function (latestfic){

			for (var i = 0; i < latestfic.length; i++ ){

				mFichadas.SQLifIDexists(latestfic[0].fic_id, function (fic_id){
					console.log(fic_id);
					console.log("length "+fic_id.length);
					if (fic_id.length != 0){
						mFichadas.MySqlInsert(latestfic[i], function (){
							console.log(i)
						});
					}else{
						console.log("Registro fic_id = "+latestfic[i].fic_id+" existente en MySql");
					}
				});

			}

		});
	});
}

function getAll(req, res){
	mFichadas.getAllFromMySql(function (fichadas){
		res.send(fichadas);
	})
}