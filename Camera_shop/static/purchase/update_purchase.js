let errorMsg = "";

function validate(input, id){
    let valid = true;
    errorMsg = "";

    if (!Number(id)){
        valid = false;
        errorMsg += "Id must be a number!<br>";
    }
    if (!Number(input.price)){
        valid = false;
        errorMsg += "Price must be a number!<br>";
    }
    if (input.date.length <= 0){
        valid = false;
        errorMsg += "Date can't be empty!<br>";
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
            price: document.getElementById("price").value,
            date: document.getElementById("date").value,
        };

        if (!validate(data, number)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8000/api/purchases/" + number,{
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
                    document.getElementById('error').innerHTML = "Purchase updated.";
                    document.getElementById('error').style.color = "green";

                    document.getElementById("id").value = "";
                    document.getElementById("price").value = "";
                    document.getElementById("date").value = "";
                }})
            }
    });
}