const success = require('../utils/success');
const recordService = require('../services/recordService');

const getRecords = async (req, res, next) => {
    try {
        const filter = {
            'startDate' : req.body.startDate,
            'endDate' : req.body.endDate,
            'minCount' : req.body.minCount,
            'maxCount' : req.body.maxCount
        };

        const result = await recordService.queryRecords(filter);
        res.send(success({ records: [...result] }));
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getRecords,
};

