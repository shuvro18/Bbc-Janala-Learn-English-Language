const span = (arr) => {
  const html = arr.map((el) => `<span class="btn">${el}</span>`);
  return html.join(" ");
};

const fetchFn = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => loadData(json.data));
};

const removeColor = () => {
  const find = document.querySelectorAll(".color-button");
  find.forEach((color) => color.classList.remove("active"));
};

const lessonFn = (word) => {
  const url = `https://openapi.programming-hero.com/api/level/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeColor();
      const findLessonButton = document.getElementById(`lesson-button${word}`);
      findLessonButton.classList.add("active");
      Word(data.data);
    });
};

// {
//     "id": 76,
//     "level": 1,
//     "word": "Fast",
//     "meaning": "দ্রুত",
//     "pronunciation": "ফাস্ট"
// }

const infoFn = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModals(data.data));
};

// {
//     "word": "Fascinate",
//     "meaning": "মুগ্ধ করা",
//     "pronunciation": "ফ্যাসিনেট",
//     "level": 5,
//     "sentence": "The magician's tricks fascinate the audience.",
//     "points": 4,
//     "partsOfSpeech": "verb",
//     "synonyms": [
//         "captivate",
//         "charm",
//         "enchant"
//     ],
//     "id": 6
// }

const showModals = (modal) => {
  const modalBox = document.getElementById("modals");
  modalBox.innerHTML = `
              <div >
                    <h2 class="font-bold text-2xl">${modal.word} (<i class="fa-solid fa-microphone-lines"></i>:${modal.pronunciation})</h2>
                </div>
                <div>
                    <p class="font-bold">Meaning</p>
                    <p>${modal.meaning}</p>
                </div>
                <div>
                    <p class="font-bold">Example</p>
                    <p>${modal.sentence}</p>
                </div>
                <div class="font-bold">সমার্থক শব্দ গুলো</div>
                <div>
                    ${span(modal.synonyms)}
              </div>
  
  
  `;
  document.getElementById("my_modal_5").showModal();
};

const Word = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    wordContainer.innerHTML = `<div class="text-center col-span-full space-y-4">
            <img class="mx-auto" src="./assets/alert-error.png">
            <p class="text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-semibold text-3xl">নেক্সট Lesson এ যান।</h2>
        </div>`;
  }

  words.forEach((wordd) => {
    const createElement = document.createElement("div");
    createElement.innerHTML = `
            <div class="bg-white p-5 space-y-7 rounded-md text-center">
            <h3 class="font-bold text-2xl">${wordd.word ? wordd.word : "not found"}</h3>
            <p class="font-bold">Meaning /Pronounciation</p>
            <h2 class="font-bangla font-bold">"${wordd.meaning ? wordd.meaning : "not found"} / ${wordd.pronunciation ? wordd.pronunciation : "not found"}"</h2>
            <div class="flex justify-between items-center">
                <button onclick="infoFn(${wordd.id})" class="btn hover:bg-primary"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn hover:bg-primary"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>
    
    `;

    wordContainer.append(createElement);
  });
};

const loadData = (lessons) => {
  const buttonContainer = document.getElementById("buttons-container");
  buttonContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const div = document.createElement("div");
    div.innerHTML = ` 
        <button id="lesson-button${lesson.level_no}" onclick="lessonFn(${lesson.level_no})" class="btn btn-outline btn-primary color-button"><i class="fa-solid fa-book-open"></i><span>Lesson -${lesson.level_no}</span></button>

        `;

    buttonContainer.append(div);
  });
};

fetchFn();
