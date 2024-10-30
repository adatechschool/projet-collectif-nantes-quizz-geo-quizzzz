import  {quizTableau}  from './questions.js'; // Import des questions

// Récupérer les emplacements pour injecter la question et les options
let quizQuestionHTML = document.getElementById('questions');

let quizReponseHTML = document.getElementById('reponses');

// Récupérer la première question

const firstQuestion = quizTableau.questions[0];

// Injecter le texte de la question dans l'emplacement dédié


quizQuestionHTML.innerText=firstQuestion.text


//quizReponseHTML.innerText=firstQuestion.options


// Pour chaque option, créer un bouton et l'ajouter au conteneur
firstQuestion.options.forEach(option => { //pour chaque reponse de la liste reponse
    const reponseBouton = document.createElement('button'); // on crée un bouton reponse
    reponseBouton.innerText = option; // on récupère le texte de la reponse pour l'intégrer le texte sur le bouton
    reponseBouton.classList.add('boutonReponse'); // ajout de la classe button à chaque bouton
    quizReponseHTML.appendChild(reponseBouton); // terminer la boucle lorsqu'il n'y a plus de reponse
  });

let currentQuestionIndex = 0 //Déclarer une variable pour suivre la question actuelle (currentQuestionIndex). Au début, elle est égale à zéro. 
let boutonHTML = document.getElementById('valider-suivant')  
function loadQuestion() {
    // Vider le conteneur des options
    __________.innerHTML = '';
  
    // Récupérer la question actuelle
    const __________ = __________.questions[__________];
  
    // Injecter la question dans le HTML
    __________.innerText = __________;
  
    // Injecter les options dans le HTML 
    __________.__________.forEach(__________ => {
      const __________ = document.createElement('button');
      __________.innerText = __________;
      __________.classList.add('__________');
      __________.appendChild(__________);
    });
  }