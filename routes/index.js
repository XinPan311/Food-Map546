const mapRoute = require('./map');

const exportMethod = (app) => {
	app.use('/maps', mapRoute);

	app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = exportMethod;