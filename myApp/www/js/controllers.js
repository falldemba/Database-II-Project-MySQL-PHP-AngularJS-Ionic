angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})
//POST AND REQUEST to view student academic status.
.controller('academicCtrl', function($scope, $http){

  //Schema of student profile.
  $scope.SID_and_GPA = [{ 'SID':'',
                          'GPA':'',
                          'cumulative_credit':'',
                          'algorithm':'',
                          'core_courses_credits':'',
                          'elective_courses_credits':'',
                          'grade_below_B':'',
                          'con_class':'',
                          'passing_status':'',
                          'reason':''}];

  $scope.getGPA = function(){
    console.log($scope.SID);
    //10.0.2.2 is the localhost ip address for android emulator. 127.0.0.1(localhost) is the ip for desktop localhost
    $http.post("http://127.0.0.1/server/students/student_academic_status/post_SID_to_get_student_status.php",
      {
        'SID':$scope.SID
      })
      .success(function(data){
        $http.get('http://127.0.0.1/server/students/list_of_students/list_of_students.php').then(function (response) {
          $scope.model_object = response.data.records;
          console.log($scope.model_object);

          // Need to check when input is empty string

          for (var i = 0; i < $scope.model_object.length; i++) {
            console.log($scope.model_object[i]);
            if($scope.model_object[i].SID == $scope.SID){

              $scope.SID_and_GPA = [{ 'SID':$scope.model_object[i].SID,
                                      'GPA':$scope.model_object[i].GPA,
                                      'cumulative_credit':$scope.model_object[i].cumulative_credit,
                                      'algorithm':$scope.model_object[i].algorithm,
                                      'core_courses_credits':$scope.model_object[i].core_courses_credits,
                                      'elective_courses_credits':$scope.model_object[i].elective_courses_credits,
                                      'grade_below_B':$scope.model_object[i].grade_below_B,
                                      'con_class':$scope.model_object[i].con_class,
                                      'passing_status':$scope.model_object[i].passing_status,
                                      'reason':$scope.model_object[i].reason}];
              break;
            }
          }
        });
      });
    console.log($scope.model_object);
  }
})

.controller('addStudentCtrl', function($scope, $http, $ionicHistory){

  $scope.addStudent = function(){
    $http.post("http://127.0.0.1/server/CRUD/insert_student.php",
      {
        'SID':$scope.SID, 'name':$scope.name,
        'IID':$scope.IID, 'major':$scope.major,
        'degreeHeld':$scope.degreeHeld, 'career':$scope.career})
      .success(function(data){
        console.log("Data updated successfully");
        console.log({
          'SID':$scope.SID, 'name':$scope.name,
          'IID':$scope.IID, 'major':$scope.major,
          'degreeHeld':$scope.degreeHeld, 'career':$scope.career});
      });
    $ionicHistory.goBack();
  }
})
.controller('readStudentController', function($scope, $http, $interval) {

  $http.get("http://127.0.0.1/server/students/list_of_students/list_of_students.php")
    .then(function (response) {
      $scope.model_object = response.data.records;
    });


  // I think this is very bad practice...but this is brute force to refresh model.
  $interval(function(){
    $http.get("http://127.0.0.1/server/students/list_of_students/list_of_students.php")
      .then(function (response) {
        $scope.model_object = response.data.records;
      });
    console.log("Trying to refresh");
  },2000);
})
.controller('updateStudentCtrl', function($scope, $http, $ionicHistory) {

  $scope.updateStudent = function(){
    $http.post("http://127.0.0.1/server/CRUD/update_student.php",
      {
        'SID':$scope.SID,
        'IID':$scope.IID,
        'major':$scope.major
      })
      .success(function(data){
        console.log("Data updated successfully");
      });
    $ionicHistory.goBack();
  }
})
.controller('deleteStudentCtrl', function($scope, $http, $ionicHistory) {

  $scope.deleteStudent = function(){
    $http.post("http://127.0.0.1/server/CRUD/delete_student.php",
      {
        'SID':$scope.SID
      })
      .success(function(data){
        console.log("Data updated successfully");
      });
    $ionicHistory.goBack();
  }
});

