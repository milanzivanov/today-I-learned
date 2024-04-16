// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015
//   }
// ];

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

// console.log(CATEGORIES.find((cat) => cat.name === "society").color);

// selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// console.dir(btn);
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
  console.log(data);

  // const filterData = data.filter((fact) => fact.category === "society");
  // createFactsList(filterData);
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

// let votestIntersting = 41;
// let votesMindlowing = 5;
// const text = "Lisabon is the capital of Portugal";

// votestIntersting === votestIntersting + 1;
// votestIntersting++;
// console.log(votestIntersting);

// let totlUpvotes = votestIntersting + votesMindlowing;
// console.log("Upvotes: ", totlUpvotes);

// let votesFalse = 4;
// const isCorrect = votesFalse < totlUpvotes;
// console.log(isCorrect);

// function calcFactAge(year) {
//   const currentYear = new Date().getFullYear();
//   const age = currentYear - year;

//   if (age >= 0) {
//     return age;
//   } else {
//     return `Impossible year. Year needs to be less or equal ${currentYear}`;
//   }
// }

// const age1 = calcFactAge(2015);
// console.log(age1);
// console.log(calcFactAge(2040));

// const calcFactAge2 = (year) => {
//   const currentYear = new Date().getFullYear();
//   const age = currentYear - year;

//   if (age >= 0) {
//     return age;
//   } else {
//     return `Impossible year. Year needs to be less or equal ${currentYear}`;
//   }
// };

// const calcFactAge2 = (year) =>
//   year <= new Date().getFullYear()
//     ? new Date().getFullYear() - year
//     : `Impossible year. Year needs to be less or equal ${new Date().getFullYear()}`;

// console.log(calcFactAge2(2015));
// console.log(calcFactAge2(2035));

// let votestIntersting = 20;
// let votesMindlowing = 5;

// if (votestIntersting === votesMindlowing) {
//   alert("This fact is equally intresting and mindblowing!!!");
// } else if (votestIntersting > votesMindlowing) {
//   console.log("Somethin else!!!");
// } else if (votestIntersting < votesMindlowing) {
//   console.log("Something else!!!");
// }

// falsy values: 0, "", null, undefined
// truthy value: everything else

// let votesFalse = 7;
// const totalUpvotes = votestIntersting + votesMindlowing;

// const message =
//   totalUpvotes > votesFalse
//     ? "The fact is true"
//     : "Might be fase, check nire sources...";

// console.log(message);

// const text = "Lisabon is the capital of Portugal";
// const upperText = text.toUpperCase();
// console.log(upperText);

// const str = `The current fact "${text}". It is ${calcFactAge(
//   2015
// )} years old. It is probably ${
//   totalUpvotes > votesFalse ? "current" : "not true"
// }`;
// console.log(str);

// const fact = ["Belgrade os capital of Serbia", 2015, true];
// const [text, createdIn] = fact;
// console.log(createdIn);

// const newFact = [...fact, "society"];
// console.log(newFact);

// const factObj = {
//   text: "Belgrade os capital of Serbia",
//   category: "society",
//   crwtwdIn: 2015,
//   isCorrect: true,
//   createSummery: function () {
//     return `The fact ${
//       this.text
//     } is from the category ${this.category.toUpperCase()}`;
//   }
// };

// console.log(factObj.text);
// console.log(factObj["text"]);

// const { category, isCorrect } = factObj;
// console.log(category);
// console.log(factObj.createSummery());

// [2, 8, 40, 5].forEach(function (el) {
//   console.log(el);
// });

// const times10 = [2, 8, 40, 5].map(function (el) {
//   return el * 10;
// });
// const times10 = [2, 8, 40, 5].map((el) => el * 10);

// console.log(times10);

// const CATEGORIES = [
//   { name: "technology", color: "#3b82f6" },
//   { name: "science", color: "#16a34a" },
//   { name: "finance", color: "#ef4444" },
//   { name: "society", color: "#eab308" },
//   { name: "entertainment", color: "#db2777" },
//   { name: "health", color: "#14b8a6" },
//   { name: "history", color: "#f97316" },
//   { name: "news", color: "#8b5cf6" }
// ];

// const allCategories = CATEGORIES.map((el) => el.name);
// console.log(allCategories);

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015
//   }
// ];

// function calcFactAge(year) {
//   const currentYear = new Date().getFullYear();
//   const age = currentYear - year;

//   if (age >= 0) {
//     return age;
//   } else {
//     return `Impossible year. Year needs to be less or equal ${currentYear}`;
//   }
// }

// const factAges = initialFacts.map((el) => calcFactAge(el.createdIn));
// console.log(factAges);
// console.log(factAges.join("-"));
