(function(){
var app = angular.module('starter', ['ionic'])
/*local variable for notes*/
var notes = [];
/*local service to track the correct note from params to controller*/
  function getNote(noteId){
    for(var i = 0; i < notes.length; i++){
      if(notes[i].id === noteId) {
        return notes[i]
      }
    }
    return undefined;
  }

  /*local service to update the correct note in editCtrl*/
function updateNote(note) {
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id === note.id) {
      notes[i] = note;
      return;
    }
  }
}

/*local service to add new note in addCtrl*/
function createNote(note) {
  notes.push(note);
}


/* App config */
app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  })
  /*Share view with edit.html*/
  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  })

  $stateProvider.state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
  })

  $urlRouterProvider.otherwise('/list');
})
/* list html controller */
app.controller('ListCtrl', function($scope) {

  $scope.notes = notes;

})

/* edit page controller */
app.controller('EditCtrl', function($scope, $state) {

  $scope.note = angular.copy(getNote($state.params.noteId));

  $scope.save = function() {
    updateNote($scope.note);
    $state.go('list');
  };
});

/* Add page controller */
app.controller('AddCtrl', function($scope, $state) {

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function() {
    createNote($scope.note);
    $state.go('list');
  };
});


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());
