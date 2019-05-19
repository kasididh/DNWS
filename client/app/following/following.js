'use strict';

angular.module('followingList', ['ngRoute'])
  .component('followingList', {
    templateUrl: 'following/following.html',
    controller: ['$http', '$rootScope', function TweetListController($http, $rootScope) {
      var self = this;

      const requestOptions = {
          headers: { 'X-session': $rootScope.x_session }
      };

      $http.get('http://localhost:8080/twitterapi/following/', requestOptions).then(function (response) {
        self.followings = response.data;
      });
        self.sendFollow = function sendFollow(follow_name) {
            const data = "follow_name=" + encodeURIComponent(follow_name);
            $http.post('http://localhost:8080/twitterapi/following/', data, requestOptions);
        }
        self.sendUnFollow = function sendUnFollow(follow_name) {
            $http.defaults.headers.delete = { 'X-session': $rootScope.x_session };
            const data = "follow_name=" + encodeURIComponent(follow_name);
            $http.delete('http://localhost:8080/twitterapi/following/?' + data);
        }
    }]
});