const {getSlots, getSlotById} = require('../slots');

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

        .get('/api/slots/:slotId', (req, res) => {
            getSlotById(req.params.slotId, (err, slot) => {
                if (err) {
                    res.status(500).end()
                } else if (!slot) {
                    res.status(404).json({message: 'slot not found'}).end();
                } else {
                    res.json(slot).end();
                }
            })
        })
}