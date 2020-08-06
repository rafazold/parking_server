module.exports = class Slot {

    constructor(carNumber, slotNumber, status) {
        this.carNumber = carNumber;
        this.slotNumber = slotNumber.toString();
        this.status = status;
    }
}