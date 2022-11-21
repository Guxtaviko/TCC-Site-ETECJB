const deleteUpload = require('../helpers/deleteUpload')

const onlyLetter = (optionals, item) => {
    return (req, res, next) => {
        const fields = Object.entries(req.body)
        const onlyLetterFields = fields.filter(([key, _]) => !optionals.includes(key))
        const invalidFields = onlyLetterFields.filter(([_, value]) => !/^[a-zA-Z\u00C0-\u00FF'\s()]+$/.test(value))

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

module.exports = onlyLetter