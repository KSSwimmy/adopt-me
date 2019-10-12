import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import UseDropdown from './UseDropdown';
import Results from './Results';
//import pet from "./Pet";

const SearchParams = () => { // functional component for hooks.
  const [location, updateLocation] = useState("Seattle, WA");
  //const [animal, updateAnimal] = useState("dog");
  //const [breed, updateBreed] = useState('');
  const [breeds, setBreeds] = useState([]); 
  const [animal, AnimalDropdown] = UseDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = UseDropdown('Breed', '', breeds)
  const [pets, setPets] = useState([]); // empty arrays because when you 1st request things from the api theres going to nothing there


  //anything that is an async function is guaranteed to return a promise that resolve whenever this function completes.
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    })

    //setting the pets with the animals OR if it comes back with nothing just set it to continue to be an empty array.
    setPets(animals || []); //
  }

  //useEffect schedules the function to run after the render happens. Render runs 1st..(Duhhh..🙄) 
  //useEffect takes the place of componentDidMount 

  //changing the Breed dropdown when Animal is changed. So it will make sense when choosing a pet. It switches out the option list for Breed
  //this effect only changes when it is changed
  useEffect(() => {
    setBreeds([]); // this restarts the Animal dropdown to change to the correct Breed
    setBreed(''); //

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      console.log(animal)
      const breedStrings = apiBreeds.map(({ name }) => name );
      setBreeds(breedStrings);
      console.log('breedStrings',breedStrings)
      console.log('pet' ,pet)
    }, console.error); 
  
  }, [animal, setBreed, setBreeds]); // useEffect requires that you declare the dependencies. It will only run when these things change. The render will run continuously with them. 
      //So! If any of these things changed rerun this effect after it renders otherwise don't run it again. 

      //without those dependencies it will create an infinite loop (yikes!)

      //Empty arrays in the function without any dependencies will only update once at "mount"

  return (
    <div className="search-params">
      <form onSubmit={(event) => {
            event.preventDefault(); // this will prevent it from submitting a HTML post form.
            requestPets();
          }}></form>
      <form>
        {/* Location */}
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={event => updatedLocation(event.target.value)}
            onBlur={event => updateLocation(event.target.value)}
          />
        </label>

        {/* Animal
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={event => updateAnimal(event.target.value)}
            onBlur={event => updateAnimal(event.target.value)}
          >
            <option>All Animals</option>
            {ANIMALS.map(animal => (
              <option 
                key={animal} 
                value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor='breed'>
            <select
            id='breed'
            value={breed}
            onChange={event => updateBreed(event.target.value)}
            onBlur={event => updateBreed(event.target.value)}
            // if breeds.lenght is 0 you can't click on it. 
            disabled={breeds.length === 0}
            >
            
            <option>All Breeds</option>
            {breeds.map(breedString => (
                <option key={breedString} 
                value={breedString}>
                {breedString}
                </option>
            ))}

            </select>
        </label> */}

        <AnimalDropdown />
        <BreedDropdown />


        <button>Submit</button>
      </form>
      <Results pets={pet} />
    </div>
  );
};

export default SearchParams;
