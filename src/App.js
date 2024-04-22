/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

function App() {
  // 1. Define state variable
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      setIsLoading(true);

      let query = supabase.from("facts").select("*");

      if (currentCategory !== "all") {
        query = query.eq("category", currentCategory);
      }

      async function getFacts() {
        const { data: facts, error } = await query
          .order("votesIntresting", {
            ascending: false
          })
          .limit(100);

        // console.log(error);
        // console.log(facts);

        if (!error) {
          setFacts(facts);
        } else {
          alert("There was a problem getting data!!!");
        }
        setIsLoading(false);

        // console.log(facts);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm}></Header>
      {/* 2. Use state variable */}
      {showForm ? (
        <NewFactForm
          setFacts={setFacts}
          setShowForm={setShowForm}
        ></NewFactForm>
      ) : null}
      <main className="main">
        <CategoryFilter
          setCurrentCategory={setCurrentCategory}
        ></CategoryFilter>
        {isLoading ? <Loader></Loader> : <FactList facts={facts}></FactList>}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        // 3. Update state variable
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

// eslint-disable-next-line no-unused-vars
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

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    // 2. Check if data is valis. If so, create a new fact
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      // 3. Create new fact
      // const newFact = {
      //   id: Math.round(Math.random * 10000000),
      //   text: text,
      //   source: source,
      //   category: category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear()
      // };

      // new 3. Uplode fact to supabase and recive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();

      setIsUploading(false);

      // 4. Add new fact to the UI: add the fact to state
      if (!error) {
        setFacts((facts) => [newFact[0], ...facts]);
      }

      // 5. Reset input fields
      setText("");
      setSource("");
      setCategory("");

      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <li className="category">
        <button
          className="btn btn-all-categories"
          onClick={() => setCurrentCategory("all")}
        >
          All
        </button>
      </li>
      {CATEGORIES.map((cat) => (
        <li key={cat.name} className="category">
          <button
            onClick={() => setCurrentCategory(cat.name)}
            className="btn btn-category"
            style={{ backgroundColor: cat.color }}
          >
            {cat.name}
          </button>
        </li>
      ))}
    </aside>
  );
}

function FactList({ facts }) {
  if (facts.lenght === 0) {
    return (
      <p className="message">No facts for this category yet! Create one?</p>
    );
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact}></Fact>
        ))}
      </ul>
      <p>There are {facts.lenght} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesIntresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
