document.getElementById('sign-in-btn')
    .addEventListener("click", () => {
    const userId= document.getElementById('user-id');
    const userName = userId.value;
    
    const inputPin = document.getElementById('input-pin');
    const pin = inputPin.value;

    if(userName == "admin" && pin == "admin1234"){
        alert('Signin Success');
        window.location.assign('home.html');
    }
    else{
        alert("Signin Failed ");
    }

    });