window.BackStage
.controller('BackstageController', ['$scope', 'OTSession', 'apiKey', 'sessionId', 'token', function($scope, OTSession, apiKey, sessionId, token) {
    OTSession.init(apiKey, sessionId, token);
    window.BackstageSession = OTSession;
    window.BackstageScope = $scope;
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
        window.StageScope.$apply();
    });


    OTSession.session.on('signal:stateChanged', function () {
      StageScope.getState();
    });

    $scope.updateState = function(newState) {
        $scope.state = newState;

        if (newState == 'finished' && $scope.inline) {
            var publisher = window.BackstageSession.publishers[0];
            if (publisher) {
                publisher.destroy();
                publisher.off()
                $scope.inline = false;
                $scope.onstage = false;
            }
        }

        $scope.$apply();
    }

    $scope.getInline = function () {
        $scope.inline = true;
    };
}]);