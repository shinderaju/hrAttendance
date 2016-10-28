var sudoApp = angular.module('sudoApp');
sudoApp.controller('profileCtrl', function($scope, $location, $http, toastr, $stateParams, $uibModal, $log) {
    console.log("inside profileCtrl");
    $scope.user = $stateParams.param;
    $scope.id = $stateParams.id;
    console.log($scope.user);
    console.log($scope.id);
    $scope.showMeridian = true;
    $scope.disabled = false;
    $scope.WorkingDay = ["Yes", "Co-holiday", "Personal leave"];
    $scope.reasonForAbsence = '';
    $scope.selectedDay = 'Yes';
    $scope.dt = "opendate";


    $scope.humanReadable = {};
    $scope.humanReadable.hours = 0;
    $scope.humanReadable.minutes = 0;
    $scope.var1 = 0;
    $scope.var2 = 0;
    var user = {
        'user': $scope.id
    };
    $http.post('http://localhost:3001/retrive', user).success(function(data) {
        console.log(data);
        $scope.attendane = data.attendance;
    });
    $scope.open = function(no) {
            console.log("hi");
            switch (no) {
                case 1:
                    $modalInstance = $uibModal.open({
                        //  controller: 'PopupCont',
                        templateUrl: './pages/modalAdd.html',
                    });
                    break;
                case 2:
                    $modalInstance = $uibModal.open({
                        //  controller: 'PopupCont',
                        templateUrl: './pages/modalEdit.html',
                    });
                    break;
            }
        }
        /**
         *close modal
         */
    $scope.close = function() {
        console.log("hi close");
        $modalInstance.dismiss('cancel');

    };

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.dateformat = "dd/MM/yyyy";
    $scope.today();
    $scope.showcalendar = function($event) {
        $scope.showdp = true;
        console.log($scope.dt);
    };
    $scope.showdp = false;

    $scope.hours = 11;
    $scope.minutes = 45;



    $scope.newTime = function() {




        if ($scope.var1 != 0 && $scope.var2 != 0) {

            var intimeObj = JSON.stringify($scope.var1).split("T");
            console.log(intimeObj);
            console.log(intimeObj[0].slice(1, -1));
            console.log(intimeObj[1]);
            var intime = intimeObj[1].split(".");
            console.log(intime[0]);
            console.log($scope.dt);
            var outtimeObj = JSON.stringify($scope.var2).split("T");
            console.log(outtimeObj);
            console.log(outtimeObj[0].slice(1, -1));
            console.log(outtimeObj[1]);
            var outtime = outtimeObj[1].split(".");
            console.log(outtime[0]);


            var hourDiff = $scope.var2 - $scope.var1; //in ms
            var secDiff = hourDiff / 1000; //in s
            var minDiff = hourDiff / 60 / 1000; //in minutes
            var hDiff = hourDiff / 3600 / 1000; //in hours
            if (hDiff > 0) {
                $scope.humanReadable.hours = Math.floor(hDiff);
                if (minDiff > 0)
                    $scope.humanReadable.minutes = (minDiff - 60 * $scope.humanReadable.hours).toFixed();
                if ($scope.humanReadable.minutes > 59) {
                    $scope.humanReadable.minutes = 0;
                    $scope.humanReadable.hours = $scope.humanReadable.hours + 1;
                }
            }
            console.log(minDiff);
            console.log(hDiff);
            console.log($scope.humanReadable.hours); //{hours: 0, minutes: 30}
            console.log($scope.humanReadable.minutes);
        }
    };
    $scope.newDate = function() {
        console.log($scope.dt);
        console.log(typeof $scope.dt);
        console.log($scope.dt.toLocaleDateString());
        console.log($scope.dt.toLocaleTimeString());

    };
    $scope.submit = function() {
        $scope.close();
        var WorkingHours = $scope.humanReadable.hours + " hr " + $scope.humanReadable.minutes + " min";
        var intimeObj = JSON.stringify($scope.var1).split("T");
        console.log(intimeObj);
        console.log(intimeObj[0].slice(1, -1));
        console.log(intimeObj[1]);
        var intime = intimeObj[1].split(".");
        console.log(intime[0]);
        console.log($scope.dt);
        var outtimeObj = JSON.stringify($scope.var2).split("T");
        console.log(outtimeObj);
        console.log(outtimeObj[0].slice(1, -1));
        var outtime = outtimeObj[1].split(".");
        console.log(outtime[0]);
        console.log(WorkingHours);
        console.log($scope.dt.toString());
        var d = $scope.dt.toString();
        console.log(d.split(" "));
        var d1 = d.split(" ");
        var date = d1[1] + "-" + d1[2]+ "-" + d1[3];

        var jsonData = {
            'EnggId': $scope.id,
            'date': date,
            'intime': intime[0],
            'outtime': outtime[0],
            'WorkingDay': $scope.selectedDay,
            'no_of_hours': WorkingHours,
            'reasonForAbsence': $scope.reasonForAbsence,
        }
        console.log(jsonData);
        $http.post('http://localhost:3001/attendance', jsonData).success(function (data) {

            console.log("data save successfully");


          // if (data == "invalid email") {
          //   toastr.error("Invalid email");
          // } else {
          //   console.log("login successfully");
          //   console.log(data);
          //   $location.path('/profile').search({
          //     param: data.user,
          //     id : data.id
          //   });
          // }
        });
    }




    // $scope.mytime = new Date();
    //  $scope.hstep = 1;
    //  $scope.mstep = 1;
    //
    //  $scope.options = {
    //    hstep: [1, 2, 3],
    //    mstep: [1]
    //  };
    //
    //  $scope.ismeridian = true;
    //  $scope.toggleMode = function() {
    //    $scope.ismeridian = ! $scope.ismeridian;
    //  };
    //
    //  $scope.update = function() {
    //    var d = new Date();
    //    d.setHours( 14 );
    //    d.setMinutes( 0 );
    //    $scope.mytime = d;
    //  };
    //
    //  $scope.changed = function () {
    //    $log.log('Time changed to: ' + $scope.mytime);
    //  };
    //
    //  $scope.clear = function() {
    //    $scope.mytime = null;
    //  };

});
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
