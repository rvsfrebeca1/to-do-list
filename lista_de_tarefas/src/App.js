import { useState } from 'react'
function App() {
  const [tasks, setTasks] = useState([])
  const [tasksNoFilter, setTasksNoFilter] = useState([])

  function filterTask(state) {
    const tasksIncomplete = tasksNoFilter.filter(x => {
      return x.taskComplete === state
    })

    return tasksIncomplete

  }
  function handleKeyDown(event) {
    if (event.key !== "Enter" || event.target.value === '') return;
    const novaTarefa = [...tasks, { id: Math.random(), text: event.target.value, taskComplete: false }]

    setTasks(novaTarefa)
    setTasksNoFilter(novaTarefa)
    event.target.value = ''
  }
  function handleComplete(task) {
    const novasTasks = [...tasks]

    const taskFind = novasTasks.find(x => {
      return task.id === x.id
    })

    taskFind.taskComplete = !taskFind.taskComplete
    setTasks(novasTasks)
  }
  function handleDelete(tarefa) {

    const novasTarefas = tasks.filter(x => {
      return tarefa !== x
    })
    setTasks(novasTarefas)
    setTasksNoFilter(novasTarefas)
  }
  function handleTodas() {
    setTasks(tasksNoFilter)
  }
  function handleAtivas() {
    setTasks(() => filterTask(false))
  }
  function handleLimpar() {
    setTasks(filterTask(false))
    setTasksNoFilter(tasks)
  }
  function handleCompletada() {
    filterTask(true)

    if (filterTask(true).length === 0) return
    setTasks(() => filterTask(true))
  }
  function itemCounter() {
    const taksCopy = [...tasks]
    const taksIncompletas = taksCopy.filter(x => {
      return x.taskComplete === true
    })
    const numTasksIncomplete = taksIncompletas.length
    const numTaskComplete = tasks.length - numTasksIncomplete
    return numTaskComplete
  }

  return (
    <div className="App">
      <img className="app__background" src='../assets/background.jpg' alt="" />
      <div className="main">
        <h1 className="main__title">TAREFAS</h1>

        <input onKeyDown={handleKeyDown} className="main__input" type="text" name="" id="" placeholder="Criar nova Tarefa" />
        <ul>
          {
            tasks.map(task => {
              return (
                <li className="main__task" key={task.id}>
                  <span onClick={() => handleComplete(task)}
                    style={task.taskComplete === true ? {
                      textDecoration: "line-through",
                      color: "#D1D2DA"
                    } : {}} className="main__task_span">{task.text}
                  </span>

                  <img onClick={() => handleDelete(task)} className="main__task_img" src="../assets/delete.svg" alt="" />
                </li>
              )
            })
          }
        </ul>
        <div className="tasks__info">
          <span>{itemCounter()} itens restantes</span>
          <div className="tasks__infos__button">
            <button onClick={handleTodas}>Todas</button>
            <button onClick={handleAtivas}>Ativas</button>
            <button onClick={handleCompletada}>Completada</button>
          </div>
          <span onClick={handleLimpar} className="tasks__info__clear">Limpar Completadas</span>
        </div>
      </div>


    </div>
  );
}
export default App;
