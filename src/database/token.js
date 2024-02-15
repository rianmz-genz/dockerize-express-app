// Fungsi untuk generate token dengan expiredAt 1 hari
const generateToken = async (user) => {
  const tokenData = {
    user: user,
    expiredAt: Date.now() + 24 * 60 * 60 * 1000, // 1 hari
  };

  const token = btoa(JSON.stringify(tokenData));
  return token;
};

// Fungsi untuk memvalidasi token
const validateToken = async (token) => {
  try {
    // Decode token
    const decodedToken = JSON.parse(atob(token));

    // Check if token has expired
    if (decodedToken.expiredAt < Date.now()) {
      throw new Error('Token has expired');
    }

    return decodedToken.user;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, validateToken };
