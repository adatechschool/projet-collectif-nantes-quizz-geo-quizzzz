import  {quizTableau}  from './questions.js'; // Import des questions

// Récupérer les emplacements pour injecter la question et les options
const quizQuestion = document.getElementById('questions');
const quizReponse = document.getElementById('reponses');
console.log(quizQuestion);
console.log(quizReponse);

// Récupérer la première question
const firstQuestion = text.questions[0];
console.log(firstQuestion);

// Injecter le texte de la question dans l'emplacement dédié
quizQuestion.innerText = firstQuestion;

// Pour chaque option, créer un bouton et l'ajouter au conteneur
firstQuestion.__________.forEach(__________ => {
    const __________ = document.createElement('button');
    __________.innerText = __________;
    __________.classList.add('__________');
    __________.appendChild(__________);
  });