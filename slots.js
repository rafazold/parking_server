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

const getSlotById = (slotId, callback) => {
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

const getCarById = (carId, callback) => {
    getSlots(function (err, slots) {
        if (err) {
            callback(err);
        } else if (slots && slots.length) {
            callback(null, slots.find(slot => slot.carNumber === carId));
        } else {
            callback(null, null);
        }
    });
}

module.exports = {
    getSlots,
    getSlotById,
    getCarById
}