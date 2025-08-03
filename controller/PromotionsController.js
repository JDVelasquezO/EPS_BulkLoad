import connPromise from "../config/conn.js";
import queryInsertReqPromotion from "../functions/promotions/insertReqPromotions.js";

const controller = {};

controller.insertReqPromotions = async (req, res) => {
    try {

        if (!req.body.idDocente || !req.body.idEstado ||
            !req.body.idUnidadAcademica || !req.body.idTipoPromocion ||
            !req.body.noIngreso
        ) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        let idDocente, idEstado, idUnidadAcademica, idTipoPromocion, noIngreso;

        try {
            idDocente = parseInt(JSON.parse(req.body.idDocente));
            idEstado = parseInt(JSON.parse(req.body.idEstado));
            idUnidadAcademica = parseInt(JSON.parse(req.body.idUnidadAcademica));
            idTipoPromocion = parseInt(JSON.parse(req.body.idTipoPromocion));
            noIngreso = JSON.parse(req.body.noIngreso);
        } catch (e) {
            return res.status(400).json({ error: "Formato JSON inválido." });
        }

        const conn = await connPromise;
        const rows = await conn.query(queryInsertReqPromotion,
            [noIngreso, idDocente, idEstado, idUnidadAcademica, idTipoPromocion]);

        console.log(rows);

        res.json({
            error: null,
            rows: rows,
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Error al insertar promociones",
            error: e.message || "Error desconocido"
        });
    }
}

export default controller;