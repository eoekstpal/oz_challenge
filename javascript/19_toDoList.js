const todoList = document.getElementById('todo-list')
const todoForm = document.getElementById('todo-form')
let todoArr = [];

//로컬 저장소에 저장하기
function saveTodos() {
    const todoString = JSON.stringify(todoArr)
    localStorage.setItem("myTodos", todoString)
}

//로컬 저장소에서 가져오기
function loadTodos(){
    const myTodos = localStorage.getItem("myTodos")
    if(myTodos !== null){
    todoArr = JSON.parse(myTodos)
    displayTodos()
    }
}
loadTodos()

//할일 삭제하기
function handleTodoDelBtnClick(clickedId){
    todoArr = todoArr.filter(function(aTodo){
        return aTodo.todoId !== clickedId
    })
    displayTodos()
    saveTodos()
}

//할일 수정하기 (할일을 클릭했을 때 id를 받아서 해당하는 class만 수정)
function handleTodoItemClick(clickedId){
    todoArr = todoArr.map(function(aTodo){
        //클릭한 todo에 해당하는 id가 map에서 나오면 기존의 todo에 todoDone을 반전시켜 저장
        if(aTodo.todoId === clickedId){
            return{
                ...aTodo, todoDone: !aTodo.todoDone
            }
        }else{
            return aTodo
        }
    })
    displayTodos()
}

//할일 보여주기
function displayTodos(){
    todoList.innerHTML = ""
    todoArr.forEach(function(aTodo){
        const todoItem = document.createElement('li')
        const todoDelBtn = document.createElement('span')
        todoDelBtn.textContent = 'x'
        todoItem.textContent = aTodo.todoText
        todoItem.title = "클릭하면 완료됨"
        //css 추가하기 위하여 기본은 todoDone=false
        if(aTodo.todoDone){
            todoItem.classList.add("done")
        }else{
            todoItem.classList.add("yet")
        }
        todoDelBtn.title = "클릭하면 삭제됨"

        todoItem.addEventListener("click", function(){
            handleTodoItemClick(aTodo.todoId)
        })

        todoDelBtn.addEventListener("click", function(){
            handleTodoDelBtnClick(aTodo.todoId)
        })

        todoItem.appendChild(todoDelBtn)
        todoList.appendChild(todoItem)
    })
}

//할일 추가하기
todoForm.addEventListener("submit", function(e){
    e.preventDefault() //submit해도 새로고침 되지 않게함
    const toBeAdded = {
        todoText: todoForm.todo.value, //todoForm의 name이 todo인 요소의 value
        todoId: new Date().getTime(), //생성 날짜를 식별자로(시간정보를 정수형으로 받음)
        todoDone: false
    }
    todoForm.todo.value = "" //submit한 후 입력칸 내용 지움
    todoArr.push(toBeAdded)
    displayTodos()
    saveTodos()
})