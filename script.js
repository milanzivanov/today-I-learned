const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" }
];

// selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// create dom elements
factsList.innerHTML = "";

// Load data from supabase
async function loadFacts() {
  const res = await fetch(
    "https://zlygoyqdnayoaikgqohn.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpseWdveXFkbmF5b2Fpa2dxb2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2MTI4NzQsImV4cCI6MjAyMTE4ODg3NH0.-R9V_eWwocHLSMMFG16aJbM13nJ1N8jO4wgCyvjtjYA",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpseWdveXFkbmF5b2Fpa2dxb2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2MTI4NzQsImV4cCI6MjAyMTE4ODg3NH0.-R9V_eWwocHLSMMFG16aJbM13nJ1N8jO4wgCyvjtjYA"
      }
    }
  );

  const data = await res.json();
  createFactsList(data);
}

loadFacts();

function createFactsList(dataArray) {
  // factsList.insertAdjacentHTML("afterbegin", "<li>Milan</li>");

  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
        <p>
          ${fact.text}
            <a
              class="source"
              href="${fact.source}"
              target="_blank"
              >(Source)</a>
        </p>
          <span class="tag" style="background-color: ${
            CATEGORIES.find((cat) => cat.name === fact.category).color
          }">${fact.category}</span>
    </li>
            `
  );

  console.log(htmlArr);
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});
