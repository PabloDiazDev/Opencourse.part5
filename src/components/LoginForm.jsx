import blogService from '../services/blogs'
import loginService from '../services/userLogin'

const LoginForm = ({username, password, setUsername, setPassword, setUser, setErrorMessage, setErrorState, errorMessage}) => {
    
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
    setErrorMessage('logged succesfully')
    setTimeout(()=>{
        setErrorMessage(null)
    }, 2000)
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
    <form onSubmit={handleLogin}>
        <div>{errorMessage}</div>
        <div>
            Username:
            <input
             type="text"
             value={username}
             name="Username"
             onChange={({ target }) => setUsername(target.value)}
             />
        </div>
        <div>
            Password:
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <div>
            <button type="submit"> Login </button>
        </div>
    </form>
)
}
export default LoginForm
