const setRoutes = () => {
    app.get('/', (req, res) => returnJSON(res, [1, 2, 3, 4]));
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}
