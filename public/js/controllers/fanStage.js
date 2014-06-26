window.TokShowApp
.controller('StageController', ['$scope', 'OTSession', 'apiKey', 'sessionId', 'token', function($scope, OTSession, apiKey, sessionId, token) {
    OTSession.init(apiKey, sessionId, token);
    window.StageSession = OTSession;
    
    $scope.streams = OTSession.streams;
}]);