const PersonForm = (props) => {
    return(
        
        <form onSubmit={props.addNew}>
          <div>  
            name: <input 
                value={props.newName}
                onChange={props.handleNameChange}/>
          </div>
          <div>
            number: <input 
                value={props.newNumber}
                onChange={props.handleNumberChange}/>
          </div>
          <button type="submit">add</button>
      </form>
    )
}

export default PersonForm