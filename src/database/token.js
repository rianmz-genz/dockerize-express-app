
const generateToken = async (user) => {
  const tokenData = {
    user: user,
    expiredAt: Date.now() + 24 * 60 * 60 * 1000, 
  };

  const token = btoa(JSON.stringify(tokenData));
  return token;
};

const validateToken = async (token) => {
  try {
    const decodedToken = JSON.parse(atob(token));

    if (decodedToken.expiredAt < Date.now()) {
      throw new Error('Token has expired');
    }

    return decodedToken.user;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, validateToken };
