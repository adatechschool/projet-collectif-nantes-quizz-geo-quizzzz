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




quizQuestionHTML.innerText=firstQuestion.text// Injecter le texte de la question dans l'emplacement dédié


function checkReponse(optionReponse, correctAnswer){//verifie si la reponse est correcte ou non
  boutonValiderHTML.addEventListener('click', ()=>{ //au clic sur valider
    boutonSuivantHTML.style.display = 'inline-block';
    boutonValiderHTML.style.display = 'none';
    carte.style.display = 'inline-block'
    texteCarte.style.display = 'inline-block'
carte.style.width = '350px';
carte.style.height = '350px';
carte.style.display = 'flex';
carte.style.padding = '20px';
carte.style.float = 'left';

    if(optionReponse == correctAnswer){
      score++

      imageElement.src = questionActuelle.img_ville;
      carte.appendChild(imageElement);  // Ajouter l'image à l'élément carte

      
      texteCarte.innerText="Bravo " + questionActuelle.descriptif
      console.log(score)
      console.log(texteCarte)
      return true
  } else{
      console.log("La réponse est fausse")
      texteCarte.innerText="T'es une grosse merde " + questionActuelle.descriptif
      console.log(texteCarte)
      return false
    }
  })
}


  
function loadQuestion() {
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
loadQuestion();

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
      quizQuestionHTML.innerText="";
      boutonRejouerHTML.style.display = 'inline-block';
    }
  });

  // Fonction pour réinitialiser le quiz
boutonRejouerHTML.addEventListener('click', () => {
currentQuestionIndex= 0      // TODO Réinitialiser l'index 
boutonRejouerHTML.style.display = 'none';      // TODO Cacher le bouton Rejouer et afficher le bouton Suivant  
boutonSuivantHTML.style.display = 'inline-block'; // Afficher le bouton suivant
loadQuestion()// TODO Recharger la première question
});
