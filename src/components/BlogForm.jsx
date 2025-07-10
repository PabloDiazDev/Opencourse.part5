const BlogForm = ( ) => {
    return (
        <div>
            <form >
                <div>
                    Tittle    
                <input type="text"/>
                </div>
                <div>
                    Author
                    <input type="text"/>
                </div>
                <div>
                    URL
                    <input type="url"/>
                </div>
                <div>
                    <button type="submit"> Post blog </button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm