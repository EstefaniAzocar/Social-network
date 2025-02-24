import { singIn, singInGoogle} from "../firebase/authentication.js"
import { onNavigate } from "../lib/index.js"



function createLoginPage () {

    const loginPageContainer = document.createElement('div')
    loginPageContainer.className = "loginPage"

    loginPageContainer.innerHTML = `
        <img src="../img/home.png" alt="home icon" class="loginPage_home">
        <h1 class="loginPage_welcome">Bienvenidos</h1>
        <h5 class="loginPage_msg">Haz parte de esta comunidad</h5>
        <img src="../img/logoKnitters.png" alt="logo Knitters" class="loginPage_logo">
        
        <form id="form" class="loginPage_formSingIn">
            <input required type="email" name="email" placeholder="Tu Email" id="email">
            <div class="inputPassword"> 
                <input required type="password" name="password" placeholder="Tu Contraseña" id="password" pattern="(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,13}">
                <img src="../img/eyesClose.png" alt="eye" class="inputPassword_eye">
            </div>
            <button type="submit" class="loginPage_btnSinIn" id="btnSingIn">Iniciar sesión</button>
        </form>

        <div class="loginPage_singInGoogle">
            <img src="../img/google.png" alt="logo google" class="loginPage_singInGoogle--logo">
            <a href="" class="loginPage_singInGoogle--text" id='singInGoogle'>Acceder con Google</a>
        </div>

        <div class="loginPage_singUp">
            <span class="loginPage_singUp--text">No tienes cuenta?</span>
            <a href="" class="loginPage_singUp--register" id='register'>Registrate</a>
        </div>
    `

    const email = loginPageContainer.querySelector('#email')
    const password = loginPageContainer.querySelector('#password')


    loginPageContainer.querySelector('#form').addEventListener('submit',(e)=>{
        e.preventDefault()
        console.log('me estoy logueando')
        singIn(email.value, password.value).then((result)=>{

            if(result.error){
                alert(errorsDict[result.error] || '404 error')
                return 
            }

            onNavigate('/wall')
        })

    })


    loginPageContainer.querySelector('#singInGoogle').addEventListener('click', (event) => {
        console.log('iniciar sesion con google')
        event.preventDefault()
        singInGoogle()

        // onNavigate('/profile')
    });

    loginPageContainer.querySelector('#register').addEventListener('click', (event) => {
        console.log('llevar a formulario de registro')
        event.preventDefault()
        onNavigate('/register')

    })

    loginPageContainer.querySelector('.loginPage_home').addEventListener('click', () => {
        console.log('llevar a landingPge')
        onNavigate('/')

    })

    //mostrar contraseña

    const showPassword = loginPageContainer.querySelector('.inputPassword_eye')
    showPassword.addEventListener('click', () => {

        if(showPassword.src === "http://localhost:3000/img/eyesClose.png" && password.type === "password") {
            
            showPassword.src = "../img/eye.png"
            password.type = "text"

        } else {
            
            showPassword.src = "../img/eyesClose.png"
            password.type = "password"
        }
    })

    return loginPageContainer
}

const errorsDict = {
    'auth/user-not-found': 'El usuario no esta registrado',
  }


export {
    createLoginPage
}