// the params for the title bar
var pgTitle = {
    home:          'Take the Airline Survey!',
    doSurvey:      'Fill In the Survey Questions!',
    finishSurvey:  'Thank you for your input!',
    allsurveys:     'The full Monty'
};
exports.getPgTitle = function(name) {
    return pgTitle[name];
};
// the params for the survey
var catCode = ['rtFriend', 'rtSpace', 'rtComfort', 'rtClean', 'rtNoise'];
var catTxt = ['Friendliness of customer staff', 'Space for luggage storage', 'Comfort of seating', 
              'Cleanliness of aircraft', 'Noise level of aircraft'];
var rateKey = ['Neutral', 'Poor', 'Fair', 'Good', 'Excellent'];
var reqField = ['carrierInput', 'flightNum', 'flightDest', 'flightDate', catCode[0], catCode[1], catCode[2], catCode[3], catCode[4]];
var nonReqField = ['respFName', 'respLName', 'respEmail'];
var dispFrmFldRq = ['Airline Carrier Name', 'Flight Number', 'Flight Destination', 'Date of Flight', catTxt[0], catTxt[1], catTxt[2],
                    catTxt[3], catTxt[4]];
var dispFrmFldNrq = ['Your First name', 'Your Last Name', 'Your Email'];
//for dbParams use 
var allFields = reqField.concat(nonReqField);

exports.getCatCode = function(num) {
  return catCode[num];  
};
exports.getCatCodeLen = function() {
  return catCode.length;  
};
exports.getCatTxt = function() {
  return catTxt;  
};
exports.getRateKey = function() {
    return rateKey;
}
exports.getTheRateKey = function(num) {
  return rateKey[num];  
};
exports.getReqField = function(num) {
  return reqField[num]; 
};
exports.getReqFieldLen = function() {
  return reqField.length;  
};
exports.getNonReqField = function(num) {
    return nonReqField[num];
}; 
exports.getNonReqFieldLen = function() {
    return nonReqField.length;
};
exports.getAllFields = function(num) {
    return allFields[num];
}
exports.getAllFieldsLen = function() {
    return allFields.length;
};

exports.getRadioFields = function() {
    var txt = '';
    for (var i = 0; i < catTxt.length; i++) {
        txt += '<aside class="frmRw"> <div class="frmRtLdCl">' + catTxt[i] + '</div> ';
        for (k = 0; k < rateKey.length; k++) {
            txt += '<div class="frmRtCl"><input type="radio" name="' + catCode[i] + '" value="' + k + '" /></div> ';
        }
        txt += '</aside> ';
    }
    return txt;
};
exports.getDispForm = function(inpObj) {
    for (var i = 0; i < catCode.length; i++) {
        inpObj[catCode[i]] = rateKey[inpObj[catCode[i]]];    
    }
    var disp = {};
    for (var i = 0; i < reqField.length; i++) {
        disp[dispFrmFldRq[i]] = inpObj[reqField[i]];
    }
    for (var i = 0; i < nonReqField.length; i++) {
        disp[dispFrmFldNrq[i]] = inpObj[nonReqField[i]];
    }
    return disp;
}