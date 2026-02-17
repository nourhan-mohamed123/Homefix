import jwt from 'jsonwebtoken';

export async function generateToken(userId, email, role, res) {
    const token = jwt.sign({ userId, email, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Cross-origin (frontend on localhost, backend on ngrok) requires sameSite: 'none' and secure: true
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isProduction ? 'strict' : 'none',
        secure: true  // required for sameSite: 'none' and for HTTPS (ngrok/production)
    });

    return token;
}

