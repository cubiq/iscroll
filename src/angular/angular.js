/*
 * Angular directive for iScroll
 */

// jshint -W061

// Detect angular
if ( (typeof(angular) === 'object') && (typeof(angular.version) === 'object')){

    angular.module('iscroll',[])

    .directive('iscrollable', function($parse, $timeout) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, controller) {

                // Pass parameters as attributes, looking for a better alternative to the sweet eval
                var opt = eval('({'+attrs.iscrollable+'})');
                
                var iscroll = new IScroll(element[0],opt);

                scope.currentPage = iscroll.currentPage;

                var refresh = function() {
                    $timeout(function() {
                        scope.currentPage = iscroll.currentPage;
                    });
                };

                $timeout(refresh, 500);

                iscroll.on('pageChangePending', refresh);
                iscroll.on('scrollEnd', refresh);

                scope.$on('layoutChange', function(e) {
                    iscroll.refresh();                  
                });

            }
        };

    });
}
// jshint +W061