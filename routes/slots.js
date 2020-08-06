const {getSlots, getSlotById, getCarById} = require('../slots');

module.exports = (app) => {
    app
        .get('/api/slots', (req, res) => {
            getSlots((err, slots) => {
                if (err) {
                    res.status(500).end()
                } else {
                    res.json(slots).end();
                }
            })
        })

        .get('/api/slots/:id', (req, res) => {
            getSlotById(req.params.id, (err, slot) => {
                if (err) {
                    res.status(500).end()
                } else if (!slot) {
                    getCarById(req.params.id, (err, car) => {
                        if (err) {
                            res.status(500).end()
                        } else if (!car) {
                            res.status(404).json({message: 'no slot or car found'}).end();
                        } else {
                            res.json(car).end();
                        }
                    })
                } else {
                    res.json(slot).end();
                }
            })
        })
}