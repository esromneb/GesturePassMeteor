HashStore = new Meteor.Collection("hashstore");

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

  '/match/:id': function(id) {
        
        p = id.split("-");
        var JSONObj = {"phone":p[0], "hash":p[1]};
        var valInStore = HashStore.findOne(JSONObj);
        console.log(JSONObj);
        if(valInStore == null) return "NO";
        else return "YES";
      }
  });

  Meteor.Router.add({
  '/set/:id': function(id) {
        p = id.split("-");
        var JSONObj = {"phone":p[0], "hash":p[1]};
        HashStore.insert(JSONObj);
        debugString = JSON.stringify(JSONObj);
        return debugString;
      }

  });

}
