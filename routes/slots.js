const {getSlots, parkCar, resetSlot} = require('../slots');


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
                const slot = slots.find(slot => slot.slotNumber === req.params.slotId);
                const car = slots.find(slot => slot.carNumber === req.params.slotId);
                if (err) {
                    res.status(500).end();
                } else if (!slot && !car){
                        return res.status(404).end();
                    }
                    res.json(slot || car).end();
            })
        })           

        .put('/api/park/:carId', (req, res) => {
            parkCar(req.params.carId, (err, newSlot) => {
                if (err) {
                    res.status(500).end();
                } else if (!newSlot){
                    return res.status(404).json({message: 'no available parking'}).end();
                } else {
                    res.json(newSlot).end();
                   }
            })
        })
        
        .put('/api/unpark/:slotId', (req, res) => {
            resetSlot(req.params.slotId, (err, newSlot) => {
                if (err) {
                    res.status(500).end();
                } else if (!newSlot){
                    return res.status(404).json({message: 'slot ID does not exist'}).end();
                } else {
                    res.json(newSlot).end();
                   }
            })
        })
}