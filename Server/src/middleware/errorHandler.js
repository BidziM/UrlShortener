const errorHandler = (err, req, res, next) => {
    let message = err.message || "Internal Server Error";
    let statusCode = err.statusCode || 500;
    if(err.statusCode === 404){
      return res.status(404).send('404: We can not find this url');;
    }
    res.status(statusCode).json({ success: "false", message });
  };
  
export default errorHandler;