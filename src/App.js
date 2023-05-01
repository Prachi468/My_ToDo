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
    setNewTitle('');
  }

  const completeHendlar = (id) => {
    let temp = todo;
    let cid=todo.findIndex(item=>{return item.id===id});//index of object which is to changed;
    console.log(temp[cid].isCompleted);
    temp[cid].isCompleted=true;
    setTodo([...temp])
    localStorage.setItem("data", JSON.stringify(todo))
  }

  const deleteHendlar = (id) => {
    let temp=todo;
    let did=todo.findIndex(item=>{return item.id===id});//index of the object which is to be deleted.
    temp.splice(did,1)//remove the object which is to be delted and only one object not the other ones.
    localStorage.setItem("data",JSON.stringify(todo));
    setTodo([...temp]);

  }

  return (
    <div className='main-container'>
      <div className='title'>My Todos</div>
      <div className='input-container'>
        <input placeholder='Write your planned work..' name='todo' value={newTitle} type='text' onChange={(data) => setNewTitle(data.target.value)} />
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