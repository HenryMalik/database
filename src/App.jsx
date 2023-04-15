import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BsCheckLg } from "react-icons/bs"
import { BsTrashFill } from "react-icons/bs"

const url = "http://192.168.1.6:3000"
//ganti jadi localhost atau 127.0.0.1

const ambilData = async () => {
  const fetching = await fetch(url);
  const data = await fetching.json();
  console.log("ambilData", data)
  return data;
}

const hapusData = async (param) => {
  const fetching = await fetch(url + "/hapus", {
    method: "POST",
    body: JSON.stringify({ id: param }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  const data = await fetching.json();
  console.log("hapusData", data, param)
  return data;
}

//tambahData

function App() {
  const [list, setlist] = useState()

  const saveData = async () => {
    const result = await ambilData();
    console.log("result", result);
    const format = result.data.map((item) => ({ text: item.todo, id: item.id }))
    setlist(format)
  }

  useEffect(() => {
    saveData();
  }, [])

  const [input, setinput] = useState("")
  const renderList = ({ text, id }, index) => {
    return (
      <div className='listcontainer'>
        <li
          style={{
          }}
        >{text}</li>


        <BsTrashFill
          color={'lightblue'}
          style={{
            fontSize: "150%",
            marginLeft: "1rem"
          }}
          onClick={async function () {
            const result = await hapusData(id);
            if (result.status == "success") {
              saveData()
            }
          }}
        />
      </div>
    )
  }

  const addTask = () => {
    if (input !== "") {
      //tambahData
      //jika status == success maka panggil saveData
      setinput("")
    }
  }

  const TampilkanList = () => {
    if (list == undefined) {
      return (
        <h2>Loading ...</h2>
      )
    } else {
      return list.map(renderList)
    }
  }

  return (
    <div>
      <h2>TODO LIST</h2>
      <div className='input'>
        <input type="text" id='taskInput' placeholder='Text..' value={input} onChange={function (data) {
          setinput(data.target.value)
        }} />
        <button onClick={addTask} className='addbutton'>Add Task</button>
      </div>
      <ol id='todolist'>
        <TampilkanList />
      </ol>
    </div>
  )
}

export default App