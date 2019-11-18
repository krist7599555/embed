module.exports = {
  apps: [
    {
      name: 'embed',
      script: 'index.js',
      args: '',
      autorestart: true,
      watch: true,
      exec_mode : "cluster",
      env: {
        NODE_ENV: 'development',
        PORT: '1899',
        WS_URL: "ws://localhost:1899"
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '1899',
        WS_URL: "wss://embed.krist7599555.ml",
        // WS_URL: "ws://128.199.216.159:1899",
      }
    }
  ]
};
