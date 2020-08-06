module.exports = class Slot {

    constructor(carNumber, slotNumber) {
        this.carNumber = carNumber;
        this.slotNumber = slotNumber;
        this.status = 'full';
    }
}