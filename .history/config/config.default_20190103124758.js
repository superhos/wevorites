'use strict';
require("dotenv").config()
module.exports = appInfo => {

  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546418708365_8550';

  config.githubConfig = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  }

  // add your config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27019/wevorites',
      options: {},
    },
  };

  config.view = {
    mapping: {'.html': 'ejs'} //左边写成.html后缀，会自动渲染.html文件
  } 

  return config;
};
