const fetchFn = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => loadData(json.data));
};

const lessonFn = (word) => {
  const url = `https://openapi.programming-hero.com/api/level/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => Word(data.data));
};

// {
//     "id": 76,
//     "level": 1,
//     "word": "Fast",
//     "meaning": "দ্রুত",
//     "pronunciation": "ফাস্ট"
// }

const Word = (words) => {
  const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
  words.forEach((wordd) => {
    const createElement = document.createElement("div");
    createElement.innerHTML = `
            <div class="bg-white p-5 space-y-7 rounded-md text-center">
            <h3 class="font-bold text-2xl">${wordd.word}</h3>
            <p class="font-bold">Meaning /Pronounciation</p>
            <h2 class="font-bangla font-bold">"${wordd.meaning} / ${wordd.pronunciation}"</h2>
            <div class="flex justify-between items-center">
                <button class="btn hover:bg-primary"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn hover:bg-primary"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>
    
    `;

    wordContainer.append(createElement)
  });
};

const loadData = (lessons) => {
  const buttonContainer = document.getElementById("buttons-container");
  buttonContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const div = document.createElement("div");
    div.innerHTML = ` 
        <button onclick="lessonFn(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i><span>Lesson -${lesson.level_no}</span></button>

        `;

    buttonContainer.append(div);
  });
};

fetchFn();
