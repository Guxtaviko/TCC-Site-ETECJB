const { Op } = require("sequelize");
const paginate = async (model, page, limit, where, exclude) => {
    const startIndex = (page - 1) * limit;
    if (where) {
        const result = {
            model: await model.findAll({ 
                offset: startIndex, 
                limit: limit,
                where: {
                    [where.column]: {
                        [Op.startsWith]: where.item 
                    }
                }
            }),
            quantity: Math.ceil((await model.count({
                where: {
                    [where.column]: {
                        [Op.startsWith]: where.item 
                    }
                }
            }))/limit)
        }
        return result
    } else if (exclude) {
        const result = {
            model: await model.findAll({ offset: startIndex, limit: limit, attributes: {exclude: [exclude]}}),
            quantity: Math.ceil((await model.count())/limit),
        }
        return result
    } else {
        const result = {
            model: await model.findAll({ offset: startIndex, limit: limit, }),
            quantity: Math.ceil((await model.count())/limit)
        }
        return result
    }
}

module.exports = paginate