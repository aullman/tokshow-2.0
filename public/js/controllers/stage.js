window.TokShowApp
.controller('StageController', ['$scope', 'OTSession', 'apiKey', 'sessionId', 'token', function($scope, OTSession, apiKey, sessionId, token) {
    OTSession.init(apiKey, sessionId, token);
    $scope.streams = OTSession.streams;
    
    $scope.kick = function (stream) {
        OTSession.session.forceUnpublish(stream);
    };

    updateState(); 
    
    function updateState() {
      // get the time
      $.get("/state", function(tokshowState) {
        $scope.state = tokshowState.state;
        $scope.$apply();
      });
    }
}]);