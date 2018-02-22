'use strict';
/*global angular*/


angular
  .module('hiApp')
  .service('APIInterceptor', function ($rootScope, session) {
    var service = this;
    service.request = function (config) {
      var accesToken = session.getAccessToken();      
      if(accesToken){        
        config.headers['access-token'] = accesToken;
      }
      return config;
    };
  });