//requiriendo modelo mensaje.js:
//var mAyuda = require('../models/mAyuda');
//requiriendo la conection string

module.exports = {
	getTest: getTest,
};

function getTest(req, res){
  node_xj = require("xls-to-json");
  node_xj({
    input: "./public/uploads/SALID.xls",  // input xls
    output: "./public/uploads/output.json", // output json
    sheet: "Sheet1",  // specific sheetname
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      console.log(result);
      res.render('testjson', {
          pagename: 'ProchemBio Test',
          result: result
      });
    }
  });

  
}