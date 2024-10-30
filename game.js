import  {quizTableau}  from './questions.js'; // Import des questions

// Récupérer les emplacements pour injecter la question et les options
let quizQuestionHTML = document.getElementById('questions');

let quizReponseHTML = document.getElementById('reponses');

console.log(quizQuestionHTML);
console.log(quizReponseHTML)

// Récupérer la première question

let firstQuestion = quizTableau.questions[0];

console.log(firstQuestion);

// Injecter le texte de la question dans l'emplacement dédié


quizQuestionHTML.innerText=firstQuestion.text

quizReponseHTML.innerText=firstQuestion.options


// // Pour chaque option, créer un bouton et l'ajouter au conteneur
// firstQuestion.__________.forEach(__________ => {
//     const __________ = document.createElement('button');
//     __________.innerText = __________;
//     __________.classList.add('__________');
//     __________.appendChild(__________);
//   });