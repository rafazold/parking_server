const fs = require('fs');
const Slot = require('./classes/slot.js');

const getSlots = (callback) => {
    fs.readFile('./parking.json', (err,result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(result.toString()));
        }
    });
}

const getSlotById = (slotId, callback) => {
    getSlots((err, slots)  => {
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
    getSlots((err, slots) => {
        if (err) {
            callback(err);
        } else if (slots && slots.length) {
            callback(null, slots.find(slot => slot.carNumber === carId));
        } else {
            callback(null, null);
        }
    });
}

const parkCar = (carId, callback) => {
    console.log('id: ', carId)
    getSlots((err, slots) => {
        const firstAvailableSlot = slots.find(slot => slot.status === 'available');
        if (err) {
            callback(err);
        } else if(!firstAvailableSlot) {
            callback(null, null);            
            } else {
                console.log('trying');
                const newSlots = slots.filter(slot => slot.slotNumber !== firstAvailableSlot.slotNumber);
                newSlot = new Slot(carId, firstAvailableSlot.slotNumber);
                newSlots.push(newSlot);
                console.log(newSlot);
                fs.writeFile('./parking.json', JSON.stringify(newSlots), () => callback(null, newSlot));
            }
            
        });
    }

module.exports = {
    getSlots,
    getSlotById,
    getCarById,
    parkCar
}