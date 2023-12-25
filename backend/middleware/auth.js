
function authenticateMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    const secretKey = 'your_secret_key'; // Replace with the same secret key used for token generation

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.redirect('http://localhost:5173/login');
        }

        req.userId = decoded.userId; // Attach the userId to the request for future use
        next(); // Move on to the next middleware or route handler
    });
}


module.exports = authenticateMiddleware