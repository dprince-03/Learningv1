var fs = require('fs');
var rs = fs.createReadStream('./summer.html');
var events = require('events');
var evEm = new events.EventEmitter();


rs.on('open', function(){
    console.log(`The file is open`);
});


var myEH = function(){
    console.log('I hear a scream');
}


evEm.on('scream', myEH);


evEm.emit('scream');