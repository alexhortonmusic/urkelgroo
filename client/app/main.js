'use strict';

angular
  .module('toDo', ['ngRoute'])
  .config($routeProvider =>
    $routeProvider
      .when('/', {
        controller: 'ListCtrl',
        templateUrl: 'partials/list.html'
      })
  )
  .controller('ListCtrl', function ($scope, $http) {
    $scope.addTask = () => {
      const task = {
        task: $scope.thingToDo
      }
      $scope.thingToDo = '' // empties input
      $http
        .post('/api/tasks', task)
        .then(() => {
          $scope.tasks.push(task)
        })
        .catch(console.error)
    }
    $http
      .get('/api/tasks')
      .then(({ data: { tasks }}) =>
        $scope.tasks = tasks
      )
  })
