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
firstQuestion.options.forEach(option => {
<<<<<<< HEAD
  const responseBouton = document.createElement('button');
  responseBouton.innerText = option;
  responseBouton.classList.add('button');
  quizReponseHTML.appendChild(responseBouton);
});
=======
    const reponseBouton = document.createElement('button');
    reponseBouton.innerText = option;
    reponseBouton.classList.add('button');
    quizReponseHTML.appendChild(reponseBouton);
  });
>>>>>>> b20f49db4593de9d72706a5f6ac8779ea1e7a4e5
