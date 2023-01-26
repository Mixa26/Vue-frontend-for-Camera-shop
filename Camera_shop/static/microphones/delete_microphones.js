let errorMsg = "";

function validate(number){
    errorMsg = "";
    
    if (!Number(number)){errorMsg = "Id must be a number!"}
    return Number(number);
}

function init() {
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length -1];

    document.getElementById("btn").addEventListener("click", e => {
        e.preventDefault();

        let number = document.getElementById("id").value

        
        if (!validate(number)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8000/api/microphones/" + number,{
                method: 'delete',
                headers: {'Authorization': `Bearer ${token}`}
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
                    document.getElementById('error').innerHTML = "Successfully deleted.";
                    document.getElementById('error').style.color = "green";
                    
                    document.getElementById("id").value = "";
                }})
        }
    });
}