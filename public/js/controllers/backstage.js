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
}]);