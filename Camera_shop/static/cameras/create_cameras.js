let errorMsg = "";

function validate(input){
    let valid = true;
    errorMsg = "";

    if (input.company.length <= 0){
        valid = false;
        errorMsg += "Camera company name can't be empty!<br>";
    }
    if (input.model.length <= 0){
        valid = false;
        errorMsg += "Camera model name can't be empty!<br>";
    }
    if (input.sensor.length <= 0){
        valid = false;
        errorMsg += "Camera sensor can't be empty!<br>";
    }
    if (!Number(input.megapixels)){
        valid = false;
        errorMsg += "Megapixels must be a number!<br>";
    }
    if (!/([0-9]+)x([0-9]+)$/.test(input.video_size)){
        valid = false;
        errorMsg += "Video size must match format pixel_widthXpixel_height!<br>";
    }
    if (!Number(input.video_fps)){
        valid = false;
        errorMsg += "Video fps must be a number!<br>";
    }
    if (!Number(input.price)){
        valid = false;
        errorMsg += "Camera price must be a number!<br>";
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
            model: document.getElementById("model").value,
            sensor: document.getElementById("sensor").value,
            megapixels: document.getElementById("megapixels").value,
            video_size: document.getElementById("video_size").value,
            video_fps: document.getElementById("video_fps").value,
            price: document.getElementById("price").value,
            cameraShopId: document.getElementById("cameraShopId").value
        };

        if (!validate(data)){
            document.getElementById('error').innerHTML = errorMsg;
            document.getElementById('error').style.color = "red";
        }
        else{
            fetch("http://127.0.0.1:8000/api/cameras",{
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
                    document.getElementById("model").value = "";
                    document.getElementById("sensor").value = "";
                    document.getElementById("megapixels").value = "";
                    document.getElementById("video_size").value = "";
                    document.getElementById("video_fps").value = "";
                    document.getElementById("price").value = "";
                    document.getElementById("cameraShopId").value = "";
                }})
        }
    });
}