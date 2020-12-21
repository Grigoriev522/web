let studentsApp = angular.module("webApp", []);

let objElem = ["firstName","secondName","age","avgMark"]

let createStudent = (firstName, secondName, age, avgMark) => {
    return {
        firstName,
        secondName,
        age: Number(age),
        avgMark: Number(avgMark)
    }
}

studentsApp.controller("bodyController", ($scope, $http)  => {
    let currentIndex;
    let url = 'https://jsonplaceholder.typicode.com/users';
    $scope.studArr = [];
    $scope.edit = false;

   let getData = () => {
       let request = $http({ method: 'GET', url })

       request.then(({ data }) => {
        let obj = {};
        for(let key of data) {
            if (key.name.split(' ').length == 2) {
                obj.firstName = key.name.split(' ')[0];
                obj.secondName = key.name.split(' ')[1];
                obj.age = Math.round(((Math.random() + 1) * 10));
                obj.avgMark = Math.round((Math.random() * 10) * 10) / 10;
                $scope.studArr.push(obj);
            }
            obj = {};
        }
       });

       request.catch(err => console.log(err));
   } 

   getData();

    $scope.deleteStudent = (index) => {
        $scope.studArr.splice(index, 1);
    }

    $scope.editStudent = (index) => {
        console.log($scope.studArr[index]);
        $scope.auxiliaryFn(index);
        currentIndex = index;
        $scope.edit = true;
    }

    $scope.auxiliaryFn = (index) => {
    
        if (!$scope.studArr[index]) {
            return;
        }
    
        for(let value of objElem) {
            $scope[value] = $scope.studArr[index][value];
        }
    
    }    
    
    $scope.stopEditStudent = (firstName, secondName, age, avgMark) => {
        let newStud = createStudent(firstName, secondName, age, avgMark);
        $scope.studArr[currentIndex] = newStud;
        $scope.clearFormField();
        $scope.edit = false;
    }

    $scope.clearFormField = () => {
        for(let value of objElem) {
            $scope[value] = '';
        }
    }

    $scope.addStudent = (firstName, secondName, age, avgMark) => {
        let newStud = createStudent(firstName, secondName, age, avgMark);
        $scope.studArr.push(newStud);

        $scope.clearFormField();
    }

   $scope.calculateAverageMark = () => {
    if ($scope.studArr.length === 0 ) {
        return 0;
    }
    let sum = 0;
    for(let value of $scope.studArr) {
        sum += +value.avgMark;
    }
    let total = sum / $scope.studArr.length; 

    return Math.round(total * 10)/10; 
   }

});


