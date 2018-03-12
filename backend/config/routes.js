module.exports.routes = {
  '/logout': 'UserController.logout',
  'POST /login': 'UserController.login',
  'POST /api/user': 'UserController.signup',
  'GET /api/hobby/:userId': 'HobbyController.fetch',
  'POST /api/hobby/:userId': 'HobbyController.create',
  'PUT /api/hobby/:id': 'HobbyController.update',
  'DELETE /api/hobby/:id': 'HobbyController.delete'
};
