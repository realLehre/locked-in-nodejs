const notFound = (req, res) => {
    res.status(400).json({
        message: `This route ${req.method} ${req.originalUrl} not found`
    })
}

export default notFound;
