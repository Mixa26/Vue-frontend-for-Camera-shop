let errorMsg = "";

function validate(input){
    let valid = true;
    errorMsg = "";

    if (input.name.length <= 0){
        valid = false;
        errorMsg += "Supplier name can't be empty!<br>";
    }
    if (input.country_origin.length <= 0){
        valid = false;
        errorMsg += "Country origin can't be empty!<br>";
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
            country_origin: document.getElementById("country_origin").value,
            cameraShopId: document.getElementById("cameraShopId").value
        };

        
        if (!validate(data)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8000/api/suppliers",{
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
                    document.getElementById('error').innerHTML = "Supplier added.";
                    document.getElementById('error').style.color = "green";

                    document.getElementById("name").value = "";
                    document.getElementById("country_origin").value = "";
                    document.getElementById("cameraShopId").value = "";
                }})
            }
    });
}