const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log del error para depuración
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'Error interno del servidor',
        status: err.status || 500,
      },
    });
  };
  
  export default errorHandler;
  