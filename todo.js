const form = document.querySelector("#my-form")
const todoName = document.getElementById("todoName")
const desc = document.getElementById("description")
const addItem = document.getElementById("addItem")

form.addEventListener('submit',onSubmit);
//addItem.onclick = onSubmit;

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/1ff31f45e7aa4869b172d87d46f225da/todoList")
        .then(response => {
            const todoList = response.data;
            const todoListRem = document.getElementById("todoRem");
            const todoListDone = document.getElementById("todoDone");
            for(let i=0;i<todoList.length;i++){
                if(todoList[i].isDone){
                    showToDoDone(todoList[i]);
                }
                else{
                    showToDoRem(todoList[i]);
                }
            }
        })
        .catch(err => {console.log(err)});
})

function onSubmit(e){
    e.preventDefault();

    // if(todoName.value==='' || desc.value==='')
    //     console.log("Please enter all fields");
    
    if(todoName.value!='' || desc.value!=''){
        let obj = {
            todo: todoName.value,
            desc: desc.value,
            isDone: false
        }

        axios.post("https://crudcrud.com/api/1ff31f45e7aa4869b172d87d46f225da/todoList",obj)
            .then(response => {
                showToDoRem(response.data)
            })
            .catch(err => console.log(err))
    }

    todoName.value = '';
    desc.value = '';
}


function showToDoRem(obj){
    const parentElement = document.getElementById("todoRem")
    const childHTML = `<li id=${obj._id}> ${obj.todo} - ${obj.desc}
                       <button onclick=moveToToDoDone('${obj}')>Done</button>
                       <button onclick=deleteToDo('${obj._id}')>Delete</button>
                       </li>`
    
    parentElement.innerHTML = parentElement.innerHTML + childHTML;

    // const li = document.createElement('li');
    // li.id = obj._id;
    // //Displaying the details as object
    // li.textContent = obj.todo +" - "+ obj.desc;

    // const doneBtn = document.createElement('button');

    // doneBtn.textContent = 'Done';
    // li.appendChild(doneBtn);

    // const deleteBtn = document.createElement('button');

    // //deleteBtn.appendChild(document.createTextNode('delete'));
    // deleteBtn.textContent = 'Delete';
    // li.appendChild(deleteBtn);

    // parentElement.appendChild(li);

    // deleteBtn.onclick = () => {
    //     axios.delete(`https://crudcrud.com/api/b1afff3264634be79b544c329fcd2fa3/todoList/${obj._id}`)
    //     .then(response => {
    //         console.log("Deletion was successful");
    //         parentElement.removeChild(li);
    //     })
    //     .catch(err => console.log(err))
    // }

}

function showToDoDone(obj){
    const parentElement = document.getElementById("todoDone")
    const childHTML = `<li id=${obj._id}> ${obj.todo} - ${obj.desc} </li>`
    
    parentElement.innerHTML = parentElement.innerHTML + childHTML;
}

function deleteToDo(id){
    const parentElement = document.getElementById("todoRem");
    const childElement = document.getElementById(id);
    //console.log(id)
    axios.delete(`https://crudcrud.com/api/1ff31f45e7aa4869b172d87d46f225da/todoList/${id}`)
        .then(response => {
            parentElement.removeChild(childElement);
            console.log("Deletion was successful")
        })
        .catch(err => console.log(err))
}

function moveToToDoDone(obj){
    const parentElement = document.getElementById("todoRem");
    const childElement = document.getElementById(`${obj._id}`);
    axios.put(`https://crudcrud.com/api/1ff31f45e7aa4869b172d87d46f225da/todoList/${obj._id}`,({...obj, isDone: true}))
        .then(response => {
            parentElement.removeChild(childElement);
            showToDoDone(obj)
        })
        .catch(err => console.log(err))
}