import  {quizTableau}  from './questions.js'; // Import des questions


// Récupérer les emplacements pour injecter la question et les options
let quizQuestionHTML = document.getElementById('questions');
let quizReponseHTML = document.getElementById('reponses');
const firstQuestion = quizTableau.questions[0];// Récupérer la première question
let currentQuestionIndex = 0 //Déclarer une variable pour suivre la question actuelle (currentQuestionIndex). Au début, elle est égale à zéro. 
const boutonSuivantHTML = document.getElementById('suivant')
const boutonRejouerHTML = document.getElementById('rejouer')
//let boutonValiderHTML = document.getElementById('valider')
let reponseBouton= document.createElement('button');
const correctAnswer = firstQuestion.correct_answer;

quizQuestionHTML.innerText=firstQuestion.text// Injecter le texte de la question dans l'emplacement dédié


// Pour chaque option, créer un bouton et l'ajouter au conteneur
firstQuestion.options.forEach(option => { //pour chaque reponse de la liste reponse
    reponseBouton = document.createElement('button'); // on crée un bouton reponse
    reponseBouton.innerText = option; // on récupère le texte de la reponse pour l'intégrer le texte sur le bouton
    reponseBouton.classList.add('boutonReponse'); // ajout de la classe button à chaque bouton
    quizReponseHTML.appendChild(reponseBouton); // terminer la boucle lorsqu'il n'y a plus de reponse
    // reponseBouton.addEventListener('click', () => {
    //   let conteneurDeReponse = reponseBouton.innerText
    
    // })
    
  });

  
function loadQuestion() {
    // Vider le conteneur des options
    quizReponseHTML.innerHTML = '';
  
    // Récupérer la question actuelle
    const questionSuivante = quizTableau.questions[currentQuestionIndex];
  
    // Injecter la question dans le HTML
    quizQuestionHTML.innerText = questionSuivante.text;
  
    // Injecter les options dans le HTML 
    questionSuivante.options.forEach(option => { //pour chaque reponse de la liste reponse
        reponseBouton = document.createElement('button'); // on crée un bouton reponse
        reponseBouton.innerText = option; // on récupère le texte de la reponse pour l'intégrer le texte sur le bouton
        reponseBouton.classList.add('boutonReponse'); // ajout de la classe button à chaque bouton
        quizReponseHTML.appendChild(reponseBouton); // terminer la boucle lorsqu'il n'y a plus de reponse
      });
  }


  // Ajouter un écouteur d'événements pour le bouton "Suivant"
  boutonSuivantHTML.addEventListener('click', () => {
    // Incrémenter l'index de la question
    currentQuestionIndex = currentQuestionIndex+1;
  
    // Vérifier s'il reste des questions
    if (currentQuestionIndex < quizTableau.questions.length) {
      // Afficher la question suivante
      loadQuestion();
    } else {
      // Si plus de questions, indiquer la fin du quiz
      // boutonSuivantHTML.innerText = 'Fin du quizz';
      quizReponseHTML.innerHTML = ''; // Effacer les options
      boutonSuivantHTML.style.display = 'none'; // Cacher le bouton Suivant
      quizQuestionHTML.innerText="";
      boutonRejouerHTML.style.display = 'inline-block';
    }
  });
  
  


  // Fonction pour réinitialiser le quiz
boutonRejouerHTML.addEventListener('click', () => {
currentQuestionIndex= 0      // TODO Réinitialiser l'index 
boutonRejouerHTML.style.display = 'none';      // TODO Cacher le bouton Rejouer et afficher le bouton Suivant  
boutonSuivantHTML.style.display = 'inline-block'; // Afficher le bouton suivant
loadQuestion(firstQuestion)// TODO Recharger la première question
 
});