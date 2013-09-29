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
	  var valInStore = HashStore.findOne({"phone": p[0]});
	  var valuesAreEqual = false;
	  if(valInStore)
	  {
		  if(valInStore.hash === p[1]){
			  valuesAreEqual = true;
		  }
		  HashStore.update(valInStore._id, {$set:{"lastDidMatch": valuesAreEqual}});
	  }

	  return [200, {'content-type':'application/json'}, JSON.stringify({"result": valuesAreEqual})];
  }
  });

  Meteor.Router.add({
  '/set/:id': function(id) {
	  p = id.split("-");
	  var JSONObj = {"phone":p[0], "hash":p[1]};
	  var valInStore = HashStore.findOne({"phone": p[0]});
	  if(valInStore)
	  {
		  HashStore.update(valInStore._id, {$set:{"hash": p[1]}});
	  }else{
		  HashStore.insert(JSONObj);
	  }
	  return [200, {'content-type':'application/json'}, JSON.stringify({"result": "Success!"})];
  }

  });

  Meteor.Router.add({
  '/lastdidmatch/:id': function(id) {
        var valInStore = HashStore.findOne({"phone": id});
        if(valInStore && valInStore.lastDidMatch)
        {
			return [200, {'content-type':'application/json'}, JSON.stringify({"0": true, "1":"SS: 1337"})];
        }
        else
        {
			return [200, {'content-type':'application/json'}, JSON.stringify({"0": false, "1":"no secret for you!"})];
        }

      }

  });

}
