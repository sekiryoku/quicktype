const testItem = document.getElementById("textDisplay");
const inputItem = document.getElementById("textInput");
const timeName = document.getElementById("timeName");
const time = document.getElementById("time");
const cwName = document.getElementById("cwName");
const cw = document.getElementById("cw");
const restartBtn = document.getElementById("restartBtn");
const thirty = document.getElementById("thirty");
const sixty = document.getElementById("sixty");
const fifteen = document.getElementById("fifteen");
const ukr = document.getElementById("beg");
const eng = document.getElementById("pro");
const wpm = document.getElementById("wpm");
const wpmName = document.getElementById("wpmName");

let wordNo = 1;
let wordsSubmitted = 0;
let wordsCorrect = 0;
let wpmVal = 0;
let percentageAcc = 0;
let timer = 15;
let flag=0;
let seconds;
let difficulty=1;
let rawKeyStroke = 0;

displayTest(difficulty);

inputItem.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
  }
});

//on Input
inputItem.addEventListener('input', function(event){
  if(flag === 0){
    flag = 1;
    timeStart();
  }
  var charEntered = event.data;
  if(/\s/g.test(charEntered)){  //check if the character entered is a whitespace
    checkWord();
  }
  else{
    currentWord();
  }
});

//time selection
function setFifteen() {
  timer = 15;
  limitColor(fifteen);
  time.innerHTML = timer;
  resetTest();
}

function setThirty() {
  timer = 30;
  limitColor(thirty);
  time.innerText = timer;
  resetTest();
}

function setSixty() {
  timer = 60;
  limitColor(sixty);
  time.innerText = timer;
  resetTest();
}

thirty.addEventListener('click', setThirty);
sixty.addEventListener('click', setSixty);
fifteen.addEventListener('click', setFifteen);

//difficulty Selection
ukr.addEventListener("click",function(){
  difficulty = 1;
  displayTest(difficulty);
  limitColor(ukr,eng);
  resetTest();
  if(keyboardEnabled){
    keyboardVisibleUkr();
  }
});
eng.addEventListener("click",function(){
  difficulty = 2;
  displayTest(difficulty);
  limitColor(eng,ukr);
  resetTest();
  if(keyboardEnabled){
    keyboardVisibleEng();
  }
});

//set the color of time and difficulty
function limitColor(element) {
  const limitDiv = element.parentNode;
  const limitChildren = limitDiv.children;
  for (let i = 0; i < limitChildren.length; i++) {
    if (limitChildren[i] !== element) {
      limitChildren[i].classList.remove('yellow');
    }
  }
  element.classList.add('yellow');
}

//restart the Test
function resetTest() {
  wordsSubmitted = 0;
  wordsCorrect = 0;
  flag = 0;
  wpmVal = 0;
  rawKeyStroke = 0;

  time.classList.remove("current");
  cw.classList.remove("current");
  wpm.classList.remove("current");
  time.innerText = timer;
  timeName.innerText = "Time";
  cw.innerText = wordsCorrect;
  cwName.innerText = "CW";
  wpm.innerText = wpmVal;
  wpmName.innerText = "WPM";
  inputItem.disabled = false;
  inputItem.value = '';
  inputItem.focus();

  clearInterval(seconds);
  limitVisible();
  displayTest(difficulty);
}
restartBtn.addEventListener("click", resetTest);

//start the timer countdown
function timeStart(){
  limitInvisible();
  seconds = setInterval(function() {
    time.innerText--;
    if (time.innerText == "-1") {
        timeOver();
        clearInterval(seconds);
    }
  }, 1000);
}

//diable textarea and wait for restart
function timeOver(){
  inputItem.disabled = true;
  restartBtn.focus();
  limitVisible();

  displayScore();
}

//set Limit visibility
function limitVisible(){
  thirty.style.visibility = 'visible';
  sixty.style.visibility = 'visible';
  fifteen.style.visibility = 'visible';
  ukr.style.visibility = 'visible';
  eng.style.visibility = 'visible';
  wpmName.style.visibility = 'visible';
  wpm.style.visibility = 'visible';
  cw.style.visibility = 'visible';
  cwName.style.visibility = 'visible';
}
function limitInvisible(){
  thirty.style.visibility = 'hidden';
  sixty.style.visibility = 'hidden';
  fifteen.style.visibility = 'hidden';
  ukr.style.visibility = 'hidden';
  eng.style.visibility = 'hidden';
  wpmName.style.visibility = 'hidden';
  wpm.style.visibility = 'hidden';
  cw.style.visibility = 'hidden';
  cwName.style.visibility = 'hidden';
}

const saveButton = document.querySelector('#save-button');
//display the score
function displayScore(){
  if(wordsSubmitted !== 0){
    percentageAcc = Math.floor((wordsCorrect/wordsSubmitted)*100);
  }

  time.classList.add("current");
  cw.classList.add("current");
  wpm.classList.add("current");

  time.innerText = percentageAcc+"%";
  timeName.innerText = "ACC";
  let minutes = timer / 60;
  if (minutes > 0) {
    wpmVal = Math.floor(rawKeyStroke / 5 / minutes);
  }
  wpm.innerText = wpmVal;
  wpmName.innerText = "WPM";

  cw.innerText = wordsCorrect;
  cwName.innerText = "CW";

  // добавляем обработчик события на кнопку сохранения результата
  // saveButton.addEventListener('click', saveResult);
}

// // функция сохранения результата
// function saveResult() {
//   // получаем текущую дату и время
//   const currentDate = new Date();

//   // сохраняем результаты в объекте
//   const result = {
//     date: currentDate.toLocaleString(),
//     accuracy: percentageAcc,
//     wpm: wpmVal,
//     cw: wordsCorrect
//   };

//   // проверяем, есть ли уже сохраненный результат
//   if (!localStorage.getItem('typingResult')) {
//     // сохраняем результат в localStorage
//     localStorage.setItem('typingResult', JSON.stringify(result));

//     // отображаем результаты в модальном окне
//     const modalContent = document.querySelector('.modal-content');
//     const resultBlock = document.createElement('div');
//     resultBlock.classList.add('result-block');
//     const dateBlock = document.createElement('div');
//     dateBlock.innerText = result.date;
//     resultBlock.appendChild(dateBlock);
//     const accuracyBlock = document.createElement('div');
//     accuracyBlock.innerText = 'Accuracy: ' + result.accuracy + '%';
//     resultBlock.appendChild(accuracyBlock);
//     const wpmBlock = document.createElement('div');
//     wpmBlock.innerText = 'WPM: ' + result.wpm;
//     resultBlock.appendChild(wpmBlock);
//     const cwBlock = document.createElement('div');
//     cwBlock.innerText = 'CW: ' + result.cw;
//     resultBlock.appendChild(cwBlock);
//     modalContent.appendChild(resultBlock);

//     // выводим сообщение об успешном сохранении результата
//     alert('Result saved successfully!');
//   } else {
//     alert('You can only save one result.');
//   }
// }

// const savedResult = localStorage.getItem('typingResult');

// if (savedResult) {
//   // преобразуем строку JSON в объект JavaScript
//   const result = JSON.parse(savedResult);

//   // отображаем результаты в модальном окне
//   const modalContent = document.querySelector('.modal-content');
//   const resultBlock = document.createElement('div');
//   resultBlock.classList.add('result-block');
//   const dateBlock = document.createElement('div');
//   dateBlock.innerText = result.date;
//   resultBlock.appendChild(dateBlock);
//   const accuracyBlock = document.createElement('div');
//   accuracyBlock.innerText = 'Accuracy: ' + result.accuracy + '%';
//   resultBlock.appendChild(accuracyBlock);
//   const wpmBlock = document.createElement('div');
//   wpmBlock.innerText = 'WPM: ' + result.wpm;
//   resultBlock.appendChild(wpmBlock);
//   const cwBlock = document.createElement('div');
//   cwBlock.innerText = 'CW: ' + result.cw;
//   resultBlock.appendChild(cwBlock);
//   modalContent.appendChild(resultBlock);
// }

// // получаем ссылку на кнопку "Show modal"
// const showModalButton = document.querySelector('#show-modal-button');

// // добавляем обработчик события "click" на кнопку "Show modal"
// showModalButton.addEventListener('click', function() {
//   // получаем ссылку на элемент ".modal"
//   const modal = document.querySelector('.modal');
//   // изменяем свойство "display" элемента ".modal" на "block"
//   modal.style.display = 'block';
// });

// // получаем ссылку на кнопку "Close"
// const closeButton = document.querySelector('.close-button');

// // добавляем обработчик события "click" на кнопку "Close"
// closeButton.addEventListener('click', function() {
//   // получаем ссылку на элемент ".modal"
//   const modal = document.querySelector('.modal');
//   // изменяем свойство "display" элемента ".modal" на "none"
//   modal.style.display = 'none';
// });


//check if the user is entering correcrt word
function currentWord(){
  const wordEntered = inputItem.value;
  const currentID = "word " + wordNo;
  const currentSpan = document.getElementById(currentID);
  const curSpanWord = currentSpan.innerText;

  if(wordEntered == curSpanWord.substring(0,wordEntered.length)){
    colorSpan(currentID, 2);
  }
  else{
    colorSpan(currentID, 3);
  }
}
//checks word entered
function checkWord(){
  const wordEntered = inputItem.value;
  inputItem.value='';

  const wordID = "word " + wordNo;
  const checkSpan = document.getElementById(wordID);
  wordNo++;
  wordsSubmitted++;

  if(checkSpan.innerText === wordEntered){
    colorSpan(wordID, 1);
    wordsCorrect++;
    rawKeyStroke += checkSpan.innerText.length;
    cw.innerText = wordsCorrect;
  }
  else{
    colorSpan(wordID, 3);
  }

  if(wordNo>31){
    displayTest(difficulty);
  }
  else{
    const nextID = "word "+wordNo;
    colorSpan(nextID, 2);
  }
}
//color the words
function colorSpan(id, color){
  const span = document.getElementById(id);
  if(color === 1 ){
    span.classList.remove('wrong');
    span.classList.remove('current');
    span.classList.add('correct');
  }
  else if(color ===2){
    span.classList.remove('correct');
    span.classList.remove('wrong');
    span.classList.add('current');
  }
  else{
    span.classList.remove('correct');
    span.classList.remove('current');
    span.classList.add('wrong');
  }
}

//display the random words on screen
function displayTest(diff){
  wordNo = 1;
  testItem.innerHTML = '';


  let newTest = randomWords(diff);
  newTest.forEach(function(word, i){
    let wordSpan = document.createElement('span');
    wordSpan.innerText = word;
    wordSpan.setAttribute("id", "word " + (i+1));
    testItem.appendChild(wordSpan);
  });

  const nextID = "word " + wordNo;
  colorSpan(nextID, 2);
}

//Generate an array of random 50 words
function randomWords(diff){

  let engWords = ["ability", "able", "about", "above", "accept", "according", "account", "across", "action", "activity", "actually",  "address", "administration", "admit", "adult", "affect", "after", "again", "against",  "agency", "agent", "ago", "agree", "agreement", "ahead",  "allow", "almost", "alone", "along", "already", "also", "although", "always", "American", "among", "amount", "analysis", "and", "animal", "another", "answer",  "anyone", "anything", "appear", "apply", "approach", "area", "argue",  "around", "arrive", "article", "artist",  "assume", "attack", "attention", "attorney", "audience", "author", "authority", "available", "avoid", "away", "baby", "back",   "ball", "bank",  "beat", "beautiful", "because", "become",  "before", "begin", "behavior", "behind", "believe", "benefit", "best", "better", "between", "beyond",  "bill", "billion",  "black", "blood", "blue", "board", "body", "book", "born", "both", "break", "bring", "brother", "budget", "build", "building", "business", "call", "camera", "campaign",  "cancer", "candidate", "capital", "card", "care", "career", "carry", "case", "catch", "cause", "cell", "center", "central", "century", "certain", "certainly", "chair", "challenge", "chance", "change", "character", "charge", "check", "child", "choice", "choose", "church", "citizen", "city", "civil", "claim", "class", "clear", "clearly", "close", "coach", "cold", "collection", "college", "color", "come", "commercial", "common", "community", "company", "compare", "computer", "concern", "condition", "conference", "congress", "consider", "consumer", "contain", "continue", "control", "cost", "could", "country", "couple", "course", "court", "cover", "create", "crime", "cultural", "culture", "cup", "current", "customer",  "dark", "data", "daughter",  "dead", "deal", "death", "debate", "decade", "decide", "decision", "deep", "defense", "degree", "Democrat", "democratic", "describe", "design", "despite", "detail", "determine", "develop", "development",  "difference", "different", "difficult", "dinner", "direction", "director", "discover", "discuss", "discussion", "disease", "doctor",  "door", "down", "draw", "dream", "drive", "drop", "drug", "during", "each", "early", "east", "easy",  "economic", "economy", "edge", "education", "effect", "effort", "eight", "either", "election", "else", "employee",  "energy", "enjoy", "enough", "enter", "entire", "environment", "environmental", "especially", "establish", "even", "evening", "event", "ever", "every", "everybody", "everyone", "everything", "evidence", "exactly", "example", "executive", "exist", "expect", "experience", "expert", "explain", "eye", "face", "fact", "factor", "fail", "fall", "family", "far", "fast", "father", "fear", "federal", "feel", "feeling",  "field", "fight", "figure", "fill", "film", "final", "finally", "financial", "find", "fine", "finger", "finish", "fire", "firm", "first", "fish", "five", "floor", "fly", "focus", "follow", "food", "foot",  "force", "foreign", "forget", "form", "former", "forward", "four", "free", "friend", "from", "front", "full", "fund", "future", "game", "garden",  "general", "generation",  "girl", "give", "glass", "goal", "good", "government", "great", "green", "ground", "group", "grow", "growth", "guess", "guy", "hair", "half", "hand", "hang", "happen", "happy", "hard", "have",  "head", "health", "hear", "heart", "heat", "heavy", "help", "here", "herself", "high", "him", "himself", "his", "history",  "hold", "home", "hope", "hospital", "hot", "hotel", "hour", "house", "how", "however", "huge", "human", "hundred", "husband", "I", "idea", "identify", "if", "image", "imagine", "impact", "important", "improve",  "include", "including", "increase", "indeed", "indicate", "individual", "industry", "information", "inside", "instead", "institution", "interest", "interesting", "international", "interview", "into", "investment", "involve", "issue",  "item", "it's", "itself", "join", "just", "keep",  "kill", "kind", "kitchen", "know", "knowledge", "land", "language", "large", "last", "late", "later", "laugh", "law", "lawyer", "lead", "leader", "learn", "least", "leave", "left",  "legal", "less",  "letter", "level",  "life", "light", "like", "likely", "line", "list", "listen", "little", "live", "local", "long", "look", "lose", "loss", "love", "machine", "magazine", "main", "maintain", "major", "majority", "make", "man", "manage", "management", "manager", "many", "market", "marriage", "material", "matter", "maybe",  "mean", "measure", "media", "medical", "meet", "meeting", "member", "memory", "mention", "message", "method", "middle", "might", "military", "million", "mind", "minute", "miss", "mission", "model", "modern", "moment", "money", "month", "more", "morning", "most", "mother", "mouth", "move", "movement", "movie", "Mr", "Mrs", "much", "music", "must", "my", "myself", "name", "nation", "national", "natural", "nature", "near", "nearly", "necessary", "need", "network", "never",  "news", "newspaper", "next", "nice", "night",  "none",  "north",  "note", "nothing", "notice",  "number", "occur", "off", "offer", "office", "officer", "official", "often", "once", "only", "onto", "open", "operation", "opportunity", "option",  "order", "organization", "other", "others",  "outside", "over", "own", "owner", "page", "pain", "painting", "paper", "parent", "part", "participant", "particular", "particularly", "partner", "party", "pass", "past", "patient", "pattern", "peace", "people", "perform", "performance", "perhaps", "period", "person", "personal", "phone", "physical", "pick", "picture", "piece", "place", "plan", "plant", "play", "player", "PM", "point", "police", "policy", "political", "politics", "poor", "popular", "population", "position", "positive", "possible", "power", "practice", "prepare", "present", "president", "pressure", "pretty", "prevent", "price", "private", "probably", "problem", "process", "produce", "product", "production", "professional", "professor", "program", "project", "property", "protect", "prove", "provide", "public", "pull", "purpose", "push",  "quality", "question", "quickly", "quite", "race", "radio", "raise", "range", "rate", "rather", "reach", "read", "ready", "real", "reality", "realize", "really", "reason", "receive", "recent", "recently", "recognize", "record", "red", "reduce", "reflect", "region", "relate", "relationship", "religious", "remain", "remember", "remove", "report", "represent", "republican", "require", "research", "resource", "respond", "response", "responsibility", "rest", "result", "return", "reveal", "rich", "right", "rise", "risk", "road", "rock", "role", "room", "rule",  "safe", "same", "save",  "scene", "school", "science", "scientist", "score", "sea", "season", "seat", "second", "section", "security", "see", "seek", "seem", "sell", "send", "senior", "sense", "series", "serious", "serve", "service", "set", "seven", "several", "sex", "sexual", "shake", "share", "she", "shoot", "short", "shot", "should", "shoulder", "show", "side", "sign", "significant", "similar", "simple", "simply", "since", "sing", "single", "sister",   "situation", "size", "skill", "skin", "small", "smile",  "social", "society", "soldier", "some", "somebody", "someone", "something", "sometimes", "song", "soon", "sort", "sound", "source", "south", "southern", "space", "speak", "special", "specific", "speech", "spend", "sport", "spring", "staff", "stage", "stand", "standard", "star", "start", "state", "statement", "station", "stay", "step", "still", "stock", "stop", "store", "story", "strategy", "street", "strong", "structure", "student", "study", "stuff", "style", "subject", "success", "successful", "such", "suddenly", "suffer", "suggest", "summer", "support", "sure", "surface", "system", "table", "take", "talk", "task", "tax", "teach", "teacher", "team", "technology", "television", "tell",  "tend", "term", "test", "than", "thank", "that",  "their", "them", "themselves", "then", "theory", "there", "these", "they", "thing", "think", "third", "this", "those", "though", "thought", "thousand", "threat", "three", "through", "throughout", "throw", "thus", "time", "today", "together", "tonight",  "total", "tough", "toward", "town", "trade", "traditional", "training", "travel", "treat", "treatment", "tree", "trial", "trip", "trouble", "true", "truth", "try", "turn", "TV",  "type", "under", "understand", "unit", "until", "usually", "value", "various", "very", "victim", "view", "violence", "visit", "voice", "vote", "wait", "walk", "wall", "want",  "watch", "water",  "weapon", "wear", "week", "weight", "well", "west", "western", "what", "whatever", "when", "where", "whether", "which", "while", "white",  "whole", "whom", "whose",  "wide", "wife", "will", "wind", "window", "wish", "with", "within", "without", "woman", "wonder", "word", "work", "worker", "world", "worry", "would", "write", "writer", "wrong", "yard", "yeah", "year", "young", "your", "yourself"];


  let ukrWords = ['кіт', 'криниця', 'кролик', 'вітер', 'вовк', 'хліб', 'вухо', 'коса', 'пісня', 'жаба', 'гріх', 'град', 'корень', 'коло', 'кров', 'кухня', 'зірка', 'ріст', 'танок', 'вікно', 'літо', 'вода', 'вісім', 'візок', 'береза', 'буря', 'біль', 'батько', 'дім', 'дерево', 'доріжка', 'дах', 'сир', 'день', 'море', 'молоко', 'місто', 'мак', 'ніс', 'ніч', 'небо', 'носоріг', 'обід', 'око', 'опеньки', 'ось', 'пліт', 'піч', 'пошта', 'пісок', 'пень', 'рука', 'рот', 'риба', 'рак', 'сад', 'сім', 'слово', 'сніг', 'сіль', 'сміх', 'сон', 'стіл', 'світ', 'танець', 'тиждень', 'тінь', 'трава', 'тіло', 'троянда', 'туалет', 'торт', 'вівця', 'віник', 'віск', 'вугілля', 'вогонь', 'ворота', 'горщик', 'гроші', 'груди', 'гусак', 'дзвін', 'душа', 'душ', 'двері', 'зозуля', 'зима', 'зуби', 'змія', 'зелень', 'запах', 'йогурт', 'йоржик', 'коник', 'коза', 'кавун', 'карась', 'крихта', 'кличка', 'котик', 'кружка', 'куля', 'ланцюг', 'леді', 'листок', 'лінь', 'ліра', 'лист', 'людина', 'мавпа', 'майно', 'манго', 'медаль', 'мінімум', 'мідь', 'міч', 'молоток', 'мураха', 'нога', 'носок', 'нота', 'назва', 'нектар', 'неволя', 'незнайка', 'облако', 'овочі', 'океан', 'осінь', 'озеро', 'пекар', 'перець', 'перстень', 'пиво', 'пил', 'плуг', 'подушка', 'поляна', 'помідор', 'поїзд', 'прожектор', 'протест', 'півень', 'плащ', 'привіт', 'підкова', 'рецепт', 'рис', 'роги', 'ром', 'рота', 'річка', 'свиня', 'село', 'сестра', 'сигара', 'синій', 'сирник', 'сірник', 'собака', 'соната', 'стіна', 'стілець', 'стежина', 'стежка', 'стріла', 'сумка', 'сімейний', 'телятина', 'телевізор', 'тепло', 'термін', 'термос', 'тісто', 'ток', 'тон', 'травень', 'трикутник', 'трійка', 'туфля', 'фрукт', 'футбол', 'хата', 'хлопчик', 'хрін', 'хрущ', 'хустка', 'цегла', 'цукерка', 'чайник', 'чай', 'чарівний', 'час', 'черешня', 'червоний', 'шкільний', 'шкіряний', 'школа', 'шприц', 'щур', 'щітка', 'щоденник', 'ювелір', 'ягода', 'ягнятина', 'ялинка', 'яблуко', 'яд', 'яйце', 'ярмарок', 'ярмо', 'яхта', 'явір', 'яворина', 'батько', 'мати', 'сестра', 'брат', 'день', 'ночі', 'дощ', 'море', 'океан', 'річка', 'дерево', 'ліс', 'трава', 'квіти', 'любов', 'друг', 'радість', 'щастя', 'біль', 'біда', 'рада', 'співак', 'актор', 'письменник', 'музикант', 'художник', 'знання', 'місто', 'село', 'кулінарія', 'система', 'програма', 'інтерфейс', 'функція', 'алгоритм', 'операція', 'вікно', 'екран', 'текст', 'зображення', 'фото', 'відео', 'аудіо', 'мова', 'словник', 'граматика', 'лексика', 'речення', 'вислів', 'ідея', 'концепція', 'теорія', 'принцип', 'метод', 'підхід', 'проект', 'команда', 'керівник', 'співробітник', 'клієнт', 'замовник', 'продукт', 'послуга', 'ринок', 'споживач', 'потреба', 'попит', 'пропозиція', 'платформа', 'пристрій', 'деталь', 'елемент', 'конструкція', 'матеріал', 'інструмент', 'промисловість', 'сільське господарство', 'економіка', 'поле', 'луг', 'гора', 'пагорб', 'долина', 'печера', 'купання', 'пляж', 'дельфін', 'акула', 'риба', 'птах', 'повітря', 'погода', 'сезон', 'природа', 'довкілля', 'екологія', 'відпочинок', 'подорож', 'подія', 'фестиваль', 'концерт', 'вистава', 'театр', 'кіно', 'книжка', 'персона', 'характер', 'вчинок', 'почуття', 'емоція', 'привітання', 'подяка', 'вибачення', 'просьба', 'попередження', 'порада', 'рекомендація', 'підказка', 'запитання', 'відповідь', 'обговорення', 'дискусія', 'погляд', 'думка', 'ідеал', 'норма', 'цінність', 'право', 'закон', 'суд', 'справедливість', 'несправедливість', 'корупція', 'боротьба', 'зміни', 'інтерес', 'конфлікт', 'зброя', 'війна', 'мир', 'дипломатія', 'дружба', 'колега', 'сусід', 'знайомий', 'незнайомець', 'ворог', 'безпека', 'ризик', 'небезпека', 'професія', 'робота', 'бізнес', 'економіка', 'інвестиції', 'фінанси', 'банк', 'гроші', 'платіж', 'зарплата', 'пенсія', 'страхування', 'медицина', 'лікар', 'хвороба', 'симптом', 'ліки', 'терапія', 'реабілітація', 'хобі', 'інтерес', 'тварина', 'пристрій', 'техніка', 'автомобіль', 'мотоцикл', 'велосипед', 'смартфон', 'планшет', 'інтернет', 'вогонь', 'жовтий', 'зима', 'йогурт', 'кавун', 'лист', 'мак', 'ночівля', 'огірок', 'печиво', 'рожевий', 'свято', 'трава', 'фіалка', 'хвиля', 'цукерка', 'чайник', 'шоколад', 'щебінь', 'юнак', 'яблуня', 'багато', 'весна', 'горобина', 'дзюрчати', 'єдиний', 'жито', 'зозуля', 'ірис', 'квасоля', 'літак', 'малий', 'нотатки', 'горіх', 'плуг', 'різдво', 'сир', 'туман', 'факел', 'хмара', 'цвинтар', 'шпинат', 'щастя', 'юний', 'ягода', 'бабуся', 'вишня', 'горілка', 'дитина', 'євро', 'жаба', 'збірка', 'інжир', 'кетчуп', 'лісовий', 'марена', 'небо', 'океан', 'полин', 'рис', 'сік', 'травень', 'форель', 'хрін', 'цукор', 'шкаралупа', 'щиток', 'ялинка', 'барвінок', 'вірш', 'гриб', 'дуб', 'єнот', 'життєвий', 'завод', 'індіго', 'компот', 'людина', 'малина', 'небесний', 'озеро', 'перець', 'річка', 'сонце', 'терен', 'фрукт', 'хата', 'цвях', 'шкіра', 'щипці', 'якір', 'авокадо', 'банан', 'відпочинок', 'горщик', 'джем', 'еклер', 'фарш', 'глина', 'хрустка', 'їжак', 'єдиноріг', 'запіканка', 'інститут', 'йога', 'кедр', 'лампа', 'матрас', 'нічний', 'оладки', 'пічень', 'рисовий', 'салат', 'тарілка', 'фольксваген', 'хрущ', 'цукер', 'червоний', 'шампунь', 'щипки', 'яйце', 'абрикос', 'брудний', 'вухо', 'город', 'димчастий', 'єгер', 'жолоб', 'антена', 'буква', 'вишивка', 'гірко', 'двері', 'єдиноборство', 'жабка', 'завжди', 'кава', 'листівка', 'майстерня', 'ноти', 'орхідея', 'прожектор', 'садок', 'танок', 'футболка', 'хміль', 'цукерберг', 'штани', 'щастя', 'яхта', 'берег', 'візок', 'гірський', 'дзюдо', 'європейський', 'жакет', 'займатися', 'історичний', 'кетяг', 'лідерство', 'маршрут', 'ножиці', 'очікування', 'платформа', 'розумний', 'сирник', 'тарантул', 'фундамент', 'хоробрість', 'це', 'шахти', 'щоденник', 'якість', 'австралійський', 'багажник', 'вікторія', 'гірлянда', 'дезодорант', 'єдність', 'жанр', 'земляника', 'ідея', 'каністра', 'ландшафт', 'магніт', 'навушники', 'організація', 'програма', 'саквояж', 'танці', 'фазан', 'хустка', 'центральний', 'штучний', 'щипання', 'янгол', 'бетон', 'виклик', 'графіка', 'дошка', 'ємність', 'жіночий', 'закладка', 'інстинкт', 'квартал', 'літній', 'маяк', 'нападник', 'орієнтація', 'продукт', 'салют', 'тасьма', 'форинт', 'хвилястий', 'цитрусовий', 'швидкісний', 'щетина', 'алея', 'безвізовий', 'виноград', 'гавана', 'дизель', 'ємності', 'жабрі', 'закуска', 'індик', 'кедровий', 'ластівка', 'магнітний', 'нагрудний', 'організм', 'прогулянка', 'самокат', 'творчий', 'фотоапарат', 'хороший', 'центрифуга', 'шухляда', 'що', 'баба', 'євро', 'жар', 'зір', 'іск', 'кедр', 'лан', 'муха', 'ніж', 'орк', 'хам', 'цап', 'шин','борт', 'вовк', 'диво', 'жук', 'кекс', 'луг', 'пірс', 'рота', 'сало', 'тиск', 'фуга', 'хвоя', 'цукр', 'шрам', 'щуп', 'ясен', 'айва', 'вузл', 'клен', 'мега', 'усяк', 'фікус', 'хмар', 'цвях', 'шкіра', 'щось', 'авеню', 'дідько', 'єнот', 'жито', 'злет', 'ірис', 'кант', 'нюх', 'опік', 'плав', 'рись', 'соло','храм', 'шмат', 'щур', 'лось', 'цвіт', 'ніжка', 'чверть', 'суниця', 'чесно', 'мурмур', 'мурчик', 'хрін', 'звичай', 'брязк', 'бісектриса', 'будня', 'родзинка', 'віск', 'ланцюжок', 'крижаний', 'варення', 'гербарій', 'горобчик', 'шлунковий', 'шахрай', 'снігур', 'прогулянка', 'супок', 'стілець', 'стожар', 'лампас', 'печаль', 'купець', 'кольоровий', 'заборона', 'криниця', 'крупинка', 'дошка', 'щільний', 'чекання', 'цитрин', 'серветка', 'трясця', 'вітрина', 'будівля', 'вереда', 'барабан', 'благородний', 'болотце', 'буква', 'гримаса', 'граблі', 'дивізія', 'масивний', 'малюк', 'неділя', 'осінній', 'риболов', 'розуміння', 'свято', 'свіжий', 'синій', 'сільський', 'телеграма', 'торговець', 'фіолетовий', 'холодний', 'школяр', 'щоденник', 'юнак', 'якір', 'вуличка', 'виняток', 'вовк', 'вірш', 'гармати', 'дверцята', 'джаз', 'електрик', 'змагання', 'компот', 'корона', 'кавун', 'кукурудза', 'листівка', 'морозиво', 'нотатки', 'намет', 'освіта', 'пастух', 'принцеса', 'повітря', 'рюкзак', 'річка', 'солодощі', 'суміш', 'танок', 'баклажан', 'бідний', 'ворітця', 'вуаль', 'гетьман', 'дошечка', 'дерево', 'жабеня', 'зіниця', 'їжа', 'застібка', 'йогурт', 'кавовий', 'комаха', 'картридж', 'лапки', 'миска', 'неволя', 'намисто', 'оксамит', 'освіжувач', 'печатка', 'пиріг', 'розлука', 'сонечко', 'світильник', 'тарілка', 'темнота', 'унітаз', 'усмішка', 'футбол', 'фірма', 'хатинка', 'холодильник', 'царина', 'черепаха', 'штани', 'щедрість', 'юність', 'ялинка', 'автор', 'балкон', 'бігти', 'веселка', 'гостинець', 'городина', 'домен', 'доторк', 'єдиний', 'жмуток', 'закуска', 'зміїний', 'імпульс', 'кадр', 'кіно', 'каток', 'лавочка', 'луна', 'маршрут', 'мурашки', 'неповторний', 'обійми', 'орел', 'плівка', 'перемога', 'плакат', 'правда', 'робота', 'свічка', 'сонце', 'секрет', 'танок', 'товар', 'тісто', 'український', 'фонд', 'фольклор', 'хмаринка', 'хуліган', 'цеглина', 'чашка', 'шматок', 'щастя', 'юнак', 'ягода', 'аеропорт', 'будка', 'вишенька', 'відпочинок', 'голубка', 'горшок', 'димок', 'дисплей', 'ємність', 'жовтий', 'звичка', 'іній', 'компанія', 'клавіша', 'лінія', 'маніяк', 'меч', 'ніжність', 'озеро', 'перехід', 'призма', 'присадибна', 'рефрижератор', 'сердечко', 'синявка', 'традиція', 'акула', 'безодня', 'вальс', 'візерунок', 'галактика', 'джаз', 'дельфін', 'живопис', 'завірюха', 'інтрига', 'їжак', 'йога', 'кавун', 'каркас', 'ланцюг', 'мавпа', 'небеса', 'овес', 'операція', 'піраміда', 'павук', 'саксофон', 'стежина', 'тополя', 'університет', 'усипальниця', 'фея', 'ферма', 'хміль', 'цілунок', 'черговий', 'шприц', 'щільність', 'юрта', 'авангард', 'баланс', 'бензин', 'віяло', 'гордість', 'генерал', 'детектив', 'єдиноріг', 'жаворонок', 'зброя', 'залізо', 'інсекти', 'крила', 'клубок', 'лелека', 'магнат', 'матір', 'нічний', 'осінь', 'промінь', 'принцеса', 'рожевий', 'сирень', 'сльози', 'троянда', 'танцювальний', 'український', 'фарба', 'футуристичний', 'хвиля', 'цитрус', 'чорний', 'шпигун', 'щастя', 'ювілей', 'яхта', 'азарт', 'бутиль', 'ваніль', 'герой', 'груша', 'дим', 'доброта', 'європа', 'жолудь', 'загадка', 'золото', 'кіт', 'клубниця', 'лабіринт', 'лелека', 'маяк', 'мрія', 'невдача', 'обрій', 'очі', 'переправа', 'пригода', 'провалля', 'роман', 'симетрія', 'соната', 'тюльпан', 'твір', 'україна', 'фольк', 'феєрія', 'хміль', 'церков', 'чай', 'шалений', 'щиросердечність', 'юність'];
  
  if(diff == 1){
    wordArray = ukrWords;
  }
  else{
    wordArray = engWords;
  }

  var selectedWords = [];
  for(var i=0;i<31;i++){
    var randomNumber = Math.floor(Math.random()*wordArray.length);
    selectedWords.push(wordArray[randomNumber]+" ");
  }
  return selectedWords;
}

// mute/unmute btn
const muteBtn = document.getElementById("muteBtn");
const unmuteBtn = document.getElementById("unmuteBtn");
let isMuted = false;
let isFocused = false;

  muteBtn.addEventListener('click', function(){
    isMuted = !isMuted;
    muteBtn.classList.toggle('fa-volume-mute');
    muteBtn.classList.toggle('fa-volume-down');
    muteBtn.classList.toggle('yellow');
  });

  // установка флага, когда input получает фокус
  document.querySelector('.text-input').addEventListener('focus', function() {
    isFocused = true;
  });

  // сброс флага, когда input теряет фокус
  document.querySelector('.text-input').addEventListener('blur', function() {
    isFocused = false;
  });

  document.addEventListener('keydown', function(event) {
    if (isMuted && isFocused) {
      const audio = new Audio('./assets/sound/keyboard-sound.mp3');
      audio.play();
    }
  });

  //keyboard visible

   const keyboardUkr = document.getElementById('keyboard-ukr');
   const keyboardEng = document.getElementById('keyboard-eng');
   const keyboardBtn = document.getElementById('keyboardBtn');


   let keyboardEnabled = false; // флаг для отслеживания включенности клавиатуры

   function toggleKeyboard(){
     keyboardEnabled = !keyboardEnabled; // инвертируем флаг при каждом нажатии на кнопку
     keyboardBtn.classList.toggle('yellow');
     if (keyboardEnabled) {
       if (difficulty === 1) {
         keyboardVisibleUkr();
       } else {
         keyboardVisibleEng();
       }
     } else {
       keyboardUkr.style.display = 'none';
       keyboardEng.style.display = 'none';
     }
   }
   
   keyboardBtn.addEventListener('click', toggleKeyboard);

      function keyboardVisibleUkr() {
        keyboardUkr.style.display = 'block';
        keyboardEng.style.display = 'none';
      }

      function keyboardVisibleEng() {
        keyboardUkr.style.display = 'none';
        keyboardEng.style.display = 'block';
      }
 

