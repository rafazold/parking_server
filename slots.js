const fs = require('fs');
const Slot = require('./models/slot.js');

const getSlots = (callback) => {
    fs.readFile('./parking.json', (err,result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(result.toString()));
        }
    });
}


const parkCar = (carId, callback) => {
    getSlots((err, slots) => {
        const firstAvailableSlot = slots.find(slot => slot.status === 'available');
        if (err) {
            callback(err);
        } else if(!firstAvailableSlot) {
            callback(null, null);            
            } else {
                const newSlots = slots.filter(slot => slot.slotNumber !== firstAvailableSlot.slotNumber);
                newSlot = new Slot(carId, firstAvailableSlot.slotNumber, 'full');
                newSlots.push(newSlot);
                fs.writeFile('./parking.json', JSON.stringify(newSlots), () => callback(null, newSlot));
            }
            
        });
    }

const resetSlot = (slotId, callback) => {
    getSlots((err, slots) => {
        const slot = slots.find(slot => slot.slotNumber === slotId);
        const newSlots = slots.filter(slot => slot.slotNumber !== slotId);
        if (err) {
            callback(err);
        } else if (!slot){
            callback(null, null);
        } else {
            newSlot = new Slot('', slotId, 'available');
            newSlots.push(newSlot);
            fs.writeFile('./parking.json', JSON.stringify(newSlots), () => callback(null, newSlot));
            }
            
        });
}

module.exports = {
    getSlots,
    parkCar,
    resetSlot
}