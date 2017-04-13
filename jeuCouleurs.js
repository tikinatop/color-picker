var carresLayout   = [[900,30,1.66,3],
                     [600,30,1.66,6],
                     [900,15,0.67,12]];
var conteneur      = document.querySelector("#conteneur");
var couleurs       = [], choixCouleur,currentMode;
var carres         = document.querySelectorAll(".carre");
var afficheCouleur = document.getElementById("afficheCouleur");
var afficheMessage = document.querySelector("#message");
var h1             = document.querySelector("h1");
var resetBtn       = document.querySelector("#reset");
var modeBtn        = document.querySelectorAll(".modeBtn");

function checkMode(){
    for (var i = 0; i< modeBtn.length; i++) {
      if (modeBtn[i].classList.contains("selection")){
        currentMode = modeBtn[i];
        console.log(modeBtn[i].textContent);
        init(i);
      }
    }
  afficheMessage.textContent = "";
  }

function init(level){
  //génère toute les nouvelles couleurs
  couleurs = genereCouleurAlea(carresLayout[level][3]);
  conteneur.style.maxWidth = String(carresLayout[level][0])+"px";
  //choisit une nouvelle couleur au hasard
  choixCouleur = selectionneCouleur();
  //change afficheCouleur 
  afficheCouleur.textContent = choixCouleur.replace('g','v');
  //change la couleur des carrés
  for (var i = 0; i < carres.length; i++){
    if (couleurs[i]) {
      carres[i].style.backgroundColor = couleurs[i];
      carres[i].style.display = "block";
      carres[i].style.width = String(carresLayout[level][1])+"%";
      carres[i].style.paddingBottom = String(carresLayout[level][1])+"%";
      carres[i].style.margin = String(carresLayout[level][2])+"%";
    } else {
      carres[i].style.display = "none";
    }
  }
  resetBtn.textContent = "Nouvelles couleurs";
  h1.style.background = "steelblue";
}

function changeCouleurs(couleur) {
    //
    for (var i = 0; i < carres.length; i++) {
    //
    carres[i].style.background = couleur;      
  }
}

function selectionneCouleur() {
  var random = Math.floor(Math.random()*couleurs.length);
  return couleurs[random];
}

function genereCouleurAlea(num) {
    //
    var arr = [];
    //
    for (var i = 0; i < num; i++){
      //
      arr.push(couleurAlea());
    }
    //
    return arr;
  }

  function couleurAlea() {
    return "rgb("+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+")";
  }
  

  window.onload = checkMode();

  for (var i = 0; i< modeBtn.length; i++) {

    modeBtn[i].addEventListener("click",function(){
      if(this !== currentMode){
        currentMode.classList.remove("selection");
        this.classList.add("selection");
        checkMode();
      }
    });
  }
  


  resetBtn.addEventListener("click", checkMode);


  for (var i = 0; i < carres.length; i++){
  //Ajoute les couleurs initiales aux carrés
  carres[i].style.backgroudColor = couleurs[i];
  //Ajoute un eventListener aux carrés
  carres[i].addEventListener("click", function(){
    //
    var couleurCliquee = this.style.backgroundColor;
    //
    console.log(couleurCliquee,choixCouleur);
    if(couleurCliquee === choixCouleur){
      afficheMessage.textContent = "Correct!";
      resetBtn.textContent = "Rejouer?";
      changeCouleurs(couleurCliquee);
      h1.style.background = couleurCliquee;
    } else {
      this.style.background = "#232323";
      afficheMessage.textContent = "Réessaye!";
    }
  });
}
