var mFichadas = require('../models/mFichadas');
var mAyuda = require('../models/mAyuda');
var mEmple = require('../models/mEmple');
var mSectores = require('../models/mSectores');
var mRelojes = require('../models/mRelojes');
var async = require('async');

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

	mFichadas.getFichadasFromSQL(fecha, function (fichadas){
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
	var mysql = require('mysql');

	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Maresa',
	    dateStrings : true
	});

	// var configserver = {
	//   user: 'Master',
	//   password: 'Masterclk',
	//   server: "grupomaresa.dyndns.org",//ip local de la red
	//   port: '4433',
	//   database: 'ClockCard',
	//   connectionTimeout: 35000,
	//   requestTimeout: 80000
	// }


	var lastficid = 0;
	mFichadas.getLastFicIdMySql(function (lastficidfrommysql){
		console.log("lastficidfrommysql: "+lastficidfrommysql[0].maxfic_id)
		if(lastficidfrommysql[0].maxfic_id == null)
			lastficid = 0;
		else
			lastficid = lastficidfrommysql[0].maxfic_id;

		console.log("last fic id (en mysql) antes de la request: "+lastficid);
		
		mFichadas.getLatestFicSQL(lastficid, function (latestfic){
			//console.log(latestfic[0])
			console.log("length del obj latestfichadas: "+latestfic.length)//67
	   		var i = 0;
	        var querys = [];
	     	for (i = 0; i < latestfic.length; i++ ){
	     		query = "select fic_id from fichadas where fic_id = "+latestfic[i].FIC_ID;
	            querys.push({query: query, id: i});
	        }
	        
	        connection.connect();
	       	async.eachSeries(querys, function (data, callback) {
	       		console.log(data.query)
                connection.query(data.query, function(err, rows, fields) {
					if (err){
						throw err;
			   			console.log(err)
					}else{
						console.log("No errors in the query.")
					}
					console.log(rows.length)
					if (rows.length == 0){
						mFichadas.MySqlInsert(latestfic[data.id], function (){
							console.log(data.id)
						});
					}else{
						console.log("Registro fic_id = "+latestfic[data.id].FIC_ID+" existente en MySql");
					}
				});
				callback();
            }, function (err) {
            		if (err) { throw err; }
               		console.log('buuuuuuuuuuuu =(');
            	});
            //connection.end();
		});//end mF getlatestficsql
	});
}

function getAll(req, res){
	mFichadas.getAllFromMySql(function (fichadas){
		res.send(fichadas);
	});
}