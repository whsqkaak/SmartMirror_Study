// 창의인재원 식당 메뉴

var router = require('express').Router();
let request = require('request');

/* GET DATES */
var today = new Date();
var day_v = today.getDate();
var month_v = today.getMonth()+1;
var year_v = today.getFullYear();

/* GET home page. */
var url = 'https://bablabs.com/openapi/v1/campuses/BVRPhfbjvn/stores/LTI0MTEyNjM2?date=2019-11-26';
var headers = {
    'accesstoken': ''
};
var query = {
    type: "null",
    date: "2019-11-26"
};

function getMenus(URL, HEADERS, QUERY){
    return new Promise(resolve=>{
        request({url: URL, headers: HEADERS, query: QUERY}, function(err, res, body){
            var result = JSON.parse(body);
            var menu1 = result.store.menus[0].description;
            var menu2 = result.store.menus[1].description;
            var menu3 = result.store.menus[2].description;
            console.log(menu1);
            console.log(menu2);
            console.log(menu3);

            resolve(result)
        })
    })
}

router.get('/', function (req, res) {
    getMenus(url, headers, query)
    .then(function(result){
        m1 = result.store.menus[0].description;
        m2 = result.store.menus[1].description;
        m3 = result.store.menus[2].description;
        res.render('changin', {
            menu1: m1,
            menu2: m2,
            menu3: m3
        })
    })
});

module.exports = router;