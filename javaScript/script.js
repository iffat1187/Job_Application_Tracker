console.log("java ");

// count section 
const totalJOb = document.getElementById("total");
const interviewJOb = document.getElementById("interview");
const rejectedJOb = document.getElementById("rejected");



const allCard = document.querySelectorAll("#all-card .card" );


const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const mainContainer = document.getElementById("main");


// array declare 
let allCardList = [] ;
let interviewList = [];
let rejectedList = [];














// counting total job = array length 
function calculateCount(){
    totalJOb.innerText = allCardList.length ;
    interviewJOb.innerText = interviewList.length;
    rejectedJOb.innerText =  rejectedList.length ;
}


















// filter button toggle 
 function showFilterBtn(id){
console.log( id , "parameter");
allFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");
interviewFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");
rejectedFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");

const getId = document.getElementById(id);
getId.classList.add("bg-[#3b82f6]", "text-white");

}
 showFilterBtn("all-filter-btn");






 

//   all card loop and push array 

// domcontentloaded -> auto page load and store 
document.addEventListener("DOMContentLoaded" , function() {
    for ( let card of  allCard ){
     let companyName = card.querySelector(".company-name").innerText;
     let skillName = card.querySelector(".skill-name").innerText;
     let jobLocation = card.querySelector(".job-detail").innerText;
     let status = card.querySelector(".status").innerText;
     let notes = card.querySelector(".notes").innerText;

     let cardObj = { 
        companyName,
        skillName,
        jobLocation ,
        status,
        notes
     } 
      allCardList.push(cardObj);
        
}
//  totalJOb.innerText = allCardList.length;

calculateCount();

});












// main card
mainContainer.addEventListener("click", function(event){
        
//  if 
        if (event.target.classList.contains("interview-btn")){
        let parentNode = event.target.closest(".card");
        let companyName = parentNode.querySelector(".company-name").innerText;
        let skillName = parentNode.querySelector(".skill-name").innerText;
        let jobLocation = parentNode.querySelector(".job-detail").innerText;
        let notes = parentNode.querySelector(".notes").innerText;

        let statusEle = parentNode.querySelector(".status");
        statusEle.innerText = "INTERVIEW";
        // fixing the value of status 
        let status = "INTERVIEW"; 
        
        let cardInfoObj = { 
        companyName,
        skillName,
        jobLocation ,
        status,
        notes
     } 
    //  Es6 javascript 
    let interViewExist = interviewList.find(item => item.companyName === cardInfoObj.companyName);
  
        if (!interViewExist) {
            interviewList.push(cardInfoObj);
        } 

        // toggle button for filter and rejected 
        
       rejectedList = rejectedList.filter(item => item.companyName !== cardInfoObj.companyName);
       calculateCount();
     }
    
    
     else if(event.target.classList.contains("rejected-btn")){
        let parentNode = event.target.closest(".card");
        let companyName = parentNode.querySelector(".company-name").innerText;
        let skillName = parentNode.querySelector(".skill-name").innerText;
        let jobLocation = parentNode.querySelector(".job-detail").innerText;
        let notes = parentNode.querySelector(".notes").innerText;

        let statusEle = parentNode.querySelector(".status");
        statusEle.innerText = "REJECTED";
        // fixing the value of status 
        let status = "REJECTED"; 
        
        let cardInfoObj = { 
        companyName,
        skillName,
        jobLocation ,
        status,
        notes
     } 
    //  Es6 javascript 
    let rejectedExist = rejectedList.find(item => item.companyName === cardInfoObj.companyName);
  
        if (!rejectedExist) {
            rejectedList.push(cardInfoObj);
        } 
        
       
         interviewList = interviewList.filter(item => item.companyName !== cardInfoObj.companyName);
       calculateCount();

     }
    
})







// 



