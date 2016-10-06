var firstAttack = Math.round(Math.random()),
    secondAttack = (firstAttack == 1) ? 0 : 1,
    deathRange = [2, 15],
    totalRounds = 0,
    roundInterval = true,
    animalTeam = ['cat', 'dog'],
    score = document.querySelector('.score'),
    play = document.querySelector('.play');

function addAttack(){
  keyFrames = keyFrames.concat(attack[firstAttack], attack[secondAttack]);
}

function death(){
  var deathsPerHit = Math.floor(Math.random() * ((deathRange[1] - deathRange[0]) + 1)) + deathRange[0];
  return deathsPerHit;
}

function setAttrs(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function playAgain(){
  location.reload();
}

function deathRatio(el){
  
  var team = document.querySelectorAll('.wrap-' + el),
      teamNum = team.length,
      deathToll = [death()],
      hitNums = deathToll[0];
  
  for(i=0; i<teamNum; i++){
    var nextHit = death();

    hitNums += nextHit;
    if(hitNums < teamNum){
      deathToll.push(nextHit);
    }
    else{
      deathToll.push(teamNum - (hitNums - nextHit));
      break;
    }
  }

  var elCount = 0,
      hitRound = 0;
  
  for(i=0; i<deathToll.length; i++){
    for(j=0; j<deathToll[i]; j++){
      
      if(roundInterval == true){
        team[elCount].classList.add('hit-' + ((i + 1) * 2));
      }
      else{
        team[elCount].classList.add('hit-' + (((i + 1) * 2) - 1));
      }
      
      elCount++;
    }
    
    hitRound++;
  }
  console.log(hitRound);
  if(totalRounds < hitRound){
    totalRounds = hitRound;
  }
  
  console.log(roundInterval);
  (roundInterval == true) ? roundInterval = false : roundInterval = true;
}
deathRatio(animalTeam[firstAttack]);
deathRatio(animalTeam[secondAttack]);

for(i=0; i<totalRounds; i++){
  addAttack();
}

var i = -1,
    b = document.querySelector('body'),
    animTime = keyFrames[0].duration,
    animInit = false,
    themeInterval = '',
    deathTrigger = 1,
    battleOver = false;

b.setAttribute('class', keyFrames[0].theme);

function turnIntervals(){
  i++;
  
  var c = i + 1;
  var animDuration = (animInit == false) ? 0 : keyFrames[i].duration * 1000,
      animTheme = keyFrames[c].theme,
      animTarget = keyFrames[c].target,
      animKey = keyFrames[c].key,
      animGetTarget = document.querySelectorAll(animTarget);
  
  turns = setInterval(function(){
    
    var themeType = animTheme.split(" "),
        themeLength = themeType.length,
        themeIntCount = 0;
    
    //console.log(battleOver);

    if(animKey == 'weapon-disengage'){
      var deadAnimals = document.querySelectorAll('.hit-' + deathTrigger);

      for(k=0; k<deadAnimals.length; k++){
        deadAnimals[k].classList.add('dead');
      }

      for(h=0; h<animalTeam.length; h++){

        var deadCount = document.querySelectorAll('.animal-' + animalTeam[h] + ' .dead'),
            animalCount = document.querySelectorAll('.animal-' + animalTeam[h] + ' .animal-wrap');

        if(deadCount.length == animalCount.length){
          console.log('BATTLE OVER')
          battleOver = true;
          setAttrs(score, {
            'data-winner': animalTeam[(h === 0 ? 1 : 0)],
            'data-loser': animalTeam[(h === 0 ? 0 : 1)]
          })
        }
      }
      deathTrigger++;
    }

    function themeInt(){
      b.setAttribute('class', themeType[themeIntCount]);

      themeIntCount++;

      if(themeIntCount === themeLength){
        themeIntCount = 0;
      }
    }

    function stopInterval(){
      clearInterval(themeInterval);
    }

    if(animGetTarget.length > 0){
      for(j=0; j<animGetTarget.length; j++){
        animGetTarget[j].setAttribute('data-anim-key', animKey);
      }
    }
      
    stopInterval(); 
    if(themeLength === 1){
      b.setAttribute('class', animTheme);
    }
    else if(themeLength > 1){
      themeInterval = setInterval(themeInt, 100);
    }
    
    clearInterval(turns);
    
    if(battleOver == true){
      clearInterval(turns);
    }
    else{
      turnIntervals();
    }
    
    animInit = true;
    
  }, animDuration);
}
turnIntervals();

play.addEventListener('click', function(){
  playAgain();
});