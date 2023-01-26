let errorMsg = "";

function validate(input, id){
    let valid = true;
    errorMsg = "";

    if (!Number(id))
    {
        valid = false;
        errorMsg += "Id must be a number!<br>";
    }
    if (input.name.length <= 0){
        valid = false;
        errorMsg += "Employee name can't be empty!<br>";
    }
    if (!/[a-zA-Z]$/.test(input.name))
    {
        valid = false;
        errorMsg += "Employee name must only contain characters!<br>";
    }
    if (input.surname.length <= 0){
        valid = false;
        errorMsg += "Employee surname can't be empty!<br>";
    }
    if (!/[a-zA-Z]$/.test(input.surname))
    {
        valid = false;
        errorMsg += "Employee surname must only contain characters!<br>";
    }
    if (input.email.length <= 0){
        valid = false;
        errorMsg += "Email can't be empty.<br>";
    }
    if (!Number(input.phoneNum)){
        valid = false;
        errorMsg += "Phone number must contain numbers only!<br>";
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
            name: document.getElementById("name").value,
            surname: document.getElementById("surname").value,
            email: document.getElementById("email").value,
            phoneNum: document.getElementById("phoneNum").value,
        };

        if (!validate(data, number)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8000/api/employees/" + number,{
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
                    document.getElementById('error').innerHTML = "Employee updated.";
                    document.getElementById('error').style.color = "green";

                    document.getElementById("id").value = "";
                    document.getElementById("name").value = "";
                    document.getElementById("surname").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phoneNum").value = "";
                }})
        }
    });
}