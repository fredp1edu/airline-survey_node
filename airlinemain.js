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
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
switch(app.get('env')) {
    case 'development': 
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
};
var SurveyModel = require('./models/surveymodel.js');
var Carrier = require('./models/carrier.js');
/*  the two lines are for mocha/chai testing
    app.use(function(request, response, next) {
    response.locals.showTests = app.get('env') !== 'production' && request.query.test === '1';
    next();
}); */
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
    response.render('home', { pgTitle: params.getPgTitle('home') });
});
app.get('/searchCarrier', function(request, response) {         //for the autocomplete feature
    var aChar = request.query.aChar;
    var num = aChar.length;
    Carrier.find({carrierName: {$regex: new RegExp('^' + aChar), $options: 'i'}}, {"carrierName": 1, "_id": 0}, function(err, name) {
        if (err) throw err;
        response.json(name);
    });
});

app.get('/dosurvey', function(request, response) {
    var tmpInput = request.session.tmpInput;
    response.render('dosurvey', {pgTitle: params.getPgTitle('dosurvey'),
                                 jsFormChk: true,
                                 params: params,
                                 tmpInput: tmpInput });
});
app.post('/dosurvey', function(request, response) {         //add referrer page restrictions to disable back key
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
    request.session.pstInput = tmpInput;                    // add db text filtering methods before loading to DB

    //try putting this thing in the db
    var dbInput = new SurveyModel(tmpInput);        
    dbInput.save(function(err) {
        if (err) return console.error(err);
    });
    response.redirect(303, '/finishsurvey');
});
app.get('/finishsurvey', function(request, response) {       //add referrer page restrictions
    var pstInput = request.session.pstInput;                 // after dev is done, delete this session data in prod env   
    var dispFrm = params.getDispForm(pstInput);
    response.render('finishsurvey', {pgTitle: params.getPgTitle('finishsurvey'),
                                     dispFrm: dispFrm }); 
});
app.get('/allsurveys', function(request, response) {
    SurveyModel.find({}, function(err, surveys) {
        var surveyData = {
            surveys: surveys.map(function(survey) {
                for (var i = 0; i < params.getAllFieldsLen; i++) {
                    survey[params.getAllFields(i)] = survey[params.getAllFields(i)];
                }
                survey.rtFriendNm = params.getTheRateKey(survey.rtFriend);          //my loop doesn't work here. why?
                survey.rtSpaceNm = params.getTheRateKey(survey.rtSpace);                
                survey.rtComfortNm = params.getTheRateKey(survey.rtComfort);
                survey.rtCleanNm = params.getTheRateKey(survey.rtClean);
                survey.rtNoiseNm = params.getTheRateKey(survey.rtNoise);
                var dt = new Date(survey.flightDate);
                survey.flightDateNm = (dt.getUTCMonth()+1) + "/" + dt.getUTCDate() + "/" + dt.getUTCFullYear();
                return survey;
            })
        };
        // interesting, a console.log(surveys) or ...log(surveyData) won't show the new inputs, still conforms to schema fields;
        response.render('allsurveys', {pgTitle: params.getPgTitle('allsurveys'),
                                     surveys: surveys });
    });
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


/* don't understand why this doesn't work! why? because even in output, the fields are constrained to the data type in the schema
        var surveyData = {
            surveys: surveys.map(function(survey) {
                for (var i = 0; i < params.getAllFieldsLen; i++) {
                    for (var k = 0; k < params.getCatCodeLen; k++) {
                        if (survey[params.getAllFields(i)] == survey[params.getCatCode(k)])
                            survey[params.getAllFields(i)] = survey[params.getTheRateKey(survey[params.getAllFields(i)])];
                        else
                            survey[params.getAllFields(i)] = survey[params.getAllFields(i)];
                    }
                }
                return survey;
            })
        }
what about this? 
                for (var k = 0; k < params.getCatCodeLen; k++) {
                    newKey = params.getCatCode(k).concat('Nm');
                    survey[newKey] = params.getTheRateKey(survey[params.getCatCode(k)]);
                }

*/