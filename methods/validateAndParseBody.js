export const validateAndParseBody = (req, res, requiredFields) => {
    try {
        const parsedData = {};

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `El campo '${field}' es obligatorio.` });
            }

            try {
                parsedData[field] = JSON.parse(req.body[field]);
            } catch (e) {
                return res.status(400).json({ error: `Formato JSON inválido en '${field}'.` });
            }

            // Si el campo debe ser un array, validarlo
            if (Array.isArray(parsedData[field]) && parsedData[field].length === 0) {
                return res.status(400).json({ error: `El campo '${field}' debe ser un array no vacío.` });
            }
        }

        return parsedData;
    } catch (e) {
        return res.status(500).json({ error: "Error inesperado en la validación del request." });
    }
};