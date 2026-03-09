const issueCards = document.getElementById('issue-cards');
const loadingSpinner = document.getElementById('load-spinner');

showLoading =()=>{
   loadingSpinner.classList.remove("hidden");  
   loadingSpinner.classList.add("flex"); 
    issueCards.innerHTML="";
 }
hideLoading = () =>{
    loadingSpinner.classList.add("hidden"); 
}

selectBtn = (id) => {
    const btn = document.getElementById(id);
  

    const tabBtn = document.querySelectorAll('#tab-btn button');
    tabBtn.forEach(btn => {
        btn.classList.remove('btn-primary');
    });
    btn.classList.add("btn-primary");

    if(id =="allBtn"){
        loadIssues ();
    }
     else if (id=="openBtn"){
        openIssues();
    }
    else{
        closedIssues();
    }
}






const loadIssues = async () => {
   showLoading();
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    loadingSpinner.classList.add("hidden");
    hideLoading();
    displayIssues(data.data);
    
}

const openIssues = async () => {
    showLoading();
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    hideLoading();
    const openCards = data.data.filter(data => data.status=="open");
    displayIssues(openCards);

}

const closedIssues = async () => {
    showLoading();
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    hideLoading();
    const openCards = data.data.filter(data => data.status=="closed");
    displayIssues(openCards);

}

const displayIssues = (cards) => {

    cards.forEach(issue => {
    const card = document.createElement('div');
    issue.status=="open" ? card.className = "shadow-md rounded-lg border-t-3 border-t-green-500" : 
    card.className = "shadow-md rounded-lg border-t-3 border-t-purple-500";
    card.innerHTML = `
    <div class="p-4 space-y-4">
                        <!-- Priority -->
                        <div class="flex items-center justify-between">
                            ${issue.status=="open"?`<img class="w-[24px]" src="assets/Open-Status.png" alt="">`:`<img class="w-[24px]" src="assets/Closed- Status .png" alt="">`}
                            
                            <h1 id="${issue.id}" class="bg-error/10 text-red-500 w-[80px] h-[24px] text-[12px] p-1 text-center rounded-3xl">${issue.priority.toUpperCase()}</h1>
                        </div>

                        <!-- Card title and description -->
                        <div>
                            <h1 class=" mb-2 text-[14px] font-semibold">${issue.title}</h1>
                            <p class="text-[12px] font-normal text-[#64748B]">${issue.description}</p>
                        </div>

                        <!-- labels -->
                        <div class="pb-5 mt-4 ">

                            <span class="bg-error/10 text-red-500 border border-red-200 h-[18px] text-[10px] font-medium py-[2px] px-[2px] text-center rounded-3xl">${issue.labels[0].toUpperCase()}</span>

                            ${issue.labels[1]!= undefined ? `
                                <span class="bg-warning/10 text-yellow-600 border border-yellow-300 h-[18px] text-[10px] font-medium py-[2px] px-[2px] text-center rounded-3xl">
                                ${issue.labels[1].toUpperCase()}
                                </span>`:""}
                           

                        </div>

                    </div>

                    <!-- Author & Created At -->
                    <div class="text-[#64748B] text-[12px] space-y-2 border-t-2 border-t-gray-200 p-4">
                        <h1> <span>#${issue.id}</span>  ${issue.author}</h1>
                        <h1>${issue.createdAt}</h1>
                    </div>
    
    `

    issueCards.appendChild(card);



    // Priority Status background color and font color 
    const issuePriority = document.getElementById(`${issue.id}`);
    if(issuePriority.innerText == "MEDIUM"){
        issuePriority.classList.remove("bg-error/10", "text-red-500","bg-base-300" , "text-gray-600");
        issuePriority.classList.add("bg-warning/10" , "text-yellow-600");
    }
    else if (issuePriority.innerText == "LOW"){
        issuePriority.classList.remove("bg-error/10", "text-red-500","bg-warning/10" , "text-yellow-600");
        issuePriority.classList.add("bg-base-300" , "text-gray-600");
    }
     



    });
    
}








loadIssues ();