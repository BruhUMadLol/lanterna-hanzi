import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/ui',webServer:process.env.TEST_URL?undefined:{command:'node scripts/serve.mjs',url:'http://127.0.0.1:5176',reuseExistingServer:false},use:{baseURL:process.env.TEST_URL||'http://127.0.0.1:5176',channel:'msedge',headless:true},workers:1,reporter:'list'});
