const mapRoute = require('./map');
const aboutRoute = require('./about');
const bbsRoute = require('./bbs');
const businessRoute = require('./business');

const exportMethod = (app) => {
	app.use('/maps', mapRoute);
	app.use('/about', aboutRoute);
	app.use('/bbs', bbsRoute);
	app.use('/business', businessRoute);

	app.use("/", (req, res) => {
        res.render("index/index");
    });
};

module.exports = exportMethod;