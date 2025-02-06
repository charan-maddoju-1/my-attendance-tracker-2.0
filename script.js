
let setAttendanceBtn=document.getElementById("setButton");
let attendanceGoalInputElement=document.getElementById("attendanceGoalInput");
let introPage=document.getElementById("introPage");
let mainPage=document.getElementById("mainPage");


let attendanceGoalTextElement=document.getElementById("goalText");
let goalText="Your Attendance Goal : ";


setAttendanceBtn.onclick=function(){
    let attendanceGoalInputValue=attendanceGoalInputElement.value;
    attendanceGoalInputElement.value="";
    let parsedattendanceGoal=parseInt(attendanceGoalInputValue);    
    if(attendanceGoalInputValue===""||attendanceGoalInputValue===" "){
        alert("Enter a valid input");
    }
    else{
        let attendanceGoal={
            goal:parsedattendanceGoal
        }
        mainPage.classList.remove("d-none");
        introPage.classList.add("d-none");
        attendanceGoalTextElement.textContent=goalText+parsedattendanceGoal+"%";
        for( let subject of subjectsList){
            subject.attendanceGoal=parsedattendanceGoal;
            
        }
        overAllAttendanceContainer.onclick();
        localStorage.setItem("overAllAttendanceGoal",JSON.stringify(attendanceGoal));
        localStorage.setItem("subjectsList",JSON.stringify(subjectsList));
        let intro=getIntroStatusFromStorage();
        intro.status=0;
        localStorage.setItem("introStatus",JSON.stringify(intro));
    }
    
    
}

let subjectInputElement=document.getElementById("subjectInputElement");
let addButtonElement=document.getElementById("addButton");
let overAllAttendance=document.getElementById("overAllAttendance");
let overAllAttendanceLabel=document.getElementById("overAllAttendanceLabel");
let deleteAllButton=document.getElementById("deleteAllBtn");
let backButton=document.getElementById("backBtn");

let overAllAttendanceContainer=document.getElementById("percentageContainer");
let overAllPercentageConatiner=document.getElementById("percentageContainer");

let subjectsContainerRowElement=document.getElementById("subjectsContainer");




function getIntroStatusFromStorage(){
    let introFromStorage=localStorage.getItem("introStatus");
    let parsedIntro=JSON.parse(introFromStorage);
    if(parsedIntro===null){
        return {status:1};
    }
    else{
        return parsedIntro;
    }
}
let intro=getIntroStatusFromStorage();
backButton.onclick=function(){
    mainPage.classList.add("d-none");
    introPage.classList.remove("d-none");
    intro=getIntroStatusFromStorage();
    intro.status=1;
    localStorage.setItem("introStatus",JSON.stringify(intro));
}
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
        addButtonElement.onclick();
    }
})
attendanceGoalInputElement.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        setAttendanceBtn.onclick();
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




if(intro.status==1){
    mainPage.classList.add("d-none");
    introPage.classList.remove("d-none");
}
else{
    mainPage.classList.remove("d-none");
    introPage.classList.add("d-none");
}

function getOverAllAttendanceGoalFromStorage(){
    let overAllAttendanceFromStorage=localStorage.getItem("overAllAttendanceGoal");
    let parsedAttendance=JSON.parse(overAllAttendanceFromStorage);
    if(parsedAttendance===null){
        return 0;
    }
    else{
        return parsedAttendance.goal;
    }
}

let subjectsList=getsubjectsListFromStorage();
let myOverallAttendance=getOverAllPercentageFromStorage();
//console.log(myOverallAttendance);
let overAllAttendanceGoal=getOverAllAttendanceGoalFromStorage();
attendanceGoalTextElement.textContent=goalText+overAllAttendanceGoal+"%";



for( let subject of subjectsList){
    createAndAppendAttendanceCard(subject);
}

overAllAttendanceContainer.onclick=function(){
    let totalAttendedClasses=0;
    let totalClassesTaken=0;
    for(let subject of subjectsList){
        totalAttendedClasses=totalAttendedClasses+subject.attendedCount;
        totalClassesTaken=totalClassesTaken+subject.totalCount;
    }
    let overAllAttendancePercentage;
    if(totalAttendedClasses){
        overAllAttendancePercentage=((totalAttendedClasses/totalClassesTaken)*100).toFixed(2);
        let overAllAttendanceGoal=getOverAllAttendanceGoalFromStorage();
        if(overAllAttendancePercentage<overAllAttendanceGoal){
            overAllAttendanceLabel.textContent="Manage your attendance to cross "+overAllAttendanceGoal+"%";
            overAllAttendanceLabel.style.color="#ff4a4a";
            overAllPercentageConatiner.style.borderColor="#ff4a4a";
        }
        else{
            overAllAttendanceLabel.textContent="...You have reached your Attendance Goal...";
            overAllAttendanceLabel.style.color="#37f350";
            overAllPercentageConatiner.style.borderColor="#37f350";
        }
    }
    else{
        overAllAttendancePercentage=0;
        overAllAttendanceLabel.textContent="Attendance goal status will be reflected here."
    }   
    overAllAttendance.textContent=(myOverallAttendance.overallPercent)+"%";
    //console.log(overAllAttendance.textContent);
    
    
    overAllAttendance.textContent=overAllAttendancePercentage+"%";
    myOverallAttendance.overallPercent=overAllAttendancePercentage;
    localStorage.setItem("myOverallAttendance",JSON.stringify(myOverallAttendance));
    
    
}
overAllAttendanceContainer.onclick();



deleteAllButton.onclick=function(){
    let check=confirm("! This will delete all your attendance data.");
    //console.log("You selected:", check);
    if(check){
        //console.log("yes delete all");
        for( let item of subjectsList){
            let subjectId="sub"+item.uniqueId;
            let subjectCard=document.getElementById(subjectId);
            subjectsContainerRowElement.removeChild(subjectCard);
        }
        subjectsList=[];
        overAllAttendance.textContent=0+"%";
        localStorage.removeItem("subjectsList");
        localStorage.removeItem("myOverallAttendance");
        localStorage.removeItem("overAllAttendanceGoal");
        localStorage.removeItem("introStatus");
        introPage.classList.remove("d-none");
        mainPage.classList.add("d-none");
    }
}

function subjectCardTopSection(subjectCardElement,subject,subjectContainerId){
    let subjectCardTopSecton=document.createElement("div");
    subjectCardTopSecton.classList.add("d-flex" ,"flex-row" ,"justify-content-center", "mb-3");
    subjectCardElement.appendChild(subjectCardTopSecton);

    let subjectHeadingElement=document.createElement("h2");
    subjectHeadingElement.classList.add("subject-heading","mr-auto");
    subjectHeadingElement.textContent=subject.name;
    subjectCardTopSecton.appendChild(subjectHeadingElement);
    //console.log("subject heading created");

    let subjectCardDeleteIcon=document.createElement("i");
    subjectCardDeleteIcon.classList.add("fa-regular", "fa-trash-can", "ml-auto");
    subjectCardTopSecton.appendChild(subjectCardDeleteIcon);
    //console.log("delete icon created");

    subjectCardDeleteIcon.onclick=function(){
        let check=confirm(" Delete subject ?");
        if(check){
            let subjectCardContainer=document.getElementById(subjectContainerId);
            subjectsContainerRowElement.removeChild(subjectCardContainer);
            let deleteElementIndex=subjectsList.findIndex(
                function(eachSubject){
                    let eachSubjectId="sub"+eachSubject.uniqueId;
                    if(eachSubjectId===subjectContainerId){
                        return true;
                    }
                    else{
                        return false;
                    }
                } )
            subjectsList.splice(deleteElementIndex,1);
            localStorage.setItem("subjectsList",JSON.stringify(subjectsList));
            overAllAttendanceContainer.onclick();
        }
        
    }
    
}


function attendedClassesContainer(classesCountTopConatinerElement,subject){
    let attendedClassesCountOuterContainer=document.createElement("div");
    attendedClassesCountOuterContainer.classList.add("classes-count-box", "ml-1");
    classesCountTopConatinerElement.appendChild(attendedClassesCountOuterContainer);

    let attendedClassesCountInnerContainer=document.createElement("div");
    attendedClassesCountInnerContainer.classList.add("d-flex", "flex-row", "justify-content-between", "attendence-changing-container");
    attendedClassesCountOuterContainer.appendChild(attendedClassesCountInnerContainer);

    let attendedMinusButton=document.createElement("button");
    attendedMinusButton.classList.add("plus-minus-button");
    attendedMinusButton.textContent="-";
    attendedClassesCountInnerContainer.appendChild(attendedMinusButton);

    let attendedClassesCount=document.createElement("p");
    let attendedCount=parseInt(subject.attendedCount);
    attendedClassesCount.textContent=attendedCount;
    attendedClassesCount.id="attendedCount"+subject.uniqueId;
    attendedClassesCount.classList.add("attendance-text");
    attendedClassesCountInnerContainer.appendChild(attendedClassesCount);

    let attendedPlusButton=document.createElement("button");
    attendedPlusButton.classList.add("plus-minus-button");
    attendedPlusButton.textContent="+";
    attendedClassesCountInnerContainer.appendChild(attendedPlusButton);

    attendedPlusButton.onclick=function(){
        attendedCount=parseInt(subject.attendedCount);
        attendedCount=attendedCount+1;
        attendedClassesCount.textContent=attendedCount;
        let totalClassesCount=document.getElementById("totalCount"+subject.uniqueId);
        let stringtotalCount=parseInt(totalClassesCount.textContent);
        let totalCount=parseInt(stringtotalCount);
        //console.log(typeof(attendedCount));
        let subjectAttendancePercent=document.getElementById("subPercent"+subject.uniqueId);
        let subjectAttendanceStatusText=document.getElementById("attendanceStatus"+subject.uniqueId);
        if(attendedCount<=totalCount){
            if(attendedCount || totalCount){
                let percent=((attendedCount/totalCount)*100).toFixed(2);
                subject.subPercent=percent;
                //console.log(percent);
                subjectAttendancePercent.textContent=percent+"%";
                if(percent<subject.attendanceGoal){
                    subjectAttendanceStatusText.textContent="Oh no! You have less attendance in this subject.Try to attend some more classes";
                    subjectAttendanceStatusText.style.color="#bc0b0b";
                }
                else{
                    subjectAttendanceStatusText.textContent="You have good attendance in this subject.Keep going."
                    subjectAttendanceStatusText.style.color="#058b1c";
                }
            }
            
        }
        else{
            attendedCount=attendedCount-1;
            attendedClassesCount.textContent=attendedCount;
            alert("Attended classes should be less than or equal to Total classes");
        }
        
        subject.attendedCount=attendedCount;
        localStorage.setItem("subjectsList",JSON.stringify(subjectsList));
        overAllAttendanceContainer.onclick();
    }

    attendedMinusButton.onclick=function(){
        attendedCount=parseInt(subject.attendedCount);
        attendedCount=attendedCount-1;
        if(attendedCount<0){
            attendedCount=0;
            attendedClassesCount.textContent=attendedCount; 
        }
        else{
            attendedClassesCount.textContent=attendedCount;
        }
        let totalClassesCount=document.getElementById("totalCount"+subject.uniqueId);
        let stringtotalCount=parseInt(totalClassesCount.textContent);
        let totalCount=parseInt(stringtotalCount);
        //console.log(typeof(attendedCount));
        let subjectAttendancePercent=document.getElementById("subPercent"+subject.uniqueId);
        let subjectAttendanceStatusText=document.getElementById("attendanceStatus"+subject.uniqueId);
        if(attendedCount<=totalCount){
            if(attendedCount || totalCount){
                let percent=((attendedCount/totalCount)*100).toFixed(2);
                subject.subPercent=percent;
                //console.log(percent);
                subjectAttendancePercent.textContent=percent+"%";
                if(percent<subject.attendanceGoal){
                    subjectAttendanceStatusText.textContent="Oh no! You have less attendance in this subject.Try to attend some more classes";
                    subjectAttendanceStatusText.style.color="#bc0b0b";
                }
                else{
                    subjectAttendanceStatusText.textContent="You have good attendance in this subject.Keep going."
                    subjectAttendanceStatusText.style.color="#058b1c";
                }
            }
        }
        else{
            attendedCount=attendedCount+1;
            attendedClassesCount.textContent=attendedCount;
            alert("Attended classes should be less than or equal to Total classes");
        }
        subject.attendedCount=attendedCount;
        localStorage.setItem("subjectsList",JSON.stringify(subjectsList));
        overAllAttendanceContainer.onclick();
    }
    let attendedClassesLabel=document.createElement("p");
    attendedClassesLabel.classList.add("classes-count-label");
    attendedClassesLabel.style.color="#0a3fff";
    attendedClassesLabel.textContent="Attended Classes";
    attendedClassesCountOuterContainer.appendChild(attendedClassesLabel);   
}

function totalClassesContainer(classesCountTopConatinerElement,subject){
    let totalClassesCountOuterContainer=document.createElement("div");
    totalClassesCountOuterContainer.classList.add("classes-count-box", "ml-1");
    classesCountTopConatinerElement.appendChild(totalClassesCountOuterContainer);

    let totalClassesCountInnerContainer=document.createElement("div");
    totalClassesCountInnerContainer.classList.add("d-flex", "flex-row", "justify-content-between", "attendence-changing-container");
    totalClassesCountOuterContainer.appendChild(totalClassesCountInnerContainer);

    let totalMinusButton=document.createElement("button");
    totalMinusButton.classList.add("plus-minus-button");
    totalMinusButton.textContent="-";
    totalClassesCountInnerContainer.appendChild(totalMinusButton);

    let totalClassesCount=document.createElement("p");
    let totalCount=parseInt(subject.totalCount);
    totalClassesCount.textContent=totalCount;
    totalClassesCount.id="totalCount"+subject.uniqueId;
    totalClassesCount.classList.add("attendance-text");
    totalClassesCountInnerContainer.appendChild(totalClassesCount);
    

    let totalPlusButton=document.createElement("button");
    totalPlusButton.classList.add("plus-minus-button");
    totalPlusButton.textContent="+";
    totalClassesCountInnerContainer.appendChild(totalPlusButton);

    totalPlusButton.onclick=function(){
        totalCount=parseInt(subject.totalCount);
        totalCount=totalCount+1;
        totalClassesCount.textContent=totalCount;
        let attendedClassesCount=document.getElementById("attendedCount"+subject.uniqueId);
        let stringattendedCount=attendedClassesCount.textContent;
        let attendedCount=parseInt(stringattendedCount)
        //console.log(typeof(attendedCount));
        let subjectAttendancePercent=document.getElementById("subPercent"+subject.uniqueId);
        let subjectAttendanceStatusText=document.getElementById("attendanceStatus"+subject.uniqueId);
        if(attendedCount<=totalCount){
            if(attendedCount || totalCount){
                let percent=((attendedCount/totalCount)*100).toFixed(2);
                subject.subPercent=percent;
                //console.log(percent);
                subjectAttendancePercent.textContent=percent+"%";
                if(percent<subject.attendanceGoal){
                    subjectAttendanceStatusText.textContent="Oh no! You have less attendance in this subject.Try to attend some more classes";
                    subjectAttendanceStatusText.style.color="#bc0b0b";
                }
                else{
                    subjectAttendanceStatusText.textContent="You have good attendance in this subject.Keep going."
                    subjectAttendanceStatusText.style.color="#058b1c";
                }
            }
        }
        else{
            totalCount=totalCount-1;
            totalClassesCount.textContent=totalCount;
            alert("Attended classes should be less than or equal to Total classes");
        }
        subject.totalCount=totalCount;
        localStorage.setItem("subjectsList",JSON.stringify(subjectsList));
        overAllAttendanceContainer.onclick();
    }
    totalMinusButton.onclick=function(){
        totalCount=parseInt(subject.totalCount);
        totalCount=totalCount-1;
        if(totalCount<0){
            totalCount=0;
            totalClassesCount.textContent=totalCount; 
        }
        else{
            totalClassesCount.textContent=totalCount;
        }
        let attendedClassesCount=document.getElementById("attendedCount"+subject.uniqueId);
        let stringattendedCount=parseInt(attendedClassesCount.textContent);
        let attendedCount=parseInt(stringattendedCount);
        //console.log(typeof(attendedCount));
        let subjectAttendancePercent=document.getElementById("subPercent"+subject.uniqueId);
        let subjectAttendanceStatusText=document.getElementById("attendanceStatus"+subject.uniqueId);
        if(attendedCount<=totalCount){
            if(attendedCount || totalCount){
                let percent=((attendedCount/totalCount)*100).toFixed(2);
                subject.subPercent=percent;
                //console.log(percent);
                subjectAttendancePercent.textContent=percent+"%";
                if(percent<subject.attendanceGoal){
                    subjectAttendanceStatusText.textContent="Oh no! You have less attendance in this subject.Try to attend some more classes";
                    subjectAttendanceStatusText.style.color="#bc0b0b";
                }
                else{
                    subjectAttendanceStatusText.textContent="You have good attendance in this subject.Keep going."
                    subjectAttendanceStatusText.style.color="#058b1c";
                }
            }
        }
        else{
            totalCount=totalCount+1;
            totalClassesCount.textContent=totalCount;
            alert("Attended classes should be less than or equal to Total classes");
        }
        
        subject.totalCount=totalCount;
        localStorage.setItem("subjectsList",JSON.stringify(subjectsList));
        overAllAttendanceContainer.onclick();
        
    }

    let totalClassesLabel=document.createElement("p");
    totalClassesLabel.classList.add("classes-count-label");
    totalClassesLabel.style.color="#bc0b0b";
    totalClassesLabel.textContent="Total Classes";
    totalClassesCountOuterContainer.appendChild(totalClassesLabel);

     
}
function subjectCardMiddleSection(subjectCardElement,subject){
    let classesCountTopConatinerElement=document.createElement("div");
    classesCountTopConatinerElement.classList.add("d-flex", "flex-row", "justify-content-between");
    subjectCardElement.appendChild(classesCountTopConatinerElement);
    attendedClassesContainer(classesCountTopConatinerElement,subject);
    totalClassesContainer(classesCountTopConatinerElement,subject);
}


function subjectCardBottomSection(subjectCardElement,subject){
    let subjectCardBottomContainer=document.createElement("div");
    subjectCardBottomContainer.classList.add("d-flex", "flex-row", "justify-content-between");
    subjectCardElement.appendChild(subjectCardBottomContainer);

    let subjectAttendanceStatusText=document.createElement("p");
    subjectAttendanceStatusText.classList.add("subject-attendce-status-indicator","ml-2");
    subjectAttendanceStatusText.id="attendanceStatus"+subject.uniqueId;
    subjectAttendanceStatusText.textContent="Attendance status will be reflected here";
    subjectCardBottomContainer.appendChild(subjectAttendanceStatusText);

    let subjectAttendancePercent=document.createElement("div");
    subjectAttendancePercent.classList.add("mr-2" ,"d-flex", "justify-content-center", "align-items-center","subject-attendence-percent");
    subjectAttendancePercent.style.width="40%";
    let percent=subject.subPercent;
    subjectAttendancePercent.textContent=percent+"%";
    subjectAttendancePercent.id="subPercent"+subject.uniqueId;
    subjectCardBottomContainer.appendChild(subjectAttendancePercent);

    let buttonsContainer=document.createElement("div")
    buttonsContainer.classList.add("d-flex", "flex-row", "justify-content-between","pl-2");
    subjectCardElement.appendChild(buttonsContainer);

    // let saveButton=document.createElement("button");
    // saveButton.classList.add("btn","btn-primary");
    // saveButton.textContent="Save Changes";
    // buttonsContainer.appendChild(saveButton);

    // saveButton.onclick=function(){
    //     if(attendedCount<=totalCount){
    //         percent=(attendedCount/totalCount)*100;
    //         subjectAttendancePercent.textContent=percent+"%";
    //     }
    //     else{
    //         alert("Attended classes should be less than or equal to Total classes");
    //     }
    // }

    let resetButton=document.createElement("button");
    resetButton.classList.add("btn","btn-warning","ml-auto");
    resetButton.textContent="Reset";
    buttonsContainer.appendChild(resetButton);

    resetButton.onclick=function(){   
        subjectAttendanceStatusText.textContent="Attendance status will be reflected here";
        subjectAttendanceStatusText.style.color="#058b1c";
        subjectAttendancePercent.textContent="0%";
        let resetElementIndex=subjectsList.findIndex(
            function(eachSubject){
                let eachSubjectId=eachSubject.uniqueId;
                if(eachSubjectId===subject.uniqueId){
                    return true;
                }
                else{
                    return false;
                }
            }
        );
        let totalClassesCount=document.getElementById("totalCount"+subject.uniqueId);
        let attendedClassesCount=document.getElementById("attendedCount"+subject.uniqueId);
        attendedClassesCount.textContent=0;
        totalClassesCount.textContent=0;
        subjectsList[resetElementIndex].subPercent=0;
        subjectsList[resetElementIndex].totalCount=0;
        subjectsList[resetElementIndex].attendedCount=0;
        localStorage.setItem("subjectsList",JSON.stringify(subjectsList));
        overAllAttendanceContainer.onclick();
    }
}

function createAndAppendAttendanceCard(subject){
    
    let responsiveSubjectContainer=document.createElement("div");
    responsiveSubjectContainer.classList.add("col-12","col-lg-6");
    subjectsContainerRowElement.appendChild(responsiveSubjectContainer);
    let subjectContainerId="sub"+subject.uniqueId;
    responsiveSubjectContainer.id=subjectContainerId;
    

    let subjectCardElement=document.createElement("div");
    subjectCardElement.classList.add("subject-wise-attendence-card","p-3","mb-4");
    //subjectCardElement.id=sub;
    responsiveSubjectContainer.appendChild(subjectCardElement);
    //console.log("subject card container created");
    
    subjectCardTopSection(subjectCardElement,subject,subjectContainerId);
    subjectCardMiddleSection(subjectCardElement,subject);
    subjectCardBottomSection(subjectCardElement,subject);
}




addButtonElement.onclick=function(){
    let subjectName=subjectInputElement.value;
    //console.log("Hello add button clicked");
    if(subjectName===""||subjectName===""){
        alert("Enter a valid input");
        // subjectInputElement.value=subjectName;
        // attendanceGoalInputElement.value=attendanceGoal;
    }
    else{
        let attendance=localStorage.getItem("overAllAttendanceGoal");
        let parsedAttendance=JSON.parse(attendance);
        // console.log(parsedAttendance.goal)
        let subject={
            name:subjectName,
            attendanceGoal:parsedAttendance.goal,
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




