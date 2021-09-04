const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.status(404)
    next(error)
  }

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusSode === 200 ? 500 : res.statusCode
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.status(statusCode)
    res.json({
      message: err.message  
    })
  }
  
export {notFound, errorHandler}