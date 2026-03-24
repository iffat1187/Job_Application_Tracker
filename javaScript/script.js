const totalJOb = document.getElementById("total");
const interviewJOb = document.getElementById("interview");
const rejectedJOb = document.getElementById("rejected");



const allCard = document.querySelectorAll("#all-card .card" );


const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const mainContainer = document.getElementById("main");

const allCardSection = document.getElementById("all-card");
const interviewFilterSection = document.getElementById("interview-card");
const rejectedFilterSection = document.getElementById("rejected-card");

const availableJobCount = document.getElementById("available-job-total");
let availableInterViewCount = document.getElementById("interview-available");
let availableRejectedCount = document.getElementById("rejected-available");


// array declare for storing the cards for each section
let allCardList = [] ;
let interviewList = [];
let rejectedList = [];


// count the available , total jobs by array length
function calculateCount(){
    totalJOb.innerText = allCardList.length ;
    interviewJOb.innerText = interviewList.length;
    rejectedJOb.innerText =  rejectedList.length ;

    // changing the value of jobs when they are selected like 2 inteview selected then shows 2jobs
    availableJobCount.innerText = allCardList.length;
    availableInterViewCount.innerText = interviewList.length;
    availableRejectedCount.innerText = rejectedList.length;
}

// all interview and reject button changes color when it is clicked 

// filter button toggle 
 function showFilterBtn(id) {

    allFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");
    interviewFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");
    rejectedFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");

    const selectedId = document.getElementById(id);
    selectedId.classList.add("bg-[#3b82f6]", "text-white");

   
    if (id === "interview-filter-btn") {
        interviewFilterSection.classList.remove("hidden");
        allCardSection.classList.add("hidden");
        rejectedFilterSection.classList.add("hidden");

        
        if (interviewList.length > 0) {
            availableInterViewCount.parentNode.classList.remove("hidden");
        } else {
            availableInterViewCount.parentNode.classList.add("hidden");
        }
        availableRejectedCount.parentNode.classList.add("hidden");

    } else if (id === "all-filter-btn") {
        allCardSection.classList.remove("hidden");
        interviewFilterSection.classList.add("hidden");
        rejectedFilterSection.classList.add("hidden");

        
        availableInterViewCount.parentNode.classList.add("hidden");
        availableRejectedCount.parentNode.classList.add("hidden");

    } else if (id === "rejected-filter-btn") {
        rejectedFilterSection.classList.remove("hidden");
        allCardSection.classList.add("hidden");
        interviewFilterSection.classList.add("hidden");

        
        if (rejectedList.length > 0) {
            availableRejectedCount.parentNode.classList.remove("hidden");
        } else {
            availableRejectedCount.parentNode.classList.add("hidden");
        }
        availableInterViewCount.parentNode.classList.add("hidden");

    }

};

 

//   all card loop and push array 

// domcontentloaded -> auto page load and store 
document.addEventListener("DOMContentLoaded" , function() {
    // for available jobs
    showFilterBtn("all-filter-btn");

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



// main card event functionalities
mainContainer.addEventListener("click", function(event){

    // delete function
    if (event.target.closest(".delete-btn")) {
        let parentNode = event.target.closest(".card");
        let companyName = parentNode.querySelector(".company-name").innerText;

        allCardList = allCardList.filter(item => item.companyName !== companyName);

        interviewList = interviewList.filter(item => item.companyName !== companyName);

        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        parentNode.remove();
        calculateJobCount();
        showRenderInterview();
       showRenderReject();
        

        if (allCardList.length === 0) {
            showEmptyCard(allCardSection);
        }else if(interviewList.length === 0){
            showEmptyCard(interviewFilterSection);

        }


        
//  targeting specific inteview button then status changes and getting all the elements of that card
    }else if (event.target.classList.contains("interview-btn")){
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
    //  Es6 javascript .find loop
    let interViewExist = interviewList.find(item => item.companyName === cardInfoObj.companyName);
  
        if (!interViewExist) {
            interviewList.push(cardInfoObj);
        } 

        // toggle button for filter and rejected 
        
       rejectedList = rejectedList.filter(item => item.companyName !== cardInfoObj.companyName);
      

       statusEle.classList.remove("bg-red-200", "text-red-700", "border-red-500");
        statusEle.classList.add("bg-green-200", "text-green-700", "border-2", "border-green-500");

       calculateCount();
       showRenderInterview();
       showRenderReject();
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
        //  for color
         statusEle.classList.remove("bg-green-200", "text-green-700", "border-green-500");
        statusEle.classList.add("bg-red-200", "text-red-700", "border-2", "border-red-500");
       calculateCount();
       showRenderReject();
       showRenderInterview();

     }
    
})

//  empty card when nothing is selected 

function showEmptyCard(section) {

    section.innerHTML = "";

    let div = document.createElement("div");
    div.className = "card flex justify-between p-5 shadow bg-white rounded-xs mx-auto";
    div.innerHTML = `
           <div class="flex justify-center items-center mx-auto py-17">
            <div>
                <img class="mx-auto mb-3" src="./jobs.png" alt="">
                <h5 class="font-semibold text-2xl text-center">No jobs available</h5>
                <p class="font-medium opacity-45 text-center">Check back soon for new job opportunities</p>
            </div>
        </div>
    `;

    section.appendChild(div);

}


if (rejectedList.length === 0) {
    showEmptyCard(rejectedFilterSection);
    
}

// showcasing rejected cards 

function showRenderReject() {

    // at first section is empty 
    rejectedFilterSection.innerHTML = "";


    if (rejectedList.length === 0) {
        showEmptyCard(rejectedFilterSection);
        return;
    }

    for (let reject of rejectedList) {

        console.log(reject);

        // creating div dynamically

        let rejectDiv = document.createElement("div");
       rejectDiv.className = "card flex justify-between p-5 shadow bg-white rounded-xs";
        rejectDiv.innerHTML = `
               <div class="space-y-4 w-full">
               
                    <div class="flex justify-between ">

                        <div>
                            <p class="company-name text-xl font-semibold mb-2">${reject.companyName}</p>
                            <p class="skill-name opacity-50 ">${reject.skillName}
                            </p>
                        </div>

                        <div>
                            <button class="delete-btn text-red-600 px-3 py-1 rounded font-extrabold text-3xl">
                                <span
                                    class="p-2 shadow  border-red-700 hover:bg-red-100 hover:border transition-all duration-600 rounded-full cursor-pointer"><i
                                        class="fa-regular fa-trash-can"></i></span>
                            </button>
                        </div>

                    </div>

                    <div class="flex gap-3 items-center">
                        <p class="job-detail opacity-50">${reject.jobdetail}</p>

                    </div>

                     <p class="status p-2 px-4 shadow font-semibold w-fit border-2 rounded-[7px] bg-red-200 text-red-700 border-red-500 cursor-pointer">${reject.status}</p>
                    <p class="notes opacity-60">${reject.notes}</p>

                    <div class="flex gap-5">

                      <button
                            class="interview-btn border-2 p-1.5 border-green-500 text-green-600  px-4 rounded font-semibold hover:bg-green-100 transition-all duration-300 cursor-pointer">INTERVIEW</button>

                        <button
                            class="rejected-btn border-2 border-red-500 text-red-600 p-1.5 px-4 rounded font-semibold hover:bg-red-100 transition-all duration-300 cursor-pointer">REJECTED</button>

                    </div>
                   
             
                </div>
              
              ` ;

        rejectedFilterSection.appendChild(rejectDiv);

    }

}

// when nothing is selected 

if (interviewList.length === 0) {
    showEmptyCard(interviewFilterSection);
}

// displaying the selected interview cards
function showRenderInterview() { 

    interviewFilterSection.innerHTML = "";

    if (interviewList.length === 0) {
        showEmptyCard(interviewFilterSection);
        return;
    }


    for (let interView of interviewList) {
        let div = document.createElement("div");
        div.className = "card flex justify-between p-5 shadow bg-white rounded-xs";
        div.innerHTML = `
         <div class="space-y-4 w-full">

            <div class="flex justify-between ">

                        <div>
                            <p class="company-name text-xl font-semibold mb-2">${interView.companyName}</p>
                            <p class="skill-name opacity-50 ">${interView.skillName}
                            </p>
                        </div>

                        <div>
                            <button class="delete-btn text-red-600 px-3 py-1 rounded font-extrabold text-3xl">
                                <span
                                    class="p-2 shadow  border-red-700 hover:bg-red-100 hover:border transition-all duration-600 rounded-full cursor-pointer"><i
                                        class="fa-regular fa-trash-can"></i></span>
                            </button>
                        </div>

                    </div>

            <div class="flex gap-3 items-center">
                <p class="job-detail opacity-50">${interView.jobdetail}</p>

            </div>

            <p
                class="status p-2 px-4 shadow font-semibold w-fit border-2 rounded-[7px] bg-green-200 text-green-700 border-green-500 cursor-pointer">
                ${interView.status}</p>
            <p class="notes opacity-60">${interView.notes}</p>

            <div class="flex gap-5">
                <button
                    class="interview-btn border-2 p-1.5 border-green-500 text-green-600  px-4 rounded font-semibold hover:bg-green-100 transition-all duration-300 cursor-pointer">INTERVIEW</button>

                <button
                    class="rejected-btn border-2 border-red-500 text-red-600 p-1.5 px-4 rounded font-semibold hover:bg-red-100 transition-all duration-300 cursor-pointer">REJECTED</button>
            </div>
        </div>
    
        `;

        interviewFilterSection.appendChild(div);


    };

}

