import  {quizTableau}  from './questions.js'; // Import des questions

// Récupérer les emplacements pour injecter la question et les options
let quizQuestionHTML = document.getElementById('questions');

let quizReponseHTML = document.getElementById('reponses');

// console.log(quizQuestionHTML);
// console.log(quizReponseHTML);

// Récupérer la première question

const firstQuestion = quizTableau.questions[0];

//console.log(firstQuestion);

// Injecter le texte de la question dans l'emplacement dédié


quizQuestionHTML.innerText=firstQuestion.text

//quizReponseHTML.innerText=firstQuestion.options
//console.log(quizReponseHTML)


firstQuestion.options.forEach(option => {
  const responseBouton = document.createElement('button');
  responseBouton.innerText = option;
  responseBouton.classList.add('button');
  quizReponseHTML.appendChild(responseBouton);
});
