const issueCards = document.getElementById('issue-cards');


const loadIssues = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();

    displayIssues(data);
}

const displayIssues = async (cards) => {
    const card = document.createElement('div');
    card.className = "shadow-md rounded-lg border-t-3 border-t-green-500"
    card.innerHTML = `
    <div class="p-4 space-y-4">
                        <!-- Priority -->
                        <div class="flex items-center justify-between">
                            <img class="w-[24px]" src="assets/Open-Status.png" alt="">
                            <h1
                                class="bg-error/10 text-red-500 w-[80px] h-[24px] text-[12px] p-1 text-center rounded-3xl">
                                HIGH</h1>
                        </div>

                        <!-- Card title and description -->
                        <div>
                            <h1 class=" mb-2 text-[14px] font-semibold">Fix Navigation Menu On Mobile Devices</h1>
                            <p class="text-[12px] font-normal text-[#64748B]">The boss is here menu doesn't collapse properly on mobile devices</p>
                        </div>

                        <!-- labels -->
                        <div class="pb-5 mt-4 ">

                            <span
                                class="bg-error/10 text-red-500 border border-red-200 h-[24px] text-[12px] font-medium py-1 px-3 text-center rounded-3xl"><i
                                    class="fa-solid fa-bug mr-1"></i>BUG</span>

                            <span
                                class="bg-warning/10 text-yellow-600 border border-yellow-300 h-[24px] text-[12px] font-medium py-1 px-3 text-center rounded-3xl"><i
                                    class="fa-solid fa-bug mr-1"></i>HELP WANTED</span>

                        </div>

                    </div>

                    <!-- Author & Created At -->
                    <div class="text-[#64748B] text-[12px] space-y-2 border-t-2 border-t-gray-200 p-4">
                        <h1> <span>#1</span> by john_doe</h1>
                        <h1>1/15/2024</h1>
                    </div>
    
    `

    issueCards.appendChild(card);
}

loadIssues ();