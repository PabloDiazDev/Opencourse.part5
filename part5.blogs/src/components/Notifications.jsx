const Notifications =({errorMessage, errorState}) =>{
const messageStyleError = {
        backgroundColor: 'lightcoral',
        fontSize: 25,
        fontWeight: 'bold',
        borderStyle: 'double',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
      const messageStyleSucces = {
        backgroundColor: 'green',
        fontSize: 25,
        fontWeight: 'bold',
        borderStyle: 'double',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    if(errorMessage !== null && errorState === true)
    return (
        <div style={messageStyleError}>
        {errorMessage}
        </div>
    )
    else if (errorMessage !== null && errorState === false)
    return(
        <div style={messageStyleSucces}>
        {errorMessage}
        </div>
        )
        return null
}

export default Notifications