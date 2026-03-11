const issueCards = document.getElementById('issue-cards');
const loadingSpinner = document.getElementById('load-spinner');
const issuesCount = document.getElementById('issues-count');
const issueModal = document.getElementById('issue-modal');
const input = document.getElementById('input-search');

showLoading = () => {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    issueCards.innerHTML = "";
}

hideLoading = () => {
    loadingSpinner.classList.add("hidden");
}

selectBtn = (id) => {
    const btn = document.getElementById(id);


    const tabBtn = document.querySelectorAll('#tab-btn button');
    tabBtn.forEach(btn => {
        btn.classList.remove('btn-primary');
    });
    btn.classList.add("btn-primary");

    if (id == "allBtn") {
        loadIssues();


    }
    else if (id == "openBtn") {
        openIssues();

    }
    else {
        closedIssues();

    }
}

showIssueModal = async (id) => {

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const issue = await res.json();
    const modal = document.createElement('div');
    modal.className = "modal-box";
    modal.innerHTML = `
               
                    <h3 class="text-lg font-bold">${issue.data.title}</h3>
                    <div class="flex gap-2 items-center">
                         <h1 class="${issue.data.status == "open" ? "bg-green-600" : "bg-red-600"} text-white text-[12px] px-7 py-[2px] text-center rounded-3xl">${issue.data.status}</h1>
                         <ul class="flex space-x-1  items-center list-inside list-disc">
                            <li class="text-[12px] text-[#64748B]">${issue.data.status} by ${issue.data.assignee}</li>
                            <li class="text-[12px] text-[#64748B]">${new Date(issue.data.updatedAt).toLocaleDateString("en-GB")}</li>
                         </ul>
                         
                    </div>
                    <br>
                        <!-- labels -->
                        <div class="pb-5 mt-4 ">
                            <span class="bg-error/10 text-red-500 border border-red-200 h-[18px] text-[10px] font-medium py-[2px] px-[4px] text-center rounded-3xl">${issue.data.labels[0].toUpperCase()}</span>

                            ${issue.data.labels[1] != undefined ? `
                                <span class="bg-warning/10 text-yellow-600 border border-yellow-300 h-[18px] text-[10px] font-medium py-[2px] px-[4px] text-center rounded-3xl">
                                ${issue.data.labels[1].toUpperCase()}
                                </span>`: ""}
                        </div>
                    
                    <br>
                    <p class="text-[12px] font-normal text-[#64748B]">${issue.data.description}</p>
                    <br>
                    <div class="flex gap-2 p-2 bg-base-200 rounded-md">
                        <div class="w-[50%]">
                            <p class="text-[11px] font-normal text-[#64748B]">Assignee:</p>
                            <p class="text-[11px] font-bold">${issue.data.assignee}</p>
                        </div>

                        <div class="w-[50%]">
                            <p class="text-[11px] font-normal text-[#64748B]">Priority:</p>
                           <h1 class="${{ medium: "bg-yellow-500", low: "bg-slate-300", high: "bg-red-600" }[issue.data.priority]} text-white text-[10px] w-[60px] py-[1px] text-center rounded-3xl">${issue.data.priority}</h1>
                        </div>
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn btn-primary">Close</button>
                        </form>
                    </div>
                
    `

    issueModal.appendChild(modal);
    issueModal.showModal();

}




const loadIssues = async () => {
    showLoading();
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    loadingSpinner.classList.add("hidden");
    hideLoading();
    displayIssues(data.data);
    const count = issueCards.children.length;
    issuesCount.innerText = count;


}

const openIssues = async () => {
    showLoading();
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    hideLoading();
    const openCards = data.data.filter(data => data.status == "open");
    displayIssues(openCards);
    const count = issueCards.children.length;
    issuesCount.innerText = count;


}

const closedIssues = async () => {
    showLoading();
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    hideLoading();
    const openCards = data.data.filter(data => data.status == "closed");
    displayIssues(openCards);
    const count = issueCards.children.length;
    issuesCount.innerText = count;


}


const displayIssues = (cards) => {

    cards.forEach(issue => {
        const card = document.createElement('div');
        card.onclick = () => showIssueModal(issue.id);

        issue.status == "open" ? card.className = "shadow-md rounded-lg border-t-3 border-t-green-500" : card.className = "shadow-md rounded-lg border-t-3 border-t-purple-500";

        card.innerHTML = `
    <div class="p-4 space-y-4">
                        <!-- Priority -->
                        <div class="flex items-center justify-between">
                            ${issue.status == "open" ? `<img class="w-[24px]" src="assets/Open-Status.png" alt="">` : `<img class="w-[24px]" src="assets/Closed- Status .png" alt="">`}
                            
                            <h1 id="${issue.id}" class="bg-error/10 text-red-500 w-[80px] h-[24px] text-[12px] p-1 text-center rounded-3xl">${issue.priority.toUpperCase()}</h1>
                        </div>

                        <!-- Card title and description -->
                        <div>
                            <h1 class="line-clamp-1 mb-2 text-[14px] font-semibold">${issue.title}</h1>
                            <p class="line-clamp-2 text-[12px] font-normal text-[#64748B]">${issue.description}</p>
                        </div>

                        <!-- labels -->
                        <div class="pb-5 mt-4 ">

                            ${{
                bug: `<span class="bg-error/10 text-red-500 border border-red-200 h-[18px] text-[10px] font-medium py-[2px] px-[4px] text-center rounded-3xl"><i class="fa-solid fa-bug mr-[2px]"></i> ${issue.labels[0].toUpperCase()}</span>`,
                enhancement: `<span class="bg-[#DEFCE8] text-[#00A96E] border border-[#BBF7D0] h-[18px] text-[10px] font-medium py-[2px] px-[4px] text-center rounded-3xl"><i class="fa-regular fa-star mr-[2px]"></i>${issue.labels[0].toUpperCase()}</span>`,
                documentation: `<span class="bg-blue-100 text-blue-600 border border-blue-300 h-[18px] text-[10px] font-medium py-[2px] px-[4px] text-center rounded-3xl"><i class="fa-brands fa-readme mr-[2px]"></i>${issue.labels[0].toUpperCase()}</span>`
            }[issue.labels[0]]

            }

                            ${issue.labels[1] != undefined ? 
                                ({
                            "help wanted":`<span class="bg-warning/10 text-yellow-600 border border-yellow-300 h-[18px] text-[10px] font-medium py-[2px] px-[4px] text-center rounded-3xl"><i class="fa-regular fa-life-ring mr-[2px]"></i>${issue.labels[1].toUpperCase()}
                            </span>`,

                            "enhancement": `<span class="bg-[#DEFCE8] text-[#00A96E] border border-[#BBF7D0] h-[18px] text-[10px] font-medium py-[2px] px-[4px] text-center rounded-3xl"><i class="fa-regular fa-star mr-[2px]"></i>${issue.labels[1].toUpperCase()}</span>`,

                            "good first issue":`<span class="bg-purple-100 text-purple-700 border border-purple-300 h-[18px] text-[10px] font-medium py-[2px] px-[4px] text-center rounded-3xl"><i class="fa-solid fa-clover mr-[2px]"></i>${issue.labels[1].toUpperCase()}</span>`}[issue.labels[1]]): ""}
                           

                        </div>

                    </div>

                    <!-- Author & Created At -->
                    <div class="text-[#64748B] text-[12px] space-y-2 border-t-2 border-t-gray-200 p-4">
                        <h1> <span>#${issue.id}</span>  ${issue.author}</h1>
                        <h1>${new Date(issue.createdAt).toLocaleDateString("en-GB")}</h1>
                    </div>
    
    `

        issueCards.appendChild(card);



        // Priority Status background color and font color 
        const issuePriority = document.getElementById(`${issue.id}`);
        if (issuePriority.innerText == "MEDIUM") {
            issuePriority.classList.remove("bg-error/10", "text-red-500", "bg-base-300", "text-gray-600");
            issuePriority.classList.add("bg-warning/10", "text-yellow-600");
        }
        else if (issuePriority.innerText == "LOW") {
            issuePriority.classList.remove("bg-error/10", "text-red-500", "bg-warning/10", "text-yellow-600");
            issuePriority.classList.add("bg-base-300", "text-gray-600");
        }




    });


}



loadIssues();

document.getElementById("btn-search")
    .addEventListener("click", async () => {
        showLoading();
        const searchValue = input.value.trim().toLowerCase();
        const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
        const res = await fetch(url);
        const data = await res.json();
        hideLoading();
        displayIssues(data.data);
        const count = issueCards.children.length;
        issuesCount.innerText = count;
        input.value = "";


    })