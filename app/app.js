var myAdmin = angular.module('myAdmin',['ngFlash']);


myAdmin.controller('AdminController',['$scope','$http','$window','$timeout','Flash',function($scope,$http,$window,$timeout,Flash){
    
    $scope.invitebyemail = function(){
        var newobj = {
            "email": $scope.email
        }
        $http.post('./invite',newobj).
            then(function(response) {
                console.log("RESPONSE",response);
        });
        $scope.email = "";
        var message = 'Invitation link sent successfully!';
        var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
        $timeout(function() {
            $window.location.reload();
        }, 5000);
        
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