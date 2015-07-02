var mPruebaSQL = require('../models/mPruebaSQL');

module.exports = {
	getPrueba: getPrueba
};

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getPrueba(req, res) {
	mPruebaSQL.getSomething(function (something){
		console.log(something)
		res.render('pruebasql', {
		  	pagename: 'Prueba SQL',
		   	something: something
		});
	}); 
}