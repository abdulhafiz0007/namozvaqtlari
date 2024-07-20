// Dom elements 
const elNamazVaqtiList = document.querySelector(".namazvaqti-section__prayer-times");
const elNamazVaqtiTemplate = document.querySelector(".js-namazvaqti-template").content;
const elNamazVaqtiSchedules = document.querySelector(".namazvaqti-section__schedules");
const elPresentTime = document.querySelector(".present-time");
const elRegionTitleSpan = document.querySelector(".region-span");
const elRegionSearchInput = document.querySelector(".js-region-search-input");
const elSearchForm = document.querySelector(".js-search-form");



// function for rendering prayer times 
function renderPrayerTimes(arr, node) {
    
    node.innerHTML = "";
    const prayerTimesDocFragment = document.createDocumentFragment();
    
    arr.forEach(item => {
        
        const namazVaqtiTemplateNodes = elNamazVaqtiTemplate.cloneNode(true);
        namazVaqtiTemplateNodes.querySelector(".bomdod-time").textContent = item.times.tong_saharlik;
        namazVaqtiTemplateNodes.querySelector(".quyosh-time").textContent = item.times.quyosh;
        namazVaqtiTemplateNodes.querySelector(".peshin-time").textContent = item.times.peshin;
        namazVaqtiTemplateNodes.querySelector(".asr-time").textContent = item.times.asr;
        namazVaqtiTemplateNodes.querySelector(".shom-time").textContent = item.times.shom_iftor;
        namazVaqtiTemplateNodes.querySelector(".xufton-time").textContent = item.times.hufton;
        
        prayerTimesDocFragment.appendChild(namazVaqtiTemplateNodes);
        
    });
    
    node.appendChild(prayerTimesDocFragment);
    
};


// function for getting fetch data 
async function getNamazVaqtiData (daytime, region) {
    
    try {
        
        const response = await fetch(`https://islomapi.uz/api/present/${daytime}?region=${region}`);
        
        const data = await response.json();
        
        const dataArr = [];
        dataArr.push(data);
        
        renderPrayerTimes(dataArr, elNamazVaqtiList);
        
    } catch (error) {
        console.log(error);
    }
    
};
getNamazVaqtiData("day", "Toshkent");


// search form process 
elSearchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const regionSearchInputVal = elRegionSearchInput.value;
    const searchFirstVal = regionSearchInputVal.charAt(0).toUpperCase() + regionSearchInputVal.slice(1);
    elRegionTitleSpan.textContent = `${searchFirstVal} viloyati`
    getNamazVaqtiData("day", regionSearchInputVal);

});


// even listener for clicking weekdays 
elNamazVaqtiSchedules.addEventListener("click", (evt) => {

    const regionSearchInputVal = elRegionSearchInput.value;
    
    if(evt.target.matches(".namazvaqti-day")) {
        getNamazVaqtiData("day", regionSearchInputVal)
    };
    
    if(evt.target.matches(".namazvaqti-week")) {
        getNamazVaqtiData("week", regionSearchInputVal)
    };
    
    if(evt.target.matches(".namazvaqti-month")) {
        getNamazVaqtiData("monthly", regionSearchInputVal)
    };
    
});


// function for tracking the real time 
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    elPresentTime.textContent = `Hozirgi vaqt: ${timeString}`;
}

updateTime();
setInterval(updateTime, 1000);


