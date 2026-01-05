async function verifyRole(request, response, next) {
  const { role } = request.user;
  if (!role) return response.status(400).json({ message: 'Role is missing' });

  if (role === 'ADMIN' || role === 'CONTRIBUTOR') {
    return next();
  }
  return response.status(400).json({ message: 'Restricted access' });
}

module.exports = { verifyRole };
