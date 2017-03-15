/* 
 * i want to modify or make more efficient that checkform() validator. but javascript can be a beast!
 * need to fix autocomplete box to position exactly under input box for all different browsers
 * get xy coordinates of input box and then adjust autocomplete box with position absolute accordingly.
 * add a on down arrow key press, the focus goes to the autocomplete box. 
 */
function searchCarriers() {
    
    searchChar = document.getElementById("carrierInput").value;
    if (searchChar !== "") {
        $.getJSON('/searchCarrier?aChar='+searchChar, function(result){     //test at home 
            $.each(result, function(index, carrierName){
                $('#resultBox').append($('<option>', {
    			         value: carrierName, 
    			         text: carrierName
                }));
            });
        });
    }
    else {
        $('#searchResults').hide();
    }
}
function killSearch() {
    $('#searchResults').hide();
}
function checkForm() {
    $("#errorBox").hide();
    var formValid = false;
    var msg = "";
    var tbxName = document.getElementById("carrierInput").value;
    var tbxFlight = document.getElementById("flightNum").value;
    var tbxDest = document.getElementById("flightDest").value;
    var tbxDate = document.getElementById("flightDate").value;
    var tbxInput = true;
    var radFriend = false;
    var radSpace = false;
    var radComfort = false;
    var radClean = false;
    var radNoise = false;
    
    var inputRadio = document.frmAirline.rtFriend;
    for (var i = 0; i< inputRadio.length; i++) {
        if (inputRadio[i].checked)
            radFriend = true;
    }
    if (!radFriend)
        msg = "Friendliness.";
   
    inputRadio = document.frmAirline.rtSpace;
    for (var i = 0; i <inputRadio.length; i++) {
        if (inputRadio[i].checked) 
            radSpace = true;
    }
    if (!radSpace)
        msg = "Space.";
    
    inputRadio = document.frmAirline.rtComfort;
    for (var i = 0; i< inputRadio.length; i++) {
        if (inputRadio[i].checked) 
            radComfort = true;
    }
    if (!radComfort)
        msg = "Comfort of seats.";
    
    inputRadio = document.frmAirline.rtClean;
    for (var i = 0; i < inputRadio.length; i++) {
        if (inputRadio[i].checked) 
            radClean = true;
    }
    if (!radClean) 
        msg = "Cleanliness.";
    
    inputRadio = document.frmAirline.rtNoise;
    for (var i = 0; i < inputRadio.length; i++) {
        if (inputRadio[i].checked) 
            radNoise = true;
    }
    if (!radNoise) 
        msg = "Noise level.";
    
    msg = "Select an option for " + msg;
    tbxInput = (tbxName !== "" || tbxFlight !== "" || tbxDest !== "" || tbxDate !== "");
    msg = (!tbxInput) ? "Airline name, flight#, dest and date must be filled in." : msg;
       
    formValid = (radFriend && radSpace && radComfort && radClean && radNoise && tbxInput);
    if (!formValid) {
        $('#errorMsg').html(msg); 
        $('#errorBox').show();
        msg = "";
    }
    return formValid;
}
$('document').ready(function() {
    $('#resultBox').click(function() {
        var name =  $('#resultBox').val();
        $('#carrierInput').val(name);
        killSearch();
    });
});
/* recreant84suborder

var xmlhttp;
        if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
        else if (window.ActiveXObject) xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.open("GET","/searchCarrier?aChar="+searchChar,true);
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {
            var data =  xmlhttp.responseText;
            if (data.length > 0) {
                $('#resultBox').empty();
                var lim = (data.length > 8) ? 8 : data.length;      //limit to 8 entries on the autocomplete
                for (var i  = 1; i < lim; i++) {
                    $('#resultBox').append($('<option>', {
    			         value: data[i]['carrierName'], 
    			         text: data[i]['carrierName']
                    }));  
                }
                $('#resultBox').attr('size', lim-1);    //
                $('#searchResults').show();
            } 
        };
        
*/