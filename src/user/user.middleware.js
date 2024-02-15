const { validateToken } = require('../database/token');

// Middleware untuk verifikasi token
async function userMiddleware(req, res, next) {
  // Dapatkan token dari header Authorization
  const token = req.headers.authorization;

  // Jika token tidak tersedia
  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    // Verifikasi token
    const decoded = await validateToken(token);
    console.log(decoded);
    // Tambahkan objek user ke req untuk digunakan di endpoint selanjutnya
    req.user = decoded;

    next(); // Lanjutkan ke endpoint berikutnya
  } catch (error) {
    console.error('Error during token verification:', error);
    return res.status(403).json({ message: 'Token tidak valid' });
  }
}

module.exports = userMiddleware;
