import './LoginForm.css';

export default function LoginForm() {
    return <div id='cms-login-form'>
        <span id='cms-login-name'>Panel Administracyjny Bookstore</span>
        <label for='cms-login' id='cms-login-label' className='cms-login-label'>Login: </label>
        <input type='text' id='cms-login-input' name='cms-login' className='cms-login-input'></input>

        <label for='cms-password' id='cms-password-label'className='cms-login-label'>Hasło: </label>
        <input type='password' id='cms-password-input' name='cms-password' className='cms-login-input'></input>
        <div id='cms-login-bttn'>Zaloguj</div>
    </div>
}