let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');

// deepcode ignore UseCsurfForExpress: <please specify a reason of ignoring this>, deepcode ignore DisablePoweredBy: <please specify a reason of ignoring this>
let app = express();
let urlencodeParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

//Чтение из файла
let file = fs.readFileSync('film.json', 'utf8');
let jsObjectFilms = JSON.parse(file);
//Форма
// deepcode ignore NoRateLimitingForExpensiveWebOperation: <please specify a reason of ignoring this>
app.post('/add', urlencodeParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    let jsonData = fs.readFileSync('film.json', 'utf8');
    let all = jsonData.substring(0, jsonData.length - 1) + ', ' + JSON.stringify(req.body) + "]";
    console.log(all);
    fs.writeFileSync('film.json', all, function (error) {
        if (error) throw error;
        console.log("Асинхронная запись файла завершена.");
    });
    res.render('add');
});
//Сервер
app.listen(3000);

// deepcode ignore NoRateLimitingForExpensiveWebOperation: <please specify a reason of ignoring this>
app.get('/', function (req, res) {
    res.render('add');
});

// deepcode ignore NoRateLimitingForExpensiveWebOperation: <please specify a reason of ignoring this>, deepcode ignore NoRateLimitingForExpensiveWebOperation: <please specify a reason of ignoring this>
app.get('/:name', function (req, res) {
    if (req.params.name === 'add') {
        res.render('add');
    } else if (req.params.name === 'view') {
        res.render('view', { data: jsObjectFilms });
    } else {
        res.sendFile(__dirname + '/404.html');
    }
});