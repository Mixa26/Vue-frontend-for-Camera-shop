let errorMsg = "";

function validate(input, id){
    let valid = true;
    errorMsg = "";

    if (!Number(id)){
        valid = false;
        errorMsg += "Id must be a number!<br>";
    }
    if (input.company.length <= 0){
        valid = false;
        errorMsg += "Microphone company name can't be empty!<br>";
    }
    if (input.model.length <= 0){
        valid = false;
        errorMsg += "Microphone model can't be empty!<br>";
    }
    if (input.type.length <= 0){
        valid = false;
        errorMsg += "Microphone type can't be empty!<br>";
    }
    if (input.frequency_range.length <= 0){
        valid = false;
        errorMsg += "Microphone frequency range can't be empty!<br>";
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

        let number = document.getElementById("id").value

        const data = {
            company: document.getElementById("company").value,
            model: document.getElementById("model").value,
            type: document.getElementById("type").value,
            frequency_range: document.getElementById("frequency_range").value,
            price: document.getElementById("price").value,
        };

        
        if (!validate(data, number)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8000/api/microphones/" + number,{
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
                    document.getElementById('error').innerHTML = "Microphone updated.";
                    document.getElementById('error').style.color = "green";

                    document.getElementById("id").value = "";
                    document.getElementById("company").value = "";
                    document.getElementById("model").value = "";
                    document.getElementById("type").value = "";
                    document.getElementById("frequency_range").value = "";
                    document.getElementById("price").value = "";
                }})
            }
    });
}