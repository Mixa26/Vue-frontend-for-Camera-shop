let errorMsg = "";

function validate(input){
    let valid = true;
    errorMsg = "";

    if (input.company.length <= 0){
        valid = false;
        errorMsg += "Tripod company name can't be empty!<br>";
    }
    if (input.model.length <= 0){
        valid = false;
        errorMsg += "Model can't be empty!<br>";
    }
    if (!Number(input.carry_capacity)){
        valid = false;
        errorMsg += "Carry capacity must be a number!<br>";
    }
    if (input.meant_for.length <= 0){
        valid = false;
        errorMsg += "Meant for can't be empty!<br>";
    }
    if (!Number(input.price)){
        valid = false;
        errorMsg += "Price must be a number!<br>";
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
            model: document.getElementById("model").value,
            carry_capacity: document.getElementById("carry_capacity").value,
            meant_for: document.getElementById("meant_for").value,
            price: document.getElementById("price").value,
            cameraShopId: document.getElementById("cameraShopId").value
        };
        
        if (!validate(data)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
        fetch("http://127.0.0.1:8000/api/tripods",{
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
                document.getElementById('error').innerHTML = "Tripod created.";
                document.getElementById('error').style.color = "green";

                document.getElementById("company").value = "";
                document.getElementById("model").value = "";
                document.getElementById("carry_capacity").value = "";
                document.getElementById("meant_for").value = "";
                document.getElementById("price").value = "";
            }})
        }
    });
}