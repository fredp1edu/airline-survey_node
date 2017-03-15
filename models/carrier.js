var mongoose = require('mongoose');

var field = ['carrierCode', 'carrierName', 'carrierLong', 'carrierBase'];
var schema = {};
for (i = 0; i < field.length; i++) {             
    schema[field[i]] = 'String';
}
var carrierSchema = mongoose.Schema(schema);
var Carrier = mongoose.model('carriercode', carrierSchema);

module.exports = Carrier;

