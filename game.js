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


// Pour chaque option, créer un bouton et l'ajouter au conteneur
firstQuestion.options.forEach(option => { //pour chaque reponse de la liste reponse
    const reponseBouton = document.createElement('button'); // on crée un bouton reponse
    reponseBouton.innerText = option; // on récupère le texte de la reponse pour l'intégrer le texte sur le bouton
    reponseBouton.classList.add('boutonReponse'); // ajout de la classe button à chaque bouton
    quizReponseHTML.appendChild(reponseBouton); // terminer la boucle lorsqu'il n'y a plus de reponse
  });