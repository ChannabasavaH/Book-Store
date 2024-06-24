import admin from 'firebase-admin';

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Authorization header is missing');
    }

    const tokenId = authHeader.split(' ')[1];
    if (!tokenId) {
        return res.status(401).send('Token is missing');
    }

    try {
        const auth = admin.auth();
        const decodedToken = await auth.verifyIdToken(tokenId);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(403).send('Unauthorized');
    }
}

export default verifyToken;
