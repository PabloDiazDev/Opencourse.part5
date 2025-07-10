import loginService from '../services/userLogin'
import blogService from '../services/blogs'
const LoginForm = ({username, password, setUsername, setPassword, setUser, setErrorMessage, setErrorState, errorMessage}) => {
    
const handleLogin = async (event) => {
        event.preventDefault()
        console.log('loggin in with', username, password)
    
try {
    const user = await loginService.login({
        username, password
    })
    window.localStorage.setItem(
    'loggedUserData', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
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
