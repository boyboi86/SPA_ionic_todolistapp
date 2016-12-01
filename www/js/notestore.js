angular.module('mynotes.notestore', [])


.factory('noteStore', function(){
  /*local variable for notes*/
  var notes = [];
  /* methods */
  return {
    list: function(note){
      return notes;
    },
    get: function(noteId){
      for(var i = 0; i < notes.length; i++){
        if(notes[i].id === noteId) {
          return notes[i]
        }
      }
      return undefined;
    },
    create: function(note){
      notes.push(note);
    },
    update: function(note){
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === note.id) {
          notes[i] = note;
          return;
        }
      }
    }
  }
})
