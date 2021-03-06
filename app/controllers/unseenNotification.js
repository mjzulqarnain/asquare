var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts= mongoose.model('posts'),
  userfollow = mongoose.model('follows');

module.exports = function (app) {
  app.use('/api', router);
};





module.exports.notification = function(socket, connection){

    socket.on('notification', function (data) {
    
    for (var i = 0; i < connection.length; i++) {
      if(connection[i].userid==data.userid)
      {
        break;
      }
    }
    if(i==0 || i==connection.length){
      connection.push({socketId:socket.id,userid:data.userid});
    }
    
    console.log(connection);
    var userid= data.userid;
    
 	if(userid=="")
    {
      socket.emit('notification', {"status" : false, "message" : "userid empty"});
    }
    else
    { 
      userCollection.findOne({_id:userid},function(err, result) {
        if(err)
        {
          socket.emit('notification', {"status" : false, "message" : "userid not exits"});
        }
        if (result)
        {
         	socket.emit('notification', {"status" : true, "message" : result.unseen});	
        }
        else
        {
          socket.emit('notification', {"status":false,
          "message":"no result found...."});
        }
      });   
    }

});
  } 