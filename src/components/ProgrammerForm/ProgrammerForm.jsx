import React, {useState} from "react";
import "./ProgrammerForm.css";

function ProgrammerForm({data, onChange, validation, onAdd}) {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    onChange(event);
  };


  return (
    <div className="programmer-form">
      <input
        type="text"
        placeholder="Jméno"
        name="name"
        value={data.name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Příjmení"
        name="surname"
        value={data.surname}
        onChange={onChange}/>
      <div>
        <label>
          <input
            type="radio"
            name="type"
            value="junior"
            checked={data.type === "junior"}
            onChange={handleTypeChange}
          />
          Junior
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="senior"
            checked={data.type === "senior"}
            onChange={handleTypeChange}
          />
          Senior
        </label>
      </div>
      {/*<p>Selected type: {selectedType}</p>*/}
      <button disabled={!validation} onClick={onAdd}>
        Přidat
      </button>
    </div>
  );
}


export default ProgrammerForm;
