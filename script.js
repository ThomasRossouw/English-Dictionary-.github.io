const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");
const synonymE1 = document.getElementById("synonym");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}` ;
    const result = await fetch(url).then((res) => res.json());
    const urlS = `https://api.api-ninjas.com/v1/thesaurus?word=${word}`;
    const resultS = await fetch(urlS).then((res) => res.json());


    if (result.title)
     {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "N/A";
      synonymE1.innerText = "N/A";
    } 
    else 
    {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      synonymE1.style.display = "inline-flex";
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
      synonymE1.innerText = result[0].meanings[0].synonyms[0];

    }
  } 

  catch (error) 

  {
    console.log(error);
    infoTextEl.innerText = `an error happened, try again later`;
  }
}



inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});