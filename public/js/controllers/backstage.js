window.BackStage
.controller('BackstageController', ['$scope', 'OTSession', 'apiKey', 'sessionId', 'token', function($scope, OTSession, apiKey, sessionId, token) {
    OTSession.init(apiKey, sessionId, token);
    $scope.streams = OTSession.streams;
    
    $scope.goOnstage = function (fanStream) {
        OTSession.session.signal({
            type: 'goOnstage',
            to: fanStream.connection
        });
    };

    getState(); 
    
    $scope.startShow = function() {
      updateState("started");
    }

    $scope.stopShow = function() {
      updateState("finished");
    }

    $scope.resetShow = function() {
      updateState("pending");
    }

    function updateState(state) {
      $.post("/state", {
        state: state
      }, function(tokshowState) {
        $scope.state = tokshowState.state;
        $scope.$apply();
      }, "json")
      relayState();
    }

    function relayState() {
        OTSession.session.signal({
            type: 'stateChanged'
        });
    }

    function getState() {
      // get the time
      $.get("/state", function(tokshowState) {
        $scope.state = tokshowState.state;
        $scope.$apply();
      });
    }
}]);