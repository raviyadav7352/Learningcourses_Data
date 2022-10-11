let degree = [
    {course:"10th", subject:"general", marks:72.2, year:2015},
    {course:"12th", subject:"science", marks:66.8, year:2017},
    {course:"B.Tech", subject:"electrical", marks:82.4, year:2022}
    
];

/* page loading */
let submit = document.getElementById("submitform");
let update = document.getElementById("update");
let resultsbox = document.getElementById("results");
let course =document.getElementById("course");
let subject =document.getElementById("subject");
let marks =document.getElementById("marks");
let year =document.getElementById("year");
let screendegree = document.getElementById("screen");
let addbtn = document.getElementById("addcourse");
let popup = document.getElementById("popup")
//var newdegreeedit ;
var item =0;

createbutton(resultsbox, degree)

//button create function
function createbutton(parent, arr, isEdited){
    
    let html= '';

    let len = arr.length;
    for(let i = 0; i<len; i++){
        html += `<div class="list" type="${arr[i].subject}">
                     <button purpose="button" id="${arr[i].subject}">${arr[i].course}</button>
                    <span type="${arr[i].subject}" purpose="delete" class="delete-link">Delete</span>
                    <span named="${arr[i].subject}" purpose="edit" class="edit-link">Edit</span>
                </div>`
    }
    if(isEdited) {
        parent.innerHTML = html;
    } else {
        parent.insertAdjacentHTML('beforeend', html)
    }
}

// button click event
resultsbox.addEventListener("click", function(event){
    let element =event.target;
    let purpose = element.getAttribute("purpose");

    if( purpose == "button"){
        let userid = element.getAttribute("id");
        let degreevalue = degreedetail(userid);
        degreeScreen(degreevalue);
    } 
    else if ( purpose == 'delete') {
        var linktype = element.getAttribute('type');
        deleteDegreeItem(degree, linktype);
    }
    else if(purpose == "edit"){
        var edittype = element.getAttribute("named");
        editDegreeItem(degree, edittype);
    }

})

function degreedetail(userid){
    let lengthdegree = degree.length
    for(let i = 0; i<lengthdegree; i++){
        if(userid == degree[i].subject){
            return degree[i];
        }
    }
}

function deleteDegreeItem(arr, type) {
   
    var itemIndex = arr.findIndex(function(item){
                        return item.subject === type;
                    });
       
    arr.splice(itemIndex,1);
    
    resultsbox.querySelector('[type="'+type+'"]').remove();
    screendegree.style.display ="none"
}

function editDegreeItem(arr, type){
     item = arr.findIndex(function(itemedit){
        return itemedit.subject === type;
    });
    
    let degreeitem = degree[item]
    course.value = degreeitem.course
    subject.value = degreeitem.subject
    marks.value = degreeitem.marks
    year.value = degreeitem.year
    screendegree.style.display ="block"
    popup.style.display ="flex"
    update.style.display ="block"
    submit.style.display ="none"
} 

update.addEventListener("click", function(){
     let newdegreeedit ={course:course.value, subject:subject.value, marks:marks.value, year:year.value};
    degree[item] = newdegreeedit;
    popup.style.display = "none";
    createbutton(resultsbox, degree, true)
    
    resetInput();
 })

 function resetInput() {
    course.value = ''
    subject.value = ''
    marks.value = ''
    year.value = ''
 }
 


function degreeScreen(menu){
    let degreeTable = '<table class="tables"><tr class="trhead">'
    for(let key in menu){
        degreeTable +=`<th>${key}</th>`
    }
    degreeTable += '</tr><tr>'

    for(let key in menu){
        degreeTable +=`<td>${menu[key]}</td>`
    }
    degreeTable += '</tr></table>'
    screendegree.style.display ="block"
    screendegree.querySelector("#degreedetail").innerHTML = degreeTable;
    screendegree.querySelector("#closebtn").addEventListener("click",closedisplay);
}

function closedisplay(){
    screendegree.style.display ="none";
}

addbtn.addEventListener("click",function(event){
    update.style.display ="none"
    popup.style.display ="flex"
    submit.style.display ="block"
})
let closepagebtn =document.getElementById("closepagebtn");
closepagebtn.addEventListener("click",function(){
    popup.style.display ="none"
    resetInput();
    
})




submit.addEventListener("click", newdegreedata)

function newdegreedata(){ 
    let newDegree = {course:course.value, subject:subject.value, marks:marks.value, year:year.value}
    degree.push(newDegree);
    createbutton(resultsbox, [newDegree], false);
    resetInput()
    popup.style.display ="none"

    

}




 