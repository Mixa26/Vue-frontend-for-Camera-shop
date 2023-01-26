let errorMsg = "";

function validate(input){
    let valid = true;
    errorMsg = "";

    if (input.name.length <= 0){
        valid = false;
        errorMsg += "Employee name can't be empty!<br>";
    }
    if (Number(input.name)){
        valid = false;
        errorMsg += "Employee name can't contain numbers!<br>";
    }
    if (input.surname.length <= 0){
        valid = false;
        errorMsg += "Employee surname can't be empty!<br>";
    }
    if (Number(input.surname)){
        valid = false;
        errorMsg += "Employee surname can't contain numbers!<br>";
    }
    if (input.email.length < 5){
        valid = false;
        errorMsg += "Email must be at least 5 characters long.<br>";
    }
    if (!Number(input.phoneNum)){
        valid = false;
        errorMsg += "Phone number must be a number!<br>";
    }
    if (!Number(input.cameraShopId)){
        valid = false;
        errorMsg += "Camera shop id must be a number!<br>";
    }

    return valid;
}

function init() {
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length -1];

    document.getElementById("btn").addEventListener("click", e => {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            surname: document.getElementById("surname").value,
            email: document.getElementById("email").value,
            phoneNum: document.getElementById("phoneNum").value,
            cameraShopId: document.getElementById("cameraShopId").value
        };

        if (!validate(data)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8000/api/employees",{
                method: 'post',
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

                    document.getElementById('error').innerHTML = "Employee added.";
                    document.getElementById('error').style.color = "green";

                    document.getElementById("name").value = "";
                    document.getElementById("surname").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phoneNum").value = "";
                    document.getElementById("cameraShopId").value = "";
                }})
        } 
    });
}