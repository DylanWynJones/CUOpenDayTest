(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const l="/CUOpenDayTest/vite.svg",c="/CUOpenDayTest/tailwindcss-mark.svg",d="/CUOpenDayTest/typescript.svg",n="/CUOpenDayTest/cu-logo.svg";async function f(){return await(await fetch("/CUOpenDayTest/api/OpenDay.json")).json()}async function p(){return await(await fetch("/CUOpenDayTest/api/Locations.json")).json()}function m(o){const a=document.querySelector("#app");if(!o.topics){a.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}a.innerHTML=`
    <div class="demo-banner w-full bg-yellow-300 text-black flex flex-col sm:flex-row items-center justify-between px-4 py-2 mb-6 gap-2 border-b-2 border-yellow-500">
      <div class="font-bold text-lg flex-1 text-center sm:text-left">This is a demo app</div>
      <div class="flex flex-row items-center gap-3 justify-center">
        <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">
          <img src="${l}" alt="Vite Logo" class="h-8 w-auto" />
        </a>
        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
          <img src="${c}" alt="Tailwind CSS Logo" class="h-8 w-auto" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
          <img src="${d}" alt="TypeScript Logo" class="h-8 w-auto" />
        </a>
      </div>
    </div>
    <div class="min-h-screen bg-cardiff-white font-sans px-2 py-6">
        <div class="relative gap-4 h-128">
          <div class="absolute top-6 left-6">
            <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
              <img src="${n}" alt="Cardiff University Logo" class="h-16 w-auto" />
            </a>
          </div>
          <img src="${o.cover_image}" alt="" class="h-96 w-full object-cover object-bottom" />
          <div class="bg-cardiff-red p-8">
            <h1 class="text-3xl sm:text-5xl font-bold text-left">Cardiff University Open Day</h1>
          </div>
        </div>
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2">
        ${o.topics.map(t=>t&&t.name?`
          <div class="bg-gray-100 rounded-lg border shadow flex flex-col">
            <img src="${t.cover_image||n}" alt="${t.name}" class="h-32 w-full object-cover rounded-t mb-4" />
            <h2 class="text-xl font-bold text-cardiff-red mb-2">${t.name}</h2>
            <p class="text-cardiff-dark mb-2 text-left px-6">${t.description||""}</p>
            ${t.programs&&t.programs.length?`
              <div class="mt-2 text-left px-2">
                <h3 class="font-semibold text-cardiff-dark mb-1 px-4">Events:</h3>
                <ul class=" text-sm text-cardiff-dark">
                  ${t.programs.map(s=>s&&s.title?`<li class="py-2 px-4 odd:bg-gray-50"><span class="font-semibold">${s.title}</span><br />${s.start_time?` <span class='text-xs text-cardiff-dark'>Time: ${new Date(s.start_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}${s.end_time?" - "+new Date(s.end_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""}</span>`:""}${s.room?`<br /> <span class='text-xs'>Location: ${s.room}</span>`:""}</li>`:"").join("")}
                </ul>
              </div>
            `:""}
          </div>
        `:"").join("")}
      </div>
    </div>
  `}p();f().then(m);
