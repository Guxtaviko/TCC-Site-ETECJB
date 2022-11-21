const deleteUpload = require('../helpers/deleteUpload')

const onlyNumber = (fields, item) => {
    return (req, res, next) => {
        const onlyNumberFields = Object.entries(req.body).filter(([key, _]) => fields.includes(key))
        const invalidFields = onlyNumberFields.filter(([_, value]) => !/^[0-9]*$/.test(value.trim()))

        if(invalidFields.length != 0) {
            deleteUpload(req)

            return res.render(`admin/forms/${item}`, {
                [item]: {},
                errors: {
                    invalid: Object.keys(Object.fromEntries(invalidFields))
                }
            })
        }
        next()
    }
}

module.exports = onlyNumber