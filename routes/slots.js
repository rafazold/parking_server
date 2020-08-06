const {getSlots, getSlotById, getCarById, parkCar} = require('../slots');


module.exports = (app) => {
    app
        .get('/api/slots', (req, res) => {
            getSlots((err, slots) => {
                if (err) {
                    res.status(500).end();
                } else {
                    res.json(slots).end();
                }
            })
        })

        .get('/api/slots/:slotId', (req, res) => {
            getSlots((err, slots) => {
                if (err) {
                    res.status(500).end();
                } else {
                    const slot = slots.find(slot => slot.slotNumber === req.params.slotId);
                    const car = slots.find(slot => slot.carNumber === req.params.slotId);
                    if(!slot && !car){
                        return res.status(404).end();
                    }
                    res.json(slot || car).end();
                }
            })

            })           

        .put('/api/slots/:carId', (req, res) => {
            parkCar(req.params.carId, (err, newSlot) => {
                if (err) {
                    res.status(500).end();
                } else if (!newSlot){
                    console.log('wtf');
                    return res.status(404).json({message: 'no available parking'}).end();
                } else {
                    res.json(newSlot).end();
                   }
            })
        })
}