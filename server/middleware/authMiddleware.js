import jwt from 'jsonwebtoken'
const SECRET_KEY = "d5db26ad72217185d796ed0b1f69020a4f674d0979308577c2803386cfc9808b"

function authenticateToken(req, res, next) {
    // Ensure req.cookies exists
    if (!req.cookies) {
        return res.status(401).json({ message: 'Access denied. No cookies found.' });

    }
    const token = req.cookies.token; // Read token from HTTP-only cookie

if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
}
try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach decoded token info to the request
    next();
} catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
}
} 

export default authenticateToken;