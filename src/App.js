import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './Components/Card/Card'
import data from './Utils/Data';

function App() {
  const [todo, setTodo] = useState(data)
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    let data = localStorage.getItem("data")
    if (data) {
      setTodo(JSON.parse(data))
    }
  }, [])

  const addHandler = () => {
    let newTodo = {  //making a new todo object
      id: Math.random(),
      title: newTitle,
      isCompleted: false,
      isDeleted: false
    }

    todo.push(newTodo) //adding new object in state
    setTodo([...todo]) // updating state
 

    localStorage.setItem("data", JSON.stringify(todo)) // Updating Local Storage with state
  }

  const completeHendlar = (id) => {
    let temp = todo;
    temp.map((e) => {
      if (e.id === id) {
        e.isCompleted = true
      }
    })
    console.log(...temp);
    setTodo([...temp])
    localStorage.setItem("data", JSON.stringify(todo))
  }

  const deleteHendlar = (id) => {
    let temp = todo

    temp.map((e) => {
      if (e.id === id) {
        e.isDeleted = true
      }
    })
    console.log(...temp)
    setTodo([...temp])
    localStorage.setItem("data", JSON.stringify(todo))
  }

  return (
    <div className='main-container'>
      <div className='title'>My Todos</div>
      <div className='input-container'>
        <input placeholder='Write your planned work..' name='todo' type='text' onChange={(data) => setNewTitle(data.target.value)} />
        <button onClick={addHandler}>Add</button>
      </div>
      <div className='card-container'>
        <p>Pendding Tasks</p>
        <div className='main-card'>
          {
            todo.map((e) => {
              if (e.isCompleted === false && e.isDeleted === false)
                return <Card title={e.title} key={e.id} id={e.id} isCompleted={e.isCompleted} complete={completeHendlar} delete={deleteHendlar} />
              else
                return <></>;
            })
          }
        </div>
      </div>
      <div className='card-container'>
        <p>Completed Tasks</p>
        <div className='main-card'>
          {
            todo.map((e) => {
              if (e.isCompleted === true && e.isDeleted === false)
                return <Card title={e.title} key={e.id} id={e.id} delete={deleteHendlar} isCompleted={e.isCompleted} />
              else
                return <></>;
            })
          }
        </div>
      </div>

    </div>
  );
}

export default App;
