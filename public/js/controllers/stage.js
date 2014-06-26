window.TokShowApp
.controller('StageController', ['$scope', 'OTSession', 'apiKey', 'sessionId', 'token', function($scope, OTSession, apiKey, sessionId, token) {
    OTSession.init(apiKey, sessionId, token);
    $scope.streams = OTSession.streams;
    
    $scope.kick = function (stream) {
        OTSession.session.forceUnpublish(stream);
    };
}]);