var SQLconn = require('../config/db').SQLconn;

module.exports = {
	getSomething: getSomething
}

function getSomething(cb){
	conn("select * from ", cb);
}