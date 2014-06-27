window.TokShowApp
.controller('StageController', ['$scope', 'OTSession', 'apiKey', 'sessionId', 'token', function($scope, OTSession, apiKey, sessionId, token) {
    $scope.count = 0;

    OTSession.init(apiKey, sessionId, token);
    window.StageSession = OTSession;
    window.StageScope = $scope;

    $scope.streams = OTSession.streams;

    
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

    $scope.getState = function() {
      // get the time
      $.get("/state", function(tokshowState) {
        $scope.state = tokshowState.state;
        $scope.$apply();
        BackstageScope.updateState(tokshowState.state);
      });
    }

    $scope.getState();
}]);