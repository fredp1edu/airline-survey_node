var mongoose = require('mongoose');
var params = require('../lib/airlineParams.js');

var type = ['String', 'Number', 'String', 'Date', 'Number', 'Number', 'Number', 'Number', 'Number', 'String', 'String', 'String'];
var schema = {
    surveyDate: {
        type: Date,
        default: Date.now
    }
};

for (i = 0; i < type.length; i++) {
    schema[params.getAllFields(i)] = type[i];
}
var surveySchema = mongoose.Schema(schema);

surveySchema.methods.getRateKeyName = function() {
    
}

var SurveyModel = mongoose.model('airlinesurvey', surveySchema);
module.exports = SurveyModel;