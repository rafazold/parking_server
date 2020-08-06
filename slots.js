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
        let firstAvailableSlot = slots.find(slot => slot.status === 'available');
        if (err) {
            callback(err);
        } else if (
            !firstAvailableSlot && 
            process.env.PARKINGSIZE <= slots.length
            ) {
                callback(null, null);            
            } else {
                let nextSlotNumber;
                if (!firstAvailableSlot) {nextSlotNumber = slots.length + 1;}
                    
                const newSlot = new Slot(carId, nextSlotNumber || firstAvailableSlot.slotNumber, 'full');
                const newSlots = slots.filter(slot => slot.slotNumber !== nextSlotNumber);
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