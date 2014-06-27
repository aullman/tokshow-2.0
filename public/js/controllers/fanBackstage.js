window.BackStage
.controller('BackstageController', ['$scope', 'OTSession', 'apiKey', 'sessionId', 'token', function($scope, OTSession, apiKey, sessionId, token) {
    OTSession.init(apiKey, sessionId, token);
    window.BackstageSession = OTSession;
    $scope.streams = OTSession.streams;
    
    OTSession.session.on('signal:goOnstage', function () {
        if (window.BackstageSession) {
            var session = window.BackstageSession.session;
            var publisher = window.BackstageSession.publishers[0];
            
            publisher.on('streamDestroyed', function (event) {
                if (event.reason !== 'forceUnpublished') {
                    event.preventDefault();
                } else {
                    $scope.onstage = false;
                    $scope.inline = false;
                    $scope.$apply();
                }
            });
            
            session.unpublish(publisher);
            window.StageSession.session.publish(publisher);
            // Reparent the Publisher
            var layoutContainer = document.querySelector('ot-layout');
            var pub = document.querySelector('ot-publisher');
            layoutContainer.appendChild(pub);
        }
        $scope.onstage = true;
        $scope.$apply();
    });

    $scope.getInline = function () {
        $scope.inline = true;
    };
}]);