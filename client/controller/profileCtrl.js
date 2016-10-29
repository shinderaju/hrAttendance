var sudoApp = angular.module('sudoApp');
sudoApp.controller('profileCtrl', function($scope, $location, $http, toastr, $stateParams, $uibModal, $log) {
    console.log("inside profileCtrl");
    $scope.user = $stateParams.param;
    $scope.id = $stateParams.id;
    $scope.showMeridian = true;
    $scope.disabled = false;
    $scope.WorkingDay = ["Yes", "Co-holiday", "Personal leave"];
    $scope.reasonForAbsence = '';
    $scope.selectedDay = 'Yes';
    $scope.attendance = [];
    $scope.humanReadable = {};
    $scope.humanReadable.hours = 0;
    $scope.humanReadable.minutes = 0;
    $scope.var1 = 0;
    $scope.var2 = 0;
    var cdate = new Date();
    var cdatestr = cdate.toString();
    var cdateArray = cdatestr.split(" ");
    var currentDate = cdateArray[1] + "-" + cdateArray[2] + "-" + cdateArray[3];

    var user = {
        'EnggId': $scope.id,
        'date': currentDate
    };
    $http.post('http://localhost:3001/retrive', user).success(function(data) {
        $scope.attendane = data.attendance;
        var keys = Object.keys(data.attendance);
        for (i = 0; i < keys.length; i++) {
          console.log(data.attendance[keys[i]]);
            $scope.attendance.push(data.attendance[keys[i]]);
        }
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

    $scope.newTime = function() {
        if ($scope.var1 != 0 && $scope.var2 != 0) {
            var intimeObj = JSON.stringify($scope.var1).split("T");
            var intime = intimeObj[1].split(".");
            var outtimeObj = JSON.stringify($scope.var2).split("T");
            var outtime = outtimeObj[1].split(".");
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
        var intime = intimeObj[1].split(".");
        var outtimeObj = JSON.stringify($scope.var2).split("T");
        var outtime = outtimeObj[1].split(".");
        var d = $scope.dt.toString();
        var d1 = d.split(" ");
        var date = d1[1] + "-" + d1[2] + "-" + d1[3];
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
        $http.post('http://localhost:3001/attendance', jsonData).success(function(data) {
            console.log("data save successfully");
            $http.post('http://localhost:3001/retrive', user).success(function(data) {
                $scope.attendane = data.attendance;
                var keys = Object.keys(data.attendance);
                console.log("trying to retrive new attendance");
                for (i = 0; i < keys.length; i++) {
                    $scope.attendance.push(data.attendance[keys[i]]);
                }
                console.log($scope.attendance);
                $location.path('profile');
            });
        });
    }
});
