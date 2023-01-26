let errorMsg = "";

function validate(input, id){
    let valid = true;
    errorMsg = "";

    if (!Number(id)){
        valid = false;
        errorMsg += "Shop id needs to be a number!<br>";
    }
    if (input.name.length <= 0){
        valid = false;
        errorMsg += "Shop name can't be empty!<br>";
    }
    if (input.location.length <= 0){
        valid = false;
        errorMsg += "Location name can't be empty!<br>";
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
            name: document.getElementById("shopName").value,
            location: document.getElementById("shopLocation").value
        };

        if (!validate(data, number)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8000/api/camera_shops/" + number,{
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
                    document.getElementById('error').innerHTML = "Camera shop updated.";
                    document.getElementById('error').style.color = "green";

                    document.getElementById("id").value = "";
                    document.getElementById("shopName").value = "";
                    document.getElementById("shopLocation").value = "";
                }})
        }
    });
}