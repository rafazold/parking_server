const {getSlots} = require('../slots');

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
}