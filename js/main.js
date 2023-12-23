
// inputs variables***
var userNameInput = document.getElementById('userNameInput')
var emailInput =document.getElementById('email')
var passwordInput = document.getElementById('password')
var emailSingIn = document.getElementById('emailsignin')
var passwordSignIn = document.getElementById('passwordsignin')

// buttons variables***
var signUpBtn = document.getElementById('signUp')
var signInBtn = document.getElementById('singIn')
var logOut = document.getElementById('logOut')

// validation message*****
var inputValid = document.getElementById('inputValid')
var signinValid = document.getElementById('signinValid')


// to get base url 
var pathPart = window.location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathPart.length-1; i++) {
    baseURL += '/' + pathPart[i]
}


var userList = []
if(localStorage.getItem('users')){
    userList = JSON.parse(localStorage.getItem('users'))
}

// adding user function in Sign Up*************************************
if(signUpBtn){
    signUpBtn.addEventListener('click',addUser) 
}
function addUser(){
    if(validUserName()==true & validUserEmail()== true & validUserPass() == true){
        var user={
        name: userNameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }
    inputValid.classList.add('text-success')
    inputValid.innerHTML = "Success !"
    userList.push(user)
    }else{
    inputValid.classList.add('text-danger')
    inputValid.innerHTML = "All Input Are Required!"
    }
    if (isExist()== true){
        console.log('fail');
        inputValid.classList.add('text-danger')
        inputValid.innerHTML = "email already exists"
    }else{
        console.log('pass');
        localStorage.setItem('users', JSON.stringify(userList))
    }
    
    clearInputs()
}
// check if the email existed before*******************

function isExist(){
    var email = emailInput.value
    for(var i=0; i<userList.length; i++){
        if(userList[i].email.toLowerCase()=== email.toLowerCase()){
            return true
        }else{
            return false
        }
    }   
}

//Sign In user function*************************************
if(signInBtn){
    signInBtn.addEventListener('click', signin)
}
function signin(){
    var pass = passwordSignIn.value
    var email = emailSingIn.value
    for(var i=0; i<userList.length; i++){
        if(userList[i].email.toLowerCase() === email.toLowerCase() && userList[i].password.toLowerCase() === pass.toLowerCase()){
            localStorage.setItem('username', userList[i].name)
            if (baseURL == '/') {
                window.location.replace('https://' + window.location.hostname + '/pages/home.html')
            
            } else {
                window.location.replace(baseURL + '/pages/home.html')

            }
        
        }else{
            signinValid.innerHTML ='Incorrect email or password. Please try again.'
        }
    }
    clearSignIn()
}

// clear function for sign in-----------------------------------------------
function clearSignIn(){
    passwordSignIn.value =''
    emailSingIn.value =''
}

// clear function for sign up-----------------------------------------------
function clearInputs(){
    userNameInput.value =''
    emailInput.value=''
    passwordInput.value=''
    if(userNameInput.classList.contains("is-valid") &
    emailInput.classList.contains("is-valid") & passwordInput.classList.contains("is-valid")){
        userNameInput.classList.remove('is-valid')
        emailInput.classList.remove('is-valid')
        passwordInput.classList.remove('is-valid')
    }else{
        userNameInput.classList.remove('is-invalid')
        emailInput.classList.remove('is-invalid')
        passwordInput.classList.remove('is-invalid')
    }
}

// valid function for user name
if(userNameInput){
    userNameInput.addEventListener('input', validUserName)
}
function validUserName(){
    var userName= userNameInput.value
    var regexName = /^\w{3,}(\s+\w+)*$/;

    if(regexName.test(userName)== true){ //valid
        userNameInput.classList.add('is-valid')
        userNameInput.classList.remove('is-invalid')
        return true;
    }else{ //not valid
        userNameInput.classList.add('is-invalid')
        userNameInput.classList.remove('is-valid')
        return false;
    }
}


// valid function for user email
if(emailInput){
    emailInput.addEventListener('input', validUserEmail)
}
function validUserEmail(){
    var userEmail= emailInput.value
    var regexEmail = /^\S+@\S+\.\S+$/;
    if(regexEmail.test(userEmail)== true){ //valid
        emailInput.classList.add('is-valid')
        emailInput.classList.remove('is-invalid')
        return true;
    }else{ //not valid
        emailInput.classList.add('is-invalid')
        emailInput.classList.remove('is-valid')
        return false;
    }

}
// valid function for user password
if(passwordInput){
    passwordInput.addEventListener('input', validUserPass)
}
function validUserPass(){
    var userPass= passwordInput.value
    var regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if(regexPassword.test(userPass)== true){ //valid
        passwordInput.classList.add('is-valid')
        passwordInput.classList.remove('is-invalid')
        return true;
    }else{ //not valid
        passwordInput.classList.add('is-invalid')
        passwordInput.classList.remove('is-valid')
        document.getElementById('rulesPass').innerHTML ="*password Must contain at least one Uppercase character, one lowercase character, one symbol and Must be 8 in lenght"
        return false;
    }

}


// welcome page function*******************************
var userNameWelcome = localStorage.getItem('username')
if(userNameWelcome){
    document.getElementById('userName').innerHTML = 'Wlecome ' + userNameWelcome
}