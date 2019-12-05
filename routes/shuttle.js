var router = require('express').Router();
let request = require('request');
let dateutil = require('date-utils');
console.log("index Router");
/* GET home page. */

//셔틀콕 내부행 조회

function getbus() {
  return new Promise(resolve => {
    request({ url: 'https://hyu-shuttlebus.appspot.com/shuttlecock_o'}, function(
      err,
      data,
      body
    ) {
      var result = JSON.parse(body);
      resolve(result);
    });
  });
}

router.get("/", function(req, res) {
    getbus().then(function(result) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        let buslst = [];
        let tempstr = {};
        for (let i = 0; i < result.length; i++) {
            let temp = result[i].time.split(":");
            if (parseInt(temp[0]) * 60 +parseInt(temp[1]) -parseInt(hour) * 60 -parseInt(min) > 0) {
                let tmpdate = Math.floor(
                    new Date(year, month - 1, day, temp[0], temp[1], sec) / 1000
                );
                tempstr = { time: tmpdate, type: result[i].type };
                buslst.push(result[i].time);
            }
            else{
                buslst.push(result[0].time)
            }
        }

        console.log(buslst[0]);

    res.render("bus", {
      bus: buslst[0]
    });
  });
});

module.exports = router;
module.exports = getbus;