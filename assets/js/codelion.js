$('#submitNewGroup').click(function(e) {
  e.preventDefault();
  var name = $('#newGroupName').val();
  var about = $('#newGroupAbout').val();
  var admin = parseInt($('#userID').text());
  console.log(name + ' ' + about + ' ' + admin);


  var postData = {
    name: name,
    about: about,
    admin: admin,
  }
  console.log(postData);
  console.log('Submitted Form');
  io.socket.post("/group/create", postData, function (data, jwres) {
    console.log('Posted');
    console.log(data);
    if (data.createdAt) {
      console.log("Group Success!");
      window.location.href = 'http://'+window.location.host+'/home';
    }
    else {
      console.log("ERROR!!!");
      window.alert("There Is Already One Group With That Name, Please Try A New Name!");
    }
  });

});

$('#addGroupMember').click(function(e) {
  e.preventDefault();
  var memberName = $('#addMemberUserName').val();
  var groupID = parseInt($('#groupID').text());
  console.log(memberName + ' ' + groupID);

  var postData = {
    memberName: memberName,
    groupID: groupID,
  }

  console.log(postData);
  console.log('Submitted Form');

  io.socket.post("/group/addMember", postData, function (data, jwres) {
    console.log('Posted');
    console.log(data);
  });
});

$('.removeGroupMember').click(function(e) {
  e.preventDefault();
  var memberID = this.getAttribute("value");
  var groupID = parseInt($('#groupID').text());
  console.log(memberID + ' ' + groupID);

  var postData = {
    memberID: memberID,
    groupID: groupID,
  }

  console.log(postData);
  console.log('Submitted Form');

  io.socket.post("/group/removeMember", postData, function (data, jwres) {
    console.log('Posted');
    console.log(data);
  });
});