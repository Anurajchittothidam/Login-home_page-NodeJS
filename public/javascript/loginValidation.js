const form = document.querySelector('form')
const username = form.querySelector('#username')
const password = form.querySelector('#password')
const errorElement = document.querySelector('#error')

let timeOut;
function showErrorMsg(error) {
    errorElement.innerHTML = `<div  class="alert alert-danger d-flex justify-content-between" role="alert">${error} 
    <div class="close text-dark fs-4" style="cursor:pointer" onclick="hideErrorMsg()">X</div>
    </div>`
    clearTimeout(timeOut)
    timeOut=setTimeout(()=>{
        errorElement.innerHTML=""
    },3000)
}

setTimeout(()=>{
    errorElement.innerHTML=""
},3000);

function hideErrorMsg(){
    errorElement.innerHTML = ""
    clearTimeout(timeOut)
}

function submitform(e) {

    if(username.value === "" & password.value === ""){
        showErrorMsg("Enter the Name and Password")
        return false;
    }
    if (username.value === "") {
        showErrorMsg("Enter the Name")
        return false;
    }
    if(password.value === "" ){
        showErrorMsg("Password is Required")
        return false;
    }if(password.value.length>10){
        showErrorMsg("The password is not more than 10 letters")
        return false;
    }
    hideErrorMsg()
    return true;
}

showPassword.onclick=(e)=>{
    document.getElementById('password');
    if(password.type==='text'){
        password.type='password'
    }else{
        password.type='text';
    }
}