import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import UseDropdown from './UseDropdown';
import Pet from "./Pet";

const SearchParams = () => { // functional component for hooks.
  const [location, updateLocation] = useState("Seattle, WA");
  //const [animal, updateAnimal] = useState("dog");
  //const [breed, updateBreed] = useState('');
  const [breeds, updateBreeds] = useState([]); 
  const [animal, AnimalDropdown] = UseDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown] = UseDropdown('Breed', '', breeds)

  //useEffect schedules the function to run after the render happens. Render runs 1st..(Duhhh..🙄) 
  //useEffect takes the place of componentDidMount 
  useEffect(() => {
     pet.breeds('dog').then(console.log, console.error);
  });


  return (
    <div className="search-params">
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
    </div>
  );
};

export default SearchParams;
