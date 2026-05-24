const protect = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, invalid API key',
    });
  }

  next();
};

module.exports = { protect };
