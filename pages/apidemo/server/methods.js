

Meteor.methods({
  "getRecipe":
  function(ingr,dish){
    console.log("'"+ingr+"'  '"+dish+"'");
    const url = "http://www.recipepuppy.com/api/?i="+ingr+"&q="+dish+"&p=1";
    console.log(url);
    const z = Meteor.http.call("get",url);
    return z.content;
  },

  "getZipInfo":
  function(zip){
    console.log("'"+zip+"'");
    //using this API https://www.zipcodeapi.com/API
    const ZipCodeAPIkey =
     "bn9Gd0r9Je7KOQW7oAC95Lq2AsFetdZFB9lO9MYT16DQWzXkaAuflVhWnXaRaawL";
     //"pMocCOW2qcloL7ungr6qZ3wPCp1vZTNoFcBi1xkrJFPvMkS3LZtL30AFqBbpuZOa";
    const url =
        "https://www.zipcodeapi.com/rest/"+
        ZipCodeAPIkey +
        "/info.json/"+
        zip +
        "/degrees";

    console.log(url);
    
    const z = Meteor.http.call("get",url);
      return z.content;
  },

  "test1": function(){
    return 999;
  }

})
