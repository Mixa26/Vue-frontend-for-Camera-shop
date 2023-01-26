let errorMsg = "";

function validate(input){
    let valid = true;
    errorMsg = "";

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

        const data = {
            name: document.getElementById("name").value,
            location: document.getElementById("location").value
        };

        if (!validate(data)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8000/api/camera_shops",{
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
                    document.getElementById('error').innerHTML = "Camera shop created.";
                    document.getElementById('error').style.color = "green";

                    document.getElementById("name").value = "";
                    document.getElementById("location").value = "";
                }})
        }
    });
}