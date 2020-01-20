var sqlite3 = require('sqlite3').verbose()
const express = require('express')
const app = express()
app.use(express.static('public'));
app.set('view engine', 'pug')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(urlencodedParser);
app.use(bodyParser.json());

var db = new sqlite3.Database('music2.db');


app.get('/', function (req, res, next) {
    
        res.render('sql1',{});
    
});


/*app.get('/', function (req, res, next) {
    var query = "\
        SELECT s.song_name, s.artist\
        FROM song s, playlist p, include i\
        WHERE p.p_name= '朕のプレイリスト'\
        and i.song_id = s.song_id\
        and p.p_id = i.p_id\
        ";
    console.log(query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
	    results: rows           
        })
	
    });
    next;
});*/



app.post('/song', function (req, res, next) {

    song_name_c = req.body['song_name_context'];
    console.log(song_name_c);
    var query = "\
     SELECT song_name,artist,album \
     FROM song\
     WHERE song_name like '%"+song_name_c+"%'"
 
    console.log(query);
    
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    });
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))

function getCurrentTime() {
	var now = new Date();
	var res = "" + now.getFullYear() + "/" + padZero(now.getMonth() + 1) + 
		"/" + padZero(now.getDate()) + " " + padZero(now.getHours()) + ":" + 
		padZero(now.getMinutes()) + ":" + padZero(now.getSeconds());
	return res;
}

function padZero(num) {
	var result;
	if (num < 10) {
		result = "0" + num;
	} else {
		result = "" + num;
	}
	return result;
}
