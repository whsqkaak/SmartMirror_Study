var router = require('express').Router();
var bus = require('../routes/shuttle.js');

const cheerio = require('cheerio');
const request = require('request');

/* GET home page. */
router.get('/', function (req, res) {
    bus().then(function(result) {
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

        let url = "https://weather.naver.com/rgn/cityWetrCity.nhn?cityRgnCd=CT001017"

        request(url, function(error, response, body) {
            let date = [];
            let temp = [];
            const $ = cheerio.load(body);
            for(let i=1; i<3; i++){
                $('#content > table.tbl_weather.tbl_today3 > thead > tr > th:nth-child('+i+')').each(function(){
                    date.push($(this).text());
                })
            }
            
            for(let i = 1; i< 3; i++){
                for(let j = 1; j< 4; j=j+2){
                    $('#content > table.tbl_weather.tbl_today3 > tbody > tr > td:nth-child('+i+') > div:nth-child('+j+') > ul').each(function(){
                        temp.push($(this).text());
                    })
                }
            }
            res.render('index',{
                bus : buslst[0],
                date : date,
                temp : temp,
            });
        });
    });
});

module.exports = router;