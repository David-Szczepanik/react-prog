import {useEffect, useState} from "react";
import rawData from "./programmersData.json";
import PageContainer from "./components/PageContainer/PageContainer";
import ProgrammerList from "./components/ProgrammerList/ProgrammerList";
import ProgrammerForm from "./components/ProgrammerForm/ProgrammerForm";
import Toggler from "./components/Toggler/Toggler";
import TaskForm from "./components/TaskForm/TaskForm";
import { Helmet } from 'react-helmet';

function App() {
  const [listOfProgrammers, setListOfProgrammers] = useState(rawData.programmers);
  const [newProgrammer, setNewProgrammer] = useState({
    id:
      listOfProgrammers.length > 0
        ? Math.max(...listOfProgrammers.map((programmer) => programmer.id)) + 1
        : 1,
    name: "",
    surname: "",
    type: "",
  });


  const [activeTab, setActiveTab] = useState(1);

  const [workVolume, setWorkVolume] = useState(0);

  const [linesPerDay, setLinesPerDay] = useState(0);

  const handleLinesPerDay = (value) => {
    setLinesPerDay(value);
  };


  const handleChange = (event) => {
    const updatedProgrammer = {...newProgrammer, [event.target.name]: event.target.value};
    setNewProgrammer(updatedProgrammer);
  };

// --- ADD ---
  const handleAdd = () => {
    const newProgrammerToAdd = {
      id: newProgrammer.id,
      name: newProgrammer.name,
      surname: newProgrammer.surname,
      type: newProgrammer.type,
    };

    setListOfProgrammers((listOfProgrammer) => {
      return [...listOfProgrammer, newProgrammerToAdd];
    });

    setNewProgrammer({
      id: newProgrammer.id + 1,
      name: "",
      surname: "",
      type: "",
    });
  };

  // --- DELETE ---
  const handleDelete = (idToDelete) => {
    setListOfProgrammers(listOfProgrammers.filter((programmer) => programmer.id !== idToDelete));
  };

  //TODO:
  const handleChoose = (source) => {
    switch (source) {
      case "list-of-programmers": {
        setActiveTab(1);
        break;
      }
      case "task": {
        setActiveTab(2);
        break;
      }
      default:
        break;
    }
  };

  const handleAddToStorage = () => {
    console.log("handleAddToStorage function called");
  };


  const totalVolume = listOfProgrammers.reduce((total, programmer) => {
    return total + (programmer.type === "junior" ? 100 : 200);
  }, 0);

  return (
    <div className="App">
      <Helmet><title>React - Programátoři</title></Helmet>
      <PageContainer>
        <Toggler active={activeTab} onChoose={handleChoose}/>
        {activeTab === 1 && (
          <>
            <ProgrammerList data={listOfProgrammers} onDelete={handleDelete}/>

            <ProgrammerForm
              data={newProgrammer}
              validation={newProgrammer.name && newProgrammer.surname && newProgrammer.type}
              onChange={handleChange}
              onAdd={handleAdd}
            />
          </>
        )}
        {activeTab === 2 && (
          <>
            <h1>{}</h1>
            <h2>Plánování úkolu</h2>
            <p>Počet programátorů: {listOfProgrammers.length}</p>
            <p>Programátoři zvládnou {totalVolume} řádků za den</p>
            <p>Počet juniorů: {listOfProgrammers.filter(programmer => programmer.type === "junior").length}</p>
            <p>Počet seniorů: {listOfProgrammers.filter(programmer => programmer.type === "senior").length}</p>
            <br/>
            <p>Celkový počet řádků pro projekt: {workVolume}</p>
            <p>Potřebný počet řádků za den: {linesPerDay}</p>
            <TaskForm linesPerDay={linesPerDay} onAdd={handleAddToStorage} setAquariumVolume={setWorkVolume} aquariumVolume={workVolume}
                      totalVolume={totalVolume} handleLinesPerDay={handleLinesPerDay}/>

          </>
        )}
      </PageContainer>
    </div>
  );

}

export default App;
