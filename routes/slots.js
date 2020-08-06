const {getSlots, getSlotById, getCarById} = require('../slots');

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

             // Maybe you want to return something else if both found
            })           

        .put('/api/slots/:cadId', (req, res) => {
            parkCar(req.params.carId, (err, slot) => {
                if (err) {
                    res.status(500).end();
                } else if (!slot) {
                    res.status(404).json({message: 'so slots available'}).end();
                } else {
                    res.json(slot).end();
                }
            });
        })
}