var myAdmin = angular.module('myAdmin',[]);


myAdmin.controller('AdminController',['$scope','$http','$window','$timeout',function($scope,$http,$window,$timeout){
    
    $scope.invitebyemail = function(){
        var newobj = {
            "email": $scope.email
        }
        $http.post('./invite',newobj).
            then(function(response) {
                console.log("RESPONSE",response);
        });
        $scope.email = "";
        $timeout(function() {
            $window.location.reload();
        }, 2000);
        
    }

    $http.get('/listinvite').
    then(function(response){
        $scope.listquiz =[];
        response.data.forEach(function(quiz) {
           var newobj = {
               url: quiz.url,
               email: quiz.email,
               status: quiz.status,
               score: quiz.score
           }
           $scope.listquiz.push(newobj);
        });
    });
  
    
    
}]);