import  {quizTableau}  from './questions.js'; // Import des questions


// Récupérer les emplacements pour injecter la question et les options
let quizQuestionHTML = document.getElementById('questions');
let quizReponseHTML = document.getElementById('reponses');

let texteCarte = document.getElementById('texteDeLaCarte');
let carte = document.getElementById('carte')
const imageElement = document.createElement('img');

const firstQuestion = quizTableau.questions[0];// Récupérer la première question
let currentQuestionIndex = 0 //Déclarer une variable pour suivre la question actuelle (currentQuestionIndex). Au début, elle est égale à zéro. 

const boutonSuivantHTML = document.getElementById('suivant')
const boutonRejouerHTML = document.getElementById('rejouer')
const boutonValiderHTML = document.getElementById('valider')
let reponseBouton= document.createElement('button');
let questionActuelle = quizTableau.questions[currentQuestionIndex];  
let score = 0;

//CODE TIMER !!!! 

let timer;                // Variable pour stocker le timer
let timeRemaining = 15;   // Temps initial en secondes
let timerElement = document.getElementsByClassName('timer');  // Élément HTML pour afficher le timer


function startTimer() { //AJOUT
  // Afficher le temps initial dans l'élément timer
  timerElement.innerText = `Temps restant : ${timeRemaining} secondes`;

  // Définir une boucle qui diminue le temps restant chaque seconde
  timer = setInterval(() => {
      timeRemaining--;  // Décrémenter le temps de 1
      timerElement.innerText = `Temps restant : ${timeRemaining} secondes`;

      // Si le temps est écoulé, passer automatiquement à la question suivante
      if (timeRemaining <= 0) {
          clearInterval(timer);  // Arrêter le timer
          loadNextQuestion();    // Passer à la question suivante
      }
  }, 1500); // Répéter chaque seconde
}



function resetTimer() {
  clearInterval(timer); // Arrêter tout timer en cours
  timeRemaining = 15;   // Réinitialiser le temps

}


quizQuestionHTML.innerText=firstQuestion.text// Injecter le texte de la question dans l'emplacement dédié


// Déclarer l'event listener pour le bouton valider en dehors de checkReponse
let reponseSelectionnee = null;
let reponseCorrecte = null;

function checkReponse(optionReponse, correctAnswer) {
    reponseSelectionnee = optionReponse;
    reponseCorrecte = correctAnswer;
    return optionReponse === correctAnswer;
}

// Ajouter un seul event listener pour le bouton valider
boutonValiderHTML.addEventListener('click', () => {
    if (reponseSelectionnee === null) return; // Si aucune réponse n'est sélectionnée

    boutonSuivantHTML.style.display = 'inline-block';
    boutonValiderHTML.style.display = 'none';
    carte.style.display = 'inline-block';
    texteCarte.style.display = 'inline-block';
    carte.style.width = '350px';
    carte.style.height = '350px';
    carte.style.display = 'flex';
    carte.style.padding = '20px';
    carte.style.float = 'left';

    if (reponseSelectionnee === reponseCorrecte) {
        score++;
        imageElement.src = questionActuelle.img_ville;
        carte.appendChild(imageElement);
        texteCarte.innerText = " BRAVO " + questionActuelle.descriptif;
        console.log(score);
    } else {
        texteCarte.innerText = " Dommage !!!!  il s'agit de " + questionActuelle.descriptif;
        console.log(texteCarte);
    }
});

// Dans loadQuestion(), modifier l'event listener des boutons de réponse
reponseBouton.addEventListener('click', (event) => {
    document.querySelectorAll('.boutonReponse').forEach(reponseBouton => {
        reponseBouton.classList.remove('actif');
    });
    event.currentTarget.classList.add('actif');
    
    checkReponse(option, questionActuelle.correct_answer);
});


function loadQuestion() {

  resetTimer();    //   AJOUT Réinitialiser le timer au chargement d'une nouvelle question
  startTimer();    // AJOUT Démarrer le timer pour cette question


  // Vider le conteneur des options
  quizReponseHTML.innerHTML = '';

  // Récupérer la question actuelle
  questionActuelle = quizTableau.questions[currentQuestionIndex];
  // console.log(currentQuestionIndex);
  // console.log(quizTableau.questions);
  // console.log(quizTableau.questions[currentQuestionIndex])

  // Injecter la question dans le HTML
  quizQuestionHTML.innerText = questionActuelle.text;

  // Injecter les options dans le HTML 
  questionActuelle.options.forEach(option => { //pour chaque reponse de la liste reponse
      let reponseBouton = document.createElement('button'); // on crée un bouton reponse
      //console.log("Bravo");
      reponseBouton.innerText = option; // on récupère le texte de la reponse pour l'intégrer le texte sur le bouton
      reponseBouton.classList.add('boutonReponse'); // ajout de la classe button à chaque bouton
      quizReponseHTML.appendChild(reponseBouton); // terminer la boucle lorsqu'il n'y a plus de reponse
      
      reponseBouton.addEventListener('click', (event) => { //ici on démarre une fonction masi qui n'a pas de nom ()
        document.querySelectorAll('.boutonReponse').forEach(reponseBouton=>{ //applique la surbrillance en fonction du clic sur le bouton reponse
          reponseBouton.classList.remove('actif');
        })
        event.currentTarget.classList.add('actif');
    
        
        checkReponse(option, questionActuelle.correct_answer); 
                // ecrire if(option == questionactuelle.correctanswer) 
      })

    });
}


function loadNextQuestion() { //AJOUT
  // Incrémenter l'index de la question et charger la question suivante
  currentQuestionIndex++;
  boutonSuivantHTML.style.display = 'none';
  boutonValiderHTML.style.display = 'inline-block';
  carte.style.display = 'none';
  texteCarte.style.display = 'none';

  if (currentQuestionIndex < quizTableau.questions.length) {
    loadQuestion(); // Charger la question suivante
} else {
    // Fin du quiz
    quizReponseHTML.innerHTML = '';
    boutonSuivantHTML.style.display = 'none';
    quizQuestionHTML.innerText = "";
    boutonRejouerHTML.style.display = 'inline-block';
}
}


// Ajouter un écouteur d'événements pour le bouton "Suivant"
boutonSuivantHTML.addEventListener('click', () => {
  // Incrémenter l'index de la question
  currentQuestionIndex = currentQuestionIndex+1;
  boutonSuivantHTML.style.display = 'none';
  boutonValiderHTML.style.display = 'inline-block';
  carte.style.display = 'none'
  texteCarte.style.display = 'none'
  // Vérifier s'il reste des questions
 
});

// Fonction pour réinitialiser le quiz
boutonRejouerHTML.addEventListener('click', () => {
currentQuestionIndex= 0      // TODO Réinitialiser l'index 
boutonRejouerHTML.style.display = 'none';      // TODO Cacher le bouton Rejouer et afficher le bouton Suivant  
boutonSuivantHTML.style.display = 'inline-block'; // Afficher le bouton suivant
loadQuestion()// TODO Recharger la première question
});

loadQuestion()


