import React, { useState, useEffect } from "react";
import "./App.css";
// import Cardlist from "./Components/Cardlist";

const getTodoList = ()=>{
  const list = localStorage.getItem("mytodo")

  if(list){
    return JSON.parse(list)
  }else{
    return [];
  }
}

const App = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(getTodoList());
  const [isEdit, setIsEdit] = useState("")
  const [toggleButton, setToggleButton] = useState(false)
  const id = "";

  const Edit = (i)=>{
    const findItem = todoList.find((curElem,id)=>{
      return curElem.id === i;
    })
    setTodo(findItem.todo);
    setIsEdit(i);
    setToggleButton(true);
  }

  const Delete = (i)=>{
    setTodoList(todoList.filter((curElem,id)=>curElem.id !== i))
  }

  useEffect(() => {
   localStorage.setItem("mytodo", JSON.stringify(todoList));
  }, [todoList])

  

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-8 col-12">
              <div className="card my-5">
                <div className="card-header bg-primary">
                  <h1 className="text-center">Todo List App</h1>
                </div>
                <div className="card-body">
                  <div className="input-group flex-nowrap my-4">
                    <input
                      type="text"
                      value={todo}
                      className="border-0 border-bottom border-2 border-warning py-2 ps-2 w-50 input-syle"
                      placeholder="Add Todo"
                      ariaDescribedby="addon-wrapping"
                      onChange={(e) => setTodo(e.target.value)}
                    />
                    <span
                      className="input-group-text  "
                      id="addon-wrapping"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!todo) {
                          alert('fill todo')
                          
                        }else if(todo && toggleButton){
                          setTodoList(todoList.map((curElem)=>{
                              if(curElem.id === isEdit){
                                return {...curElem, todo:todo}
                              }
                              return curElem;
                          }))
                          setTodo("");
    setIsEdit(null);
    setToggleButton(false);
                        }else{
                          const updatedTodo = {
                            id: new Date().getTime().toString(),
                            todo:todo,
                          };

                          setTodoList([...todoList, updatedTodo]);
                        }

                        setTodo("");
                      }}
                    >
                      {
                        toggleButton ? (
                        <i className="fa fa-edit text-lg pe-auto  "></i>
                        ):(
                        <i className="fa fa-plus text-lg pe-auto  "></i>
                        )}
                      
                      
                    </span>
                  </div>

                  <div className="card-list">
                    <h2 className="text-start text-warning border-bottom border-dark border-2 my-3">
                      My Todo
                    </h2>
                    
                    {todoList.map((curElem, i) => {
                      return (
                        <>
                          <h5 className="card-text text-start " key={curElem.id}>
                            {i+1}
                            <span className="ms-3">
                              
                            </span>
                            {curElem.todo}
                            <span ><button onClick={()=>Edit(curElem.id)}><i className="fa fa-edit"></i></button></span>
                            <span><button onClick={()=>Delete(curElem.id)
                            }><i className="fa fa-trash"></i></button></span>
                          </h5>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="card-footer text-center">
                  <button
                    className="bg-primary text-light text-center border-0 br-3 py-2 px-5"
                    onClick={() => {
                      
                      setTodoList([]);
                    }}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
