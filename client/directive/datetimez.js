var sudoApp = angular.module('sudoApp');
sudoApp.directive('datetimez', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                pickDate: false,
                dateFormat: 'dd/MM/yyyy hh:mm:ss',
            }).on('changeDate', function(e) {
                console.log(e.date);
                console.log(JSON.stringify(e.date));
                console.log(JSON.stringify(e.date).split("T"));
                console.log(e.date.toString());
                var d = new Date(e.date.toString());
                console.log(d);
                console.log(typeof d);
                // console.log(e.date.getHours());
                // console.log(e.date.getHours()-6);
                // console.log(e.date.getMinutes()+30);
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            });
        }
    };
});
