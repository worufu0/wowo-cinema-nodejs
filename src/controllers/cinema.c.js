const { Cinema } = require('../models');
const appConfig = require('../configs/app');

class CinemaController {
    // [GET] /cinema/:unsignedName
    async index(req, res) {
        //const cinema = JSON.parse(
        //    JSON.stringify(
        //        await Cinema.findOne({
        //            include: CinemaImage,
        //            where: { unsignedName: req.params.unsignedName },
        //        })
        //    )
        //);

        res.render('pages/cinema', {
            //title: `${cinema.name} | ${appConfig.appName}`,
        });
    }
}

module.exports = new CinemaController();
