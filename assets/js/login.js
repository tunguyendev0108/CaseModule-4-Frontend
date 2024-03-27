function login() {
  // let loginDto = {
  //   username: $("input[name='username']").val(),
  //   password: $("input[name='password']").val(),
  // };
  let requestBody = {  username: $("input[name='username']").val(),
  password: $("input[name='password']").val(), };
  console.log(requestBody);
  // console.log(requestBody);
  // console.log(typeof requestBody);

  $.ajax({
    url: `http://localhost:8080/api/auth/login`,
    type: "POST",
      dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(requestBody),
    success: function (response, status) {
      localStorage.setItem("accessToken", response.token);
      console.log(response.data);
      let result = JSON.stringify(response);
      console.log(result);
      alert("Login Successfully!");
      window.location.href = "list-drug.html";
    },
    error(errorThrown) {
      console.log(errorThrown);
    },
  });
  
}
  
 

function logout() {
  $.ajax({
    url: "http://localhost:8080/api/auth/logout",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    success: function(response, status) {
      // localStorage.clear();
      alert("Logged out successfully!");
      window.location.href = "index.html";

    },
    error(errorThrown) {
      console.error("Error logging out:", errorThrown);
    }
  });
}
