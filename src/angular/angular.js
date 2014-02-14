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

                // Inject iScroll methods into the caller scope
                scope.goToPage = function (x, y, time, easing) {
                    if (iscroll.hasVerticalScroll) {
                        if ((y >= 0) && (y <= iscroll.pages.length - 1)) {
                            iscroll.goToPage.call(iscroll, x, y, time, easing);
                        }
                    } else {
                        if ((x >= 0) && (x <= iscroll.pages.length - 1)) {
                            iscroll.goToPage.call(iscroll, x, y, time, easing);
                        }
                    }
                };

                scope.prev = function (time, easing) {
                    var shouldLoop = false;
                    if (opt.enableInfiniteScroll) {
                        if (iscroll.hasVerticalScroll) {
                            if (iscroll.currentPage.pageY <= 0) {
                                shouldLoop = true;
                                scope.goToPage(iscroll.currentPage.pageX, iscroll.pages.length - 1, time, easing);
                            }
                        } else {
                            if (iscroll.currentPage.pageX <= 0) {
                                shouldLoop = true;
                                scope.goToPage(iscroll.pages.length - 1, iscroll.currentPage.pageY, time, easing);
                            }
                        }
                    }
                    if (!shouldLoop) {
                        iscroll.prev.call(iscroll, time, easing);
                    }
                };

                scope.next = function (time, easing) {
                    var shouldLoop = false;
                    if (opt.enableInfiniteScroll) {
                        if (iscroll.hasVerticalScroll) {
                            if (iscroll.currentPage.pageY >= iscroll.pages.length - 1) {
                                shouldLoop = true;
                                scope.goToPage(iscroll.currentPage.pageX, 0, time, easing);
                            }
                        } else {
                            if (iscroll.currentPage.pageX >= iscroll.pages.length - 1) {
                                shouldLoop = true;
                                scope.goToPage(0, iscroll.currentPage.pageY, time, easing);
                            }
                        }
                    }
                    if (!shouldLoop) {
                        iscroll.next.call(iscroll, time, easing);
                    }
                };

                var refresh = function() {
                    $timeout(function() {
                        scope.currentPage = iscroll.currentPage;
                    });
                };
                $timeout(refresh, 500);

                iscroll.on('pageChangePending', refresh);

                var scrollEndHandler = $parse(attrs.aceOnScrollEnd);
                iscroll.on('scrollEnd', function() {
                    refresh();
                    if (scrollEndHandler) {
                      scope.$apply(function() {
                        scrollEndHandler(scope);
                      });
                    }
                });

                scope.$on('layoutChange', function(e) {
                    iscroll.refresh();
                });

            }
        };

    });
}
// jshint +W061
