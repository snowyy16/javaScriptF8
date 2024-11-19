

let courseAPI='http://localhost:3000/Courses'


function start(){
    getCourses(renderCourses);
    handleCreateForm();
}

start();

// function
function getCourses(callback) {
    fetch(courseAPI)
        .then((response)=>{
            return response.json();
        })
        .then(callback)
}

function createCourse(data,callback){
    let options ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    }
    fetch(courseAPI,options)
        .then((response)=>{
            return response.json();
        })
        .then(callback)
}
function handleDeleteCourse(id){
    let options ={
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    }
    fetch(courseAPI + '/' + id,options)
        .then((response)=>{
            return response.json();
        })
        .then(()=>{
          let courseItem = document.querySelector('course-item-' +id)
          if(courseItem){
            courseItem.remove()
          }
        })
}

function renderCourses(courses){
    let listCoursesBlock = document.querySelector("#list-courses")
    let htmls = courses.map((course)=>{
        return `<li class="course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="handleDeleteCourse(${course.id})">Xoa</button>
        </li>
        `;
    })
    listCoursesBlock.innerHTML = htmls.join('')
}

function handleCreateForm(){
    let createBtn = document.querySelector("#create")
    createBtn.onclick = (()=>{
        let name = document.querySelector("input[name='name']").value
        let description = document.querySelector("input[name='description']").value
        
        let formData = {
            name: name,
            description: description
        }
        createCourse(formData,()=>{
            getCourses(renderCourses)
        })
    })
}