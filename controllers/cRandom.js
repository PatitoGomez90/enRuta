var mRandom = require('../models/mRandom');
var mItems = require('../models/mItems');
var mLugares = require('../models/mLugares');
var mSectores = require('../models/mSectores');
var mysql = require('mysql');

module.exports = {
	getAsd: getAsd,
	postAsd: postAsd
};

function getAsd(req, res) {
	res.render('random', {
    	pagename: 'Hacé clic en el botón!'
  	});  
};

function postAsd(req, res){
	//traer todo de random
	var connection = mysql.createConnection({
		user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Maresa',
	    dateStrings : true
	});

	//console.log('/--------/ DEBUG USE /---------/');
	//console.log(query);
	connection.connect();


	mRandom.getAll(function (random){
		mItems.getAll(function (items){
			mLugares.getAll(function (lugares){
				mSectores.getAll(function (sectores){
					var i = 0;
					//recorrerlo
					for (i = 0 ; i < random.length ; i++){
						var x = 0;
						var idsave = 0;

						if (random[i].Sector == "TAREAS GRAL" || random[i].Sector == "GRALES" ){
							idsave = 3;
						}else{
							if (random[i].Sector == "ACERÍA"){
								idsave = 4;
							}else{
								if(random[i].Sector == "COQUERÍA"){
									idsave=5;
								}else{
									idsave=7;
								}
							}
						}

						connection.query("insert into items(numero, nombre, id_sector_fk, um, activa) values("+random[i].subpos+", '"+random[i].descripcion+"', "+idsave+", '"+random[i].um+"', 1) ", function(err, rows, fields) {
							if (err) throw err;
						    //console.log(err)
						    //console.log(rows)
						    //console.log(fields)
							console.log("guardado item n°"+i)
						    //cb(rows);
						});
					}
  					connection.end();
				});
			});
		});
	});
}


