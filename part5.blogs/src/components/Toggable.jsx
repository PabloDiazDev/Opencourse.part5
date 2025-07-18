import { useImperativeHandle, useState } from "react"
import PropTypes from "prop-types"
const Togglable = (props) => {
    const {ref, buttonLabel, children } = props
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}
    
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
        toggleVisibility
        }
    })
    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }

    return(
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}
export default Togglable
