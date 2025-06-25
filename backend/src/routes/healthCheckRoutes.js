export function registerHealthCheck(app, getController) {
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
}
