import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: any) => {
    // Thay 'your-secret-key' bằng một chuỗi bí mật (secret key) riêng của bạn
    const accessToken = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });
    return accessToken;
};
