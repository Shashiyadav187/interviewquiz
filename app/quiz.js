var myQuiz = angular.module('myQuiz',[]);

myQuiz.config(['$locationProvider', function($locationProvider) {
        //$locationProvider.hashPrefix('');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

myQuiz.controller('QuizController',['$scope','$http','$location','$window',function($scope,$http,$location,$window){
    
    $scope.shortid = $location.url().split('/')[2];
    console.log($scope.shortid);

    $http.get('/status/'+$scope.shortid).
    then(function(respon){
        if(respon.data.status == 0){
            $http.get('/questions').
            then(function(response){
                $scope.questions =[];
                $scope.answers =[];
                response.data.forEach(function(question){
                    var newquestion = {
                        text: question.text,
                        a: question.a,
                        b: question.b,
                        c: question.c,
                        d: question.d,

                    }
                    var newanswer = {
                        ans: question.ans
                    }

                    $scope.questions.push(newquestion);
                    $scope.answers.push(newanswer);
                   
                });
                
            });
        }
        else{
            $scope.submittedscore = respon.data.score;
            
        }
    });
    

    $scope.subquiz = function(){
        var score = 0;
        var i;
        var count = $scope.questions.length
        for(i = 0; i<count;i++){
            if($scope.questions[i].selected == $scope.answers[i].ans){
                score++;
            }
        }
        var obj = {
            score: score
        }
        $http.put("/quiz/"+$scope.shortid,obj).
        then(function(response){
            console.log("Quiz submitted succesfully");
            $window.location.reload();
        });
        
    };
}]);