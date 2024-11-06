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
const confettiContainer = document.getElementById("confetti-container");


//CODE TIMER !!!! 

let timer;                // Variable pour stocker le timer
let timeRemaining = 15;   // Temps initial en secondes
let timerElement = document.getElementById('timer');  // Élément HTML pour afficher le timer


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
//Variable de labarre de progression
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const totalQuestions = quizTableau.questions.length;


quizQuestionHTML.innerText=firstQuestion.text// Injecter le texte de la question dans l'emplacement dédié
quizReponseHTML.innerText=firstQuestion.options;
const numberOfConfetti = 30;


function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `Question ${currentQuestionIndex + 1} sur ${totalQuestions}`;
}
function generateConfetti() {
  // Nombre de confettis à générer
console.log("toto")
  for (let i = 0; i < numberOfConfetti; i++) {
      // Crée un élément confetti
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
console.log("toto2")
      // Positionne les confettis aléatoirement
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.backgroundColor = getRandomColor();

      // Ajoute le confetti au conteneur
      confettiContainer.appendChild(confetti);

      //Retire le confetti après l'animation pour ne pas saturer le DOM
      confetti.addEventListener("animationend", () => {
         confetti.remove();
      });
  }
}


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
    carte.style.paddingLeft= '25%';
    carte.style.paddingTop = '8%'
    carte.style.float = 'center';

    if (reponseSelectionnee === reponseCorrecte) {
      generateConfetti();
        score++;
        imageElement.src = questionActuelle.img_ville;
        carte.appendChild(imageElement);
        texteCarte.innerHTML = `<span class="bravo">BRAVO !</span><br> Il s'agit bien de ${questionActuelle.descriptif}`;
        console.log(score);
    } else {
        imageElement.src = questionActuelle.img_ville;
        carte.appendChild(imageElement);
        texteCarte.innerHTML = `<span class="dommage">OUPS! </span><br> Il s'agit de ${questionActuelle.descriptif}`;
        console.log(texteCarte);
    }
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
      
      reponseBouton.addEventListener('click', (event) => {
        document.querySelectorAll('.boutonReponse').forEach(reponseBouton => {
            reponseBouton.classList.remove('actif');
        });
        event.currentTarget.classList.add('actif');
        
        checkReponse(option, questionActuelle.correct_answer);
    });
    updateProgressBar()
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


// Fonction pour générer une couleur aléatoire
function getRandomColor() {
  const colors = ["#FF6347", "#FFD700", "#7FFF00", "#00BFFF", "#FF69B4"];
  return colors[Math.floor(Math.random() * colors.length)];
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
  if (currentQuestionIndex < quizTableau.questions.length) {
    // Afficher la question suivante
    loadQuestion();
} else {
    // Si plus de questions, indiquer la fin du quiz
    // boutonSuivantHTML.innerText = 'Fin du quizz';
    quizReponseHTML.innerHTML = ''; // Effacer les options
    boutonSuivantHTML.style.display = 'none'; // Cacher le bouton Suivant
    boutonValiderHTML.style.display = 'none'; //Cacher le bouton Valider
    quizQuestionHTML.innerText="";
    boutonRejouerHTML.style.display = 'inline-block';
    boutonValiderHTML.style.display = 'none';   // Cacher le bouton Valider
    texteCarte.style.display = 'inline-block';   // Afficher un message texte carte
    texteCarte.innerText = "Bravo tu as obtenu un score de " + score + " sur " + quizTableau.questions.length + " Félicitations ! 🎉 " // Afficher le commentaire du texteCarte
  console.log(texteCarte.innerText)
};
})

// Fonction pour réinitialiser le quiz
boutonRejouerHTML.addEventListener('click', () => {
currentQuestionIndex= 0      // TODO Réinitialiser l'index 
boutonRejouerHTML.style.display = 'none'; // TODO Cacher le bouton Rejouer et afficher le bouton Suivant  
boutonSuivantHTML.style.display = 'inline-block'; // Afficher le bouton suivant
loadQuestion()// TODO Recharger la première question

});

loadQuestion() 


function saveScore(score) {   // fonction qui permets de stocker les scores dans un fichier HTML
  const date = new Date().toLocaleString(); // Date et heure de la partie
  const scoreEntry = { score: score, date: date };

  // Récupère les scores existants ou initialise un tableau vide
  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  scores.push(scoreEntry);

  // Sauvegarde la liste des scores mise à jour dans le localStorage
  localStorage.setItem("quizScores", JSON.stringify(scores));
}
console.log(saveScore);

// Appelle la fonction lorsque le quiz est terminé
function endQuiz(score) {
  saveScore(score);
  // Afficher le score ou rediriger vers la page de scores ici
  window.location.href = "scores.html"; // Redirige vers la page de scores
}
// Fonction pour charger et afficher les scores
function displayScores() {
  const scoresList = document.getElementById("scores-list");
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];

  if (scores.length === 0) {
      scoresList.innerHTML = "<p>Aucun score enregistré pour l'instant.</p>";
      console.log(scoresList);
  } else {
      scoresList.innerHTML = scores
          .map((entry, index) => `<p>Partie ${index + 1}: ${entry.score} points - ${entry.date}</p>`)
          .join("");
  }
}

// Fonction pour effacer les scores
function clearScores() {
  localStorage.removeItem("quizScores");
  displayScores(); // Recharge la liste des scores après suppression
}

// Appelle `displayScores` lors du chargement de la page

document.addEventListener("DOMContentLoaded", displayScores);
