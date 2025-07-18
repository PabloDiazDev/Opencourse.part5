import blogService from '../services/blogs'
import loginService from '../services/userLogin'

const LoginForm = ({username, password, setUsername, setPassword, handleUsernameChange, handlePasswordChange, setUser, setErrorMessage, setErrorState, errorMessage}) => {
    
const handleLogin = async (event) => {
        event.preventDefault()   
try {
    const user = await loginService.login({
        username, password
    })
    window.localStorage.setItem(
    'loggedUserData', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setErrorState(false)
    setErrorMessage('logged successfully')
    setTimeout(()=>{
        setErrorMessage(null)
    }, 5000)
    setUsername('')
    setPassword('')

}
catch (excepcion) {
    setErrorState(true)
    setErrorMessage('wrong credentials')
    setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
}
}

return (
    <form onSubmit={handleLogin} test-id="login-form">
        <div>
            Username:
            <input
             type="text"
             value={username}
             name="Username"
             placeholder='Enter your username'
             onChange={handleUsernameChange}
             />
        </div>
        <div>
            Password:
            <input
            type="password"
            value={password}
            name="Password"
            placeholder='Enter your password'
            onChange={handlePasswordChange}
            />
        </div>
        <div>
            <button type="submit"> Log in </button>
        </div>
    </form>
)
}
export default LoginForm
