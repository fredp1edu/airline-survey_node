var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout: 'airlineMain'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
var params = require('./lib/airlineParams.js');
app.use(require('body-parser')());
var credentials = require('./credentials.js');      // remember to set your credentials.js file 
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());
/*  the two lines are for mocha/chai testing
    app.use(function(request, response, next) {
    response.locals.showTests = app.get('env') !== 'production' && request.query.test === '1';
    next();
}); */

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.render('home', {pgTitle: params.pgTitle.home} );
});
app.get('/dosurvey', function(request, response) {
    var tmpInput = request.session.tmpInput;
    response.render('dosurvey', {pgTitle: params.pgTitle.doSurvey,
                                 jsFormChk: true,
                                 params: params,
                                 tmpInput: tmpInput });
});
app.post('/dosurvey', function(request, response) {         //add referrer page restrictions
    var tmpInput = {};
    var passThru = true;
    for (var i = 0; i < params.getReqFieldLen(); i++) {
        tmpInput[params.getReqField(i)] = request.body[params.getReqField(i)];      // add trim()
        if (request.body[params.getReqField(i)] === "") {        // add more server side verification (email/date)
            passThru = false;
        }
    }
    if (!passThru) {
        request.session.tmpInput = tmpInput;
        request.session.passThru = passThru;
        return response.redirect(303, '/dosurvey');
    }
    for (var i = 0; i < params.getNonReqFieldLen(); i++) {
        tmpInput[params.getNonReqField(i)] = request.body[params.getNonReqField(i)];  // add trim()
    }
    request.session.pstInput = tmpInput;
    response.redirect(303, '/finishsurvey');
});
app.get('/finishsurvey', function(request, response) {       //add referrer page restrictions
    var pstInput = request.session.pstInput;            // add db text filtering methods before loading to DB
    var dispFrm = params.getDispForm(pstInput);
    response.render('finishsurvey', {pgTitle: params.pgTitle.finishSurvey,
                                     dispFrm: dispFrm }); 
});
app.use(function(request, response) {
    response.status(404);
    response.render('404', {layout: 'airlineError'});
});
app.use(function(err, request, response, next) {
    console.error(err.stack);
    response.status(500);
    response.render('500', {layout: 'airlineError'});
});
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Cntrl-C to terminate.');
});
