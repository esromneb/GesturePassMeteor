HashStore = new Meteor.Collection("hashstore");
LastMatchStore = new Meteor.Collection("lastmatchstore");

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

  '/compare/:id': function(id) {
        
        var p = id.split("-");
        var JSONObj = {"phone":p[0], "hash":p[1]};
        var valInStore = HashStore.findOne(JSONObj);
        console.log(JSONObj);
        if(valInStore == null) 
        {
	  JSONObj = {};
	  JSONObj[p[0]] = "NO";
         // JSONObj = {p[0] :"NO"};
          LastMatchStore.insert(JSONObj);
          debugString = JSON.stringify(JSONObj);
          return debugString;
        }
        else 
        {
	  JSONObj = {};
	  JSONObj[p[0]] = "YES";
          //JSONObj = {p[0] :"YES"};
          LastMatchStore.insert(JSONObj);
          debugString = JSON.stringify(JSONObj);
          return debugString;
        }
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

  Meteor.Router.add({
  '/lastdidmatch/:id': function(id) {
	JSONObj = {};
	JSONObj[id] = "YES";
        //var JSONObj = {id:"YES"};
        var valInStore = LastMatchStore.findOne(JSONObj);
        if(valInStore == null)
        {
          var JSONObj = {"lastmatched":0};
          return JSON.stringify(JSONObj);
        }
        else
        {
          var JSONObj = {"lastmatched":1};
          return JSON.stringify(JSONObj);
        }

      }

  });

}
