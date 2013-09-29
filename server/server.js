if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Pass a gesture hash as a REST argument h=";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.Router.add({

  '/h/:id': function(id) {
        return id;
      }

  });

}
