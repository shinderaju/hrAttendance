


var sudoApp = angular.module('sudoApp');
sudoApp.controller('loginCtrl', function ($scope, $location, $http, toastr) {
  console.log("hi");


  /**
   * Login Athentication
   * @cunstructor
   * @param(string)-email
   *
   *
   */
  $scope.submit = function () {
    var email = this.email;
    console.log("hi");
    console.log($scope.email);
    var authData = { 'email': email };

    //sending user mail to server
    $http.post('http://localhost:3001/login', authData).success(function (data) {
      if (data == "invalid email") {
        toastr.error("Invalid email");
      } else {
        console.log("login successfully");
        console.log(data);
        $location.path('/profile').search({
          param: data.user,
          id : data.id
        });
      }
    });

  }//end of submit function

});
