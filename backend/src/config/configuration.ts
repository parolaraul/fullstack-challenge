export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo: {
    url:
      process.env.MONGO_URL ||
      'mongodb://admin_user:admin_pass@localhost:27017/backend?authSource=admin',
  },
});
