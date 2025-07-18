const CloseLogin = ({setUser, setErrorState, setErrorMessage}) => {
    const logOutHandler = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUserData')
    setUser(null)
    setErrorState(false)
    setErrorMessage('Logged out succesfully')
    setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
}
     return (
    <button onClick={logOutHandler}> LogOut</button>
)
}
export default CloseLogin