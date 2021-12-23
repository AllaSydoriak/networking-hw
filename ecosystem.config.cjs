module.exports = {
  apps : [{
    name: 'netwoking-hw',
    script: 'index.js',
    watch: true,
    instances: 'max',
    exec_mode: 'cluster',
    env_development: {
      PORT: 8080,
      origin: '',
      NODE_ENV: 'development',
    },
    env_production: {
      PORT: 8080,
      origin: 'https://somedomain.com',
      NODE_ENV: 'production',
    },
  }],
};
