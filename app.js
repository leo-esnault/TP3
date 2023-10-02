import {injectElements, renewTag} from "./functions/dom.js";

window.onload = init;
let totalArgent = 0;

const wrapper = document.querySelector('#controle');

const bouttonRemplir = document.createElement('button');
bouttonRemplir.id = 'remplir';
bouttonRemplir.textContent = 'Remplir';

const bouttonPrendre = document.createElement('button');
bouttonPrendre.id = 'prendre';
bouttonPrendre.textContent = 'Prendre';


const bouttonAcheter = document.querySelector('#start');

function init(){
  const elementsAjoutes = wrapper.querySelectorAll(':not([data-preserve])');
  elementsAjoutes.forEach(function(element) {
    element.remove();
  });

  wrapper.appendChild(bouttonRemplir);
  wrapper.appendChild(bouttonPrendre);

  bouttonAcheter.textContent = "Acheter";

  document.querySelector('#start').removeEventListener('click', start);
  document.querySelector('#remplir').removeEventListener('click', remplir);
  document.querySelector('#prendre').removeEventListener('click', prendre);

  document.querySelector('#start').addEventListener('click', start);
  document.querySelector('#remplir').addEventListener('click', remplir);
  document.querySelector('#prendre').addEventListener('click', prendre);
}

function start() {
  //je supprime les autres bouttons
  bouttonRemplir.remove();
  bouttonPrendre.remove();
  //etapes
  const etapes = [
    { title: "Commence à faire le café", duree: 2000 },
    { title: "Mouds les grains de café", duree: 1500 },
    { title: "Fait chauffer l'eau", duree: 2500 }, 
    { title: "Infuse les grains de café moulus", duree: 3000 },
    { title: "Verse le café dans une tasse", duree: 2000 },
    { title: "Ajoute un peu de lait dans la tasse", duree: 1500 },
    { title: "Le café est terminé.", duree: 1000 } 
  ]
  //creation des inputs
  const inputNbCafe = document.createElement('input');
  inputNbCafe.id = 'inputNbCafe';
  inputNbCafe.type = 'text';
  wrapper.insertBefore(inputNbCafe, wrapper.firstChild);

  //creations des boutons pour chaque type de cafe
  const expressoButton = document.createElement('button');
  expressoButton.id = 'expresso';
  expressoButton.textContent = 'Expresso';

  const latteButton = document.createElement('button');
  latteButton.id = 'latte';
  latteButton.textContent = 'Latte';

  const cappucinoButton = document.createElement('button');
  cappucinoButton.id = 'cappucino';
  cappucinoButton.textContent = 'Cappucino';

  wrapper.appendChild(expressoButton);
  wrapper.appendChild(latteButton);
  wrapper.appendChild(cappucinoButton);

  //créer bouton retour 
  const bouttonRetour = document.createElement('button');
  bouttonRetour.id = 'retour';
  bouttonRetour.textContent = 'Retour';
  wrapper.appendChild(bouttonRetour);

  document.querySelector('#retour').addEventListener('click', function fonctionRetour(){
    init();
    return;
  });

  //evenement du bouton / fonction
  let typeCafe;
  typeCafe = "expresso";
  document.querySelector('#expresso').addEventListener('click', function(){
    typeCafe = "expresso"
    console.log(typeCafe)
  });
  document.querySelector('#latte').addEventListener('click', function(){
    typeCafe = "latte"
    console.log(typeCafe)
  });
  document.querySelector('#cappucino').addEventListener('click', function(){
    typeCafe = "cappucino"
    console.log(typeCafe)
  });
  document.querySelector('#start').removeEventListener('click', start);
  document.querySelector('#start').addEventListener('click', function faireCafe(){
    let cafePossible;
    console.log(Number(inputNbCafe.value), typeCafe)
    cafePossible = calculer(Number(inputNbCafe.value), typeCafe);
    const laListe = renewTag('ul');
    if (cafePossible){
      wrapper.append(laListe);
      injectElements(etapes, laListe);
    }
    document.querySelector('#start').removeEventListener("click", faireCafe);
  })
}

function calculer(nbCafe, typeCafe){
  let cafe;
  if (recettesCafe.hasOwnProperty(typeCafe)) {
    cafe = recettesCafe[typeCafe];
  } else {
    console.error("Type de café non trouvé :", typeCafe);
    return 0;
  }
  let nbCf1 = reserve.eau/cafe.eau;
  let nbCf2 = reserve.lait/cafe.lait;
  let nbCf3 = reserve.grains/cafe.grains;
  let nbCafePossible = parseInt(Math.min(nbCf1,nbCf2,nbCf3,reserve.tasses));
  console.log(nbCf1,nbCf2,nbCf3,reserve.tasses)
  console.log(nbCafePossible)

  if (nbCafePossible<nbCafe){
    const messageParagraphe = document.createElement('p');
    messageParagraphe.textContent = "Non, je ne peux faire que " + nbCafePossible + " tasses de café";
    wrapper.appendChild(messageParagraphe);
    return 0;
  }
  else if(nbCafePossible>nbCafe){
    const messageParagraphe = document.createElement('p');
    messageParagraphe.textContent = "Oui, je peux faire cette quantité de café (et même " + (nbCafePossible-nbCafe) + " plus que cela)";
    wrapper.appendChild(messageParagraphe);

    retirerDelaReserve(cafe.eau*nbCafe,cafe.lait*nbCafe,cafe.grains*nbCafe, nbCafe);
    reserve.argent += cafe.prix;
    return 1;
  }
  else{
    const messageParagraphe = document.createElement('p');
    messageParagraphe.textContent = "Oui, je peux faire cette quantité de café";
    wrapper.appendChild(messageParagraphe);
    
    retirerDelaReserve(cafe.eau*nbCafe,cafe.lait*nbCafe,cafe.grains*nbCafe, nbCafe);
    reserve.argent += cafe.prix;
    return 1;
  }
}

function remplir(){
  //je supprime les autres bouttons
  bouttonAcheter.remove();
  bouttonPrendre.remove();
  //creation des inputs
  const inputEau = document.createElement('input');
  inputEau.id = 'inputEau';
  inputEau.type = 'text';
  wrapper.insertBefore(inputEau, bouttonRemplir);

  const inputLait = document.createElement('input');
  inputLait.id = 'inputLait';
  inputLait.type = 'text';
  wrapper.insertBefore(inputLait, bouttonRemplir);

  const inputGrains = document.createElement('input');
  inputGrains.id = 'inputGrains';
  inputGrains.type = 'text';
  wrapper.insertBefore(inputGrains, bouttonRemplir);

  const inputTasses = document.createElement('input');
  inputTasses.id = 'inputTasses';
  inputTasses.type = 'text';
  wrapper.insertBefore(inputTasses, bouttonRemplir);
  //créer bouton retour 
  const bouttonRetour = document.createElement('button');
  bouttonRetour.id = 'retour';
  bouttonRetour.textContent = 'Retour';
  wrapper.appendChild(bouttonRetour);

  document.querySelector('#retour').addEventListener('click', function fonctionRetour(){
    init();
    return;
  });
  //evenement du bouton / fonction
  document.querySelector('#remplir').removeEventListener('click', remplir);
  document.querySelector('#remplir').addEventListener('click', function remplissage(){
    ajouterDansReserve(Number(inputEau.value),Number(inputLait.value),Number(inputGrains.value),Number(inputTasses.value));
    console.log(reserve);
    document.querySelector('#remplir').removeEventListener("click", remplissage);
  })
}

function prendre(){
  wrapper.innerHTML += "<p> Vous avez ramassé " + reserve.argent + " €</p>";
  totalArgent += reserve.argent;
  reserve.argent = 0;
  console.log (totalArgent);
  init();
}

const recettesCafe ={
  expresso: {
    eau: 200,
    lait: 0,
    grains: 16,
    prix: 4,
  },
  latte: {
    eau: 350,
    lait: 75,
    grains: 20,
    prix: 7,
  },
  cappucino: {
    eau: 200,
    lait: 100,
    grains: 12,
    prix: 6,
  }
}

let reserve = {
  eau: 400,
  lait: 540,
  grains: 120,
  tasses: 9,
  argent: 550,
};

function retirerDelaReserve(eau_, lait_, grains_, tasses_){
  reserve.eau -= eau_;
  reserve.lait -= lait_;
  reserve.grains -= grains_;
  reserve.tasses -= tasses_;
}

function ajouterDansReserve(eau_, lait_, grains_, tasses_){
  reserve.eau += eau_;
  reserve.lait += lait_;
  reserve.grains += grains_;
  reserve.tasses += tasses_;
}
