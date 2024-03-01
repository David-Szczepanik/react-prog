import React, {useEffect, useState} from "react";
import "./TaskForm.css";

function TaskForm({
                    onAdd,
                    setAquariumVolume: setProgrammerVolume,
                    totalVolume,
                    handleLinesPerDay,
                    linesPerDay
                  }) {
  const [volume, setVolume] = useState({
    lines: "",
    days: "",
  });


  const handleStorage = (event) => {
    setVolume({...volume, [event.target.name]: event.target.value});
  };


  useEffect(() => {
    if (volume.lines && volume.days) {
      const linesPerDay = volume.lines / volume.days;
      handleLinesPerDay(linesPerDay);
    }
  }, [volume, handleLinesPerDay]);


  useEffect(() => {
    const updatedVolume = (volume.lines * volume.days);
    setProgrammerVolume(updatedVolume);
  }, [volume, setProgrammerVolume]);


const buttonStyle = {
  backgroundColor: totalVolume >= linesPerDay ? 'green' : 'red'
};

  return (
    <div className="programmer-form">
      <input
        type="number"
        min="0"
        placeholder="Počet řádků aplikace"
        name="lines"
        value={volume.lines}
        onChange={handleStorage}
      />
      <input
        type="number"
        min="0"
        placeholder="Počet dní k dokončení"
        name="days"
        value={volume.days}
        onChange={handleStorage}
      />

      <button style={buttonStyle} disabled={totalVolume < linesPerDay} onClick={onAdd}>
  Schválit úkol
</button>
    </div>
  );
}

export default TaskForm;
