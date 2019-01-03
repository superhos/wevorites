'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546418708365_8550';

  config.githubConfig = {
    clientId: process.env.,
    clientSecret: 'ad78e1910395dd23953c8e51c1e7b78bc8bbb7e9'
  }

  // add your config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27019/wevorites',
      options: {},
    },
  };

  return config;
};
