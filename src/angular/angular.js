/*
 * Angular directive for iScroll
 */

// Detect angular
if ( (typeof(angular) === 'object') && (typeof(angular.version) === 'object')){

    angular.module('iscroll',[])

    .directive('iscrollable', function($parse) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, controller) {

                // Pass parameters as attributes, looking for a better alternative to the sweet eval
                var opt = eval('({'+attrs.iscrollable+'})');

                var iscroll = new IScroll(element[0],opt);

                // Funky function to refresh on resize the dom area, make one and forget it
                setInterval(function(){
                    iscroll.refresh();
                },500);

            }
        };

    });

}
