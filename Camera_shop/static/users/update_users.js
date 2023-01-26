let errorMsg = "";

function validateUser(user, id){
    let valid = true;
    errorMsg = "";

    if (!Number(id)){
        valid = false;
        errorMsg += "Id of user must be a number!<br>";
    }
    if (user.username.length <= 0){
        valid = false;
        errorMsg += "Username can't be empty!<br>";
    }
    if (user.email.length < 5 || !user.email.includes('@')){
        valid = false;
        errorMsg += "Email must be at least 5 characters long and be valid.<br>";
    }
    if (user.password.length < 4){
        valid = false;
        errorMsg += "Password must be at least 4 characters long.";
    }

    return valid;
}


function init() {
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length -1];

    document.getElementById("btn").addEventListener("click", e => {
        e.preventDefault();

        let number = document.getElementById("id").value

        const data = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            admin: document.getElementById("admin").checked
        };

        if (!validateUser(data, number)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8080/users/" + number,{
                method: 'put',
                headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`},
                body: JSON.stringify(data)
            }).then( res => res.json() )
            .then( el => {
                if (el.msg){
                    if (Array.isArray(el.msg)){
                        let message = "";
                        el.msg.forEach(element => {
                            message += element.message;
                        });
                        document.getElementById('error').innerHTML = message;
                        document.getElementById('error').style.color = "red";
                    }
                    else{
                        document.getElementById('error').innerHTML = el.msg;
                        document.getElementById('error').style.color = "red";
                    }
                }
                else{

                    document.getElementById('error').innerHTML = "User updated.";
                    document.getElementById('error').style.color = "green";

                    document.getElementById("id").value = "",
                    document.getElementById("username").value = "",
                    document.getElementById("email").value = "",
                    document.getElementById("password").value = "",
                    document.getElementById("admin").unchecked
                }})
        }
    });
}