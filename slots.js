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

function getSlotById(slotId, callback) {
    getSlots(function (err, slots) {
        if (err) {
            callback(err);
        } else if (slots && slots.length) {
            callback(null, slots.find(slot => slot.slotNumber === slotId));
        } else {
            callback(null, null);
        }
    });
}

module.exports = {
    getSlots,
    getSlotById
}