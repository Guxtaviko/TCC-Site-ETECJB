const validateInputs = (optionals, item) => {
    return (req, res, next) => {
        const fields = Object.entries(req.body)
        const requiredFields = fields.filter(([key, _]) => !optionals.includes(key))
        const invalidFields = requiredFields.filter(([_, value]) => value.trim().length == 0)
        
        if(invalidFields.length != 0) return res.render(`admin/forms/${item}`, {
            [item]: {},
            errors: {
                empty: Object.keys(Object.fromEntries(invalidFields))
            }
        })
        next()
    }
}

module.exports = validateInputs