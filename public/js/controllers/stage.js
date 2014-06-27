window.TokShowApp
.controller('StageController', ['$scope', 'OTSession', 'apiKey', 'sessionId', 'token', function($scope, OTSession, apiKey, sessionId, token) {
    OTSession.init(apiKey, sessionId, token);
    window.stageSession = OTSession.session;
    $scope.streams = OTSession.streams;
    $scope.count = 0;
    
    $scope.kick = function (stream) {
        OTSession.session.forceUnpublish(stream);
    };

    OTSession.session.on("connectionCreated", function(event) {
      console.log(event.connection.connectionId);
      $scope.count++;
      updateCount();
    });

    OTSession.session.on("connectionDestroyed", function() {
      $scope.count--;
      updateCount();
    });

    OTSession.session.on("sessionDisconnected", function() {
      $scope.count = 0;
      updateCount();
    });

    function updateCount() {
      $scope.$apply();
    }

    updateState(); 
    
    function updateState() {
      // get the time
      $.get("/state", function(tokshowState) {
        $scope.state = tokshowState.state;
        $scope.$apply();
      });
    }
}]);