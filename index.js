const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const routes = require('./routes/router');

try {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/', routes);

    app.set('port', port);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
} catch (e) {
    console.error('Error al iniciar el servidor:', e.message);
    process.exit(1); // Salir con código de error
}