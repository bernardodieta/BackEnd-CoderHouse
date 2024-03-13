import express from 'express';

const viewsRouter = express.Router();

viewsRouter.get('/', (req, res) => {
    res.render('index', {})
})


viewsRouter.get("/message", (req, res) => {
    res.render("messages");
});

export { viewsRouter };