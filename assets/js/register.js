function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    let avatar = document.getElementById("avatar").value;
    let newUser = {
        "username" : username,
        "password" : password,
        "fullName"  : fullName,
        "email": email,
        "address" : address,
        "phone" : phone,
        "avatar" : avatar,

    }
    event.preventDefault();
    // let data = JSON.stringify(newUser);
    $.ajax({
        
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        crossDomain: true,
        type : "POST",
        data: JSON.stringify(newUser),
        url : "http://localhost:8080/api/users",
       
        success: function(data) {
            localStorage.setItem("object",JSON.stringify(data));
            alert("Register successfully!")
            window.location.href = "login.html"
        },
        error(error) {
            // console.log(data);
            alert("Account is already existed! Please try again!")
        }
    })
}