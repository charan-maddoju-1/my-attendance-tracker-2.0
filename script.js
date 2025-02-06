
let setAttendanceBtn=document.getElementById("setButton");
let attendanceGoalInputElement=document.getElementById("attendanceGoalInput");
let introPage=document.getElementById("introPage");
let mainPage=document.getElementById("mainPage");

let attendanceGoal=attendanceGoalInputElement.value; 
let overAllAttendanceGoal={
    goal:parseInt(attendanceGoal)
}
setAttendanceBtn.onclick=function(){
    let attendanceGoal=attendanceGoalInputElement.value;    
    if(attendanceGoal===""||attendanceGoal===" "){
        alert("Enter a valid input");
    }
    else{
        mainPage.classList.remove("d-none");
        introPage.classList.add("d-none");
    }
    
    localStorage.setItem("overAllAttendanceGoal",JSON.stringify(subjectsList));
}

let subjectInputElement=document.getElementById("subjectInputElement");
let addButtonElement=document.getElementById("addButton");
let overAllAttendance=document.getElementById("overAllAttendance");
let overAllAttendanceLabel=document.getElementById("overAllAttendanceLabel");
let deleteAllButton=document.getElementById("deleteAllBtn");
let overAllAttendanceContainer=document.getElementById("percentageContainer");

let subjectsContainerRowElement=document.getElementById("subjectsContainer");


// subject1={
//     name:"Telugu",
//     goal:80,
//     uniqueId:1,
//     attendedCount:0,
//     totalCount:0,
//     subPercent:0
// };
// subject2={
//     name:"Hindi",
//     goal:80,
//     uniqueId:2,
//     attendedCount:0,
//     totalCount:0,
//     subPercent:0
// };
// subject3={
//     name:"English",
//     goal:80,
//     uniqueId:3,
//     attendedCount:0,
//     totalCount:0,
//     subPercent:0
// };

subjectInputElement.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        attendanceGoalInputElement.focus();
    }
})
attendanceGoalInputElement.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        addButtonElement.onclick();
        subjectInputElement.focus();
    }
})

//localStorage.removeItem("subjectsList");

function getsubjectsListFromStorage(){
    let subjectsListFromStorage=localStorage.getItem("subjectsList");
    let parsedSubjectsList=JSON.parse(subjectsListFromStorage);
    if(parsedSubjectsList===null){
        return[];
    }
    else{
        return parsedSubjectsList;
    }
}

function getOverAllPercentageFromStorage(){
    let attendancePercentFromStorage=localStorage.getItem("myOverallAttendance");
    let parsedAttendance=JSON.parse(attendancePercentFromStorage);
    if(parsedAttendance===null){
        return {overallPercent:0};
    }
    else{
        return parsedAttendance;
    }
}

let subjectsList=getsubjectsListFromStorage();
let myOverallAttendance=getOverAllPercentageFromStorage();
overAllAttendance.textContent=(myOverallAttendance.overallPercent)+"%";

for( let subject of subjectsList){
    createAndAppendAttendanceCard(subject);
}



function createAndAppendAttendanceCard(subject){

    // let responsiveSubjectContainer=document.createElement("div");
    // responsiveSubjectContainer.classList.add("col-12","col-lg-6");
    
    let responsiveSubjectContainer=document.getElementBy("subjectsContainer");
    responsiveSubjectContainer.classList.remove("d-none");
    subjectsContainerRowElement.appendChild(responsiveSubjectContainer);
    let subjectContainerId="sub"+subject.uniqueId;
    responsiveSubjectContainer.id=subjectContainerId;
    

    // let subjectCardElement=document.createElement("div");
    // subjectCardElement.classList.add("subject-wise-attendence-card","p-3","mb-4");
    // //subjectCardElement.id=sub;
    // responsiveSubjectContainer.appendChild(subjectCardElement);
    //console.log("subject card container created");
    
    // subjectCardTopSection(subjectCardElement,subject,subjectContainerId);
    // subjectCardMiddleSection(subjectCardElement,subject);
    // subjectCardBottomSection(subjectCardElement,subject);
}




addButtonElement.onclick=function(){
    let subjectName=subjectInputElement.value;
    //let attendanceGoal=attendanceGoalInputElement.value;
    //console.log("Hello add button clicked");
    if(subjectName===""||subjectName===""){
        alert("Enter a valid input");
        // subjectInputElement.value=subjectName;
        // attendanceGoalInputElement.value=attendanceGoal;
    }
    else{
        let subject={
            name:subjectName,
            attendanceGoal:overAllAttendanceGoal.goal,
            uniqueId:subjectsList.length+1,
            attendedCount:0,
            totalCount:0,
            subPercent:0
        }
        subjectsList.push(subject);
        createAndAppendAttendanceCard(subject);
        localStorage.setItem("subjectsList",JSON.stringify(subjectsList));
    }
    subjectInputElement.value="";
    attendanceGoalInputElement.value="";
}




