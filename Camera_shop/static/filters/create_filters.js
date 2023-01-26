let errorMsg = "";

function validate(input){
    let valid = true;
    errorMsg = "";

    if (input.company.length <= 0){
        valid = false;
        errorMsg += "Filter company name can't be empty!<br>";
    }
    if (!Number(input.diameter)){
        valid = false;
        errorMsg += "Filter diameter must be a number!<br>";
    }
    if (input.purpose.length <= 0){
        valid = false;
        errorMsg += "Filter purpose can't be empty!<br>";
    }
    if (!Number(input.price)){
        valid = false;
        errorMsg += "Price must be a number!<br>";
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
            company: document.getElementById("company").value,
            diameter: document.getElementById("diameter").value,
            purpose: document.getElementById("purpose").value,
            price: document.getElementById("price").value,
            cameraShopId: document.getElementById("cameraShopId").value,
        };

        if (!validate(data)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8000/api/filters",{
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

                    document.getElementById('error').innerHTML = "Camera added.";
                    document.getElementById('error').style.color = "green";

                    document.getElementById("company").value = "";
                    document.getElementById("diameter").value = "";
                    document.getElementById("purpose").value = "";
                    document.getElementById("price").value = "";
                    document.getElementById("cameraShopId").value = "";
                }})
        }
    });
}