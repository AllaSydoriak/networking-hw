module.exports = {
  apps : [{
    name: 'netwoking-hw',
    script: 'index.js',
    watch: '.',
    instances: 1,
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
