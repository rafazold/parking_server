const fs = require('fs');

const getSlots = (callback) => {
    fs.readFile('./parking.json', function(err,result) {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(result.toString()));
        }
    });
}



module.exports = {
    getSlots
}