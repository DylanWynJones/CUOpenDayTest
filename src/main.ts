// Utility to fetch and display Open Day data from public/OpenDay14.json
import './style.css'
import viteLogo from '/vite.svg'
import tailwindLogo from '/tailwindcss-mark.svg'
import typeScriptLogo from '/typescript.svg'
import cuLogo from '/cu-logo.svg'

async function loadOpenDay() {
  // Use the correct base path for GitHub Pages
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}api/OpenDay.json`)
  const data = await res.json()
  return data
}

async function loadLocations() {
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}api/Locations.json`)
  const locationData = await res.json()
  return locationData
}

function renderOpenDay(data: any) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  if (!data.topics) {
    app.innerHTML = '<p class="text-red-600">No Open Day data found.</p>'
    return
  }
  app.innerHTML = `
    <div class="demo-banner w-full bg-yellow-300 text-black flex flex-col sm:flex-row items-center justify-between px-4 py-2 mb-6 gap-2 border-b-2 border-yellow-500">
      <div class="font-bold text-lg flex-1 text-center sm:text-left">This is a demo app</div>
      <div class="flex flex-row items-center gap-3 justify-center">
        <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">
          <img src="${viteLogo}" alt="Vite Logo" class="h-8 w-auto" />
        </a>
        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
          <img src="${tailwindLogo}" alt="Tailwind CSS Logo" class="h-8 w-auto" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
          <img src="${typeScriptLogo}" alt="TypeScript Logo" class="h-8 w-auto" />
        </a>
      </div>
    </div>
    <div class="min-h-screen bg-cardiff-white font-sans px-2 py-6">
        <div class="relative gap-4 h-128">
          <div class="absolute top-6 left-6">
            <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
              <img src="${cuLogo}" alt="Cardiff University Logo" class="h-16 w-auto" />
            </a>
          </div>
          <img src="${data.cover_image}" alt="" class="h-96 w-full object-cover object-bottom" />
          <div class="bg-cardiff-red p-8">
            <h1 class="text-3xl sm:text-5xl font-bold text-left">Cardiff University Open Day</h1>
          </div>
        </div>
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2">
        ${data.topics.map((topic: any) => topic && topic.name ? `
          <div class="bg-gray-100 rounded-lg border shadow flex flex-col">
            <img src="${topic.cover_image || cuLogo}" alt="${topic.name}" class="h-32 w-full object-cover rounded-t mb-4" />
            <h2 class="text-xl font-bold text-cardiff-red mb-2">${topic.name}</h2>
            <p class="text-cardiff-dark mb-2 text-left px-6">${topic.description || ''}</p>
            ${topic.programs && topic.programs.length ? `
              <div class="mt-2 text-left px-2">
                <h3 class="font-semibold text-cardiff-dark mb-1 px-4">Events:</h3>
                <ul class=" text-sm text-cardiff-dark">
                  ${topic.programs.map((prog: any) => prog && prog.title ? `<li class="py-2 px-4 odd:bg-gray-50"><span class="font-semibold">${prog.title}</span><br />${prog.start_time ? ` <span class='text-xs text-cardiff-dark'>Time: ${new Date(prog.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}${prog.end_time ? ' - ' + new Date(prog.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</span>` : ''}${prog.room ? `<br /> <span class='text-xs'>Location: ${prog.room}</span>` : ''}</li>` : '').join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        ` : '').join('')}
      </div>
    </div>
  `
}

loadLocations()
loadOpenDay().then(renderOpenDay)
