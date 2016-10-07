var keyFrames = [
  {
    theme: "init",
    duration: 0
  },
  {
    key: "animals-init",
    target: ".main",
    theme: "init",
    duration: 0
  },
  {
    key: "animals-meet",
    target: ".weapon, .animal",
    theme: "init",
    duration: 4
  },
  {
    key: "animals-stare",
    target: ".main",
    theme: "init",
    duration: 0.5
  },
  {
    key: "animals-talk-in",
    target: ".animal",
    theme: "init",
    duration: 4
  },
  {
    key: "animals-talk-out",
    target: ".animal",
    theme: "init",
    duration: 1
  }
];

var attack = [
  [ // cats
    {
    key: "raygun-engage-charge",
    target: ".main",
    theme: "init",
    duration: 1.2
    },
    {
      key: "raygun-engage-shoot",
      target: ".main",
      theme: "laser-1 laser-2",
      duration: 0.75
    },
    {
      key: "raygun-engage-hit",
      target: ".main",
      theme: "laser-hit-1 laser-hit-2",
      duration: 2
    },
    {
      key: "weapon-disengage",
      target: ".main",
      theme: "init",
      duration: 3
    },
    {
      key: "",
      target: ".main",
      theme: "init",
      duration: 0
    }
  ],
  [ // dogs
    {
    key: "cannon-engage-aim",
    target: ".main",
    theme: "init",
    duration:1.8
    },
    {
      key: "cannon-engage-shoot",
      target: ".main",
      theme: "light",
      duration:1
    },
    {
      key: "cannon-engage-hit",
      target: ".main",
      theme: "expl-1 expl-2 expl-3",
      duration: 1.5
    },
    {
      key: "weapon-disengage",
      target: ".main",
      theme: "init",
      duration: 3
    },
    {
      key: "",
      target: ".main",
      theme: "init",
      duration: 0
    }
  ]
];
var firstAttack = Math.round(Math.random()),
    secondAttack = (firstAttack === 1) ? 0 : 1,
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
      
      if(roundInterval === true){
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
  //(roundInterval === true) ? roundInterval = false : roundInterval = true;

  if(roundInterval === true){
    roundInterval = false;
  }
  else{
    roundInterval = true;
  }
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
  var animDuration = (animInit === false) ? 0 : keyFrames[i].duration * 1000,
      animTheme = keyFrames[c].theme,
      animTarget = keyFrames[c].target,
      animKey = keyFrames[c].key,
      animGetTarget = document.querySelectorAll(animTarget);
  
  turns = setInterval(function(){
    
    var themeType = animTheme.split(" "),
        themeLength = themeType.length,
        themeIntCount = 0;
    
    //console.log(battleOver);

    if(animKey === 'weapon-disengage'){
      var deadAnimals = document.querySelectorAll('.hit-' + deathTrigger);

      for(k=0; k<deadAnimals.length; k++){
        deadAnimals[k].classList.add('dead');
      }

      for(h=0; h<animalTeam.length; h++){

        var deadCount = document.querySelectorAll('.animal-' + animalTeam[h] + ' .dead'),
            animalCount = document.querySelectorAll('.animal-' + animalTeam[h] + ' .animal-wrap');

        if(deadCount.length === animalCount.length){
          console.log('BATTLE OVER');
          battleOver = true;
          setAttrs(score, {
            'data-winner': animalTeam[(h === 0 ? 1 : 0)],
            'data-loser': animalTeam[(h === 0 ? 0 : 1)]
          });
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
    
    if(battleOver === true){
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