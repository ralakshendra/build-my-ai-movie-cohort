const {defineConfig} = require('playwright/test');
module.exports = defineConfig({
  testDir: '.',
  testMatch: 'visual.spec.js',
  timeout: 30000,
  retries: 1,
  workers: 1,
  use: {...(process.platform==='win32'?{channel:'chrome'}:{}),browserName:'chromium', colorScheme:'dark', screenshot:'off', trace:'retain-on-failure'},
  reporter: [['list'], ['html',{outputFolder:'qa/report',open:'never'}]]
});

