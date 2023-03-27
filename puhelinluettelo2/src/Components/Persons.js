const Person = ({name, number, deletePerson}) => {
    return (
        <div>
            {name} {number} <button onClick={deletePerson}>delete</button>
        </div>
    )
}

const Persons = (props) => {
    return(
      <div>
        {props.filterPersons.map(person=>
          <Person
            key={person.name}
            name={person.name} 
            number={person.number} 
            deletePerson={() => props.deletePerson(person.id)}
          />
          )}
      </div>
    )
}

export default Persons