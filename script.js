var basket=document.getElementById("basket");
var egg=document.getElementsByClassName("eggFall");//list
var brokenEgg=document.getElementsByClassName("broke");//list
var scoreTable=document.getElementById("score");
var lifeTable=document.getElementById("life");
var playBtn=document.getElementById("play");
var playAgainBtn=document.getElementById("playAgain");
var start=document.getElementById("start");
var gameOver=document.getElementById("gameOver");
var audio=document.getElementById("audio");
var audioScore=document.getElementById("audioScore");
var floor=document.getElementById("floor");
var basketScore=document.getElementById("basketScore");
var finalScore=document.getElementById("finalScore")
var eggPosition1,eggPosition2,eggPosition3;
var score,life,limitScore;
var chick1,chick2,chick3,t1,t2,t3;
var speed1,speed2,speed3;



//moving the basket with mouse
document.addEventListener("mousemove",function(e){
    basket.style.left=e.clientX+"px"; 
    basketScore.style.left=e.clientX+50+"px";
    
});


//start btn function
playBtn.addEventListener("click",startGame);
//play again btn
playAgainBtn.addEventListener("click",startGame);


function startGame(){
    start.style.display="none";
    gameOver.style.display="none";
    audio.src="music/happy chicken.mp3";
    audio.play();
    setGame();
    startInterval(); 
}
function setGame(){
    egg[0].style.visibility="hidden";
    egg[1].style.visibility="hidden";
    egg[2].style.visibility="hidden";
    hiddenEgg(0);
    hiddenEgg(1);
    hiddenEgg(2);
    eggPosition1=100;
    eggPosition2=100;
    eggPosition3=100;
    speed1=600;
    speed2=700;
    speed3=650;
    life=10;
    lifeTable.innerHTML=life;
    score=0
    scoreTable.innerHTML=score;
    finalScore.innerHTML=score;
    basketScore.innerHTML=score;
}

function fallingEgg(){
    egg[0].style.top=eggPosition1+"px"; 
    egg[0].style.visibility="visible";    
    setInterval(hiddenEgg(0),300);
        if(checkEggHitsFloor(egg,0) || checkEggHitsBasket(egg,0)){
            eggPosition1=100; 
        }
        else{
            eggPosition1+=Math.random()*(100-40)+40;         
        }     
}
function fallingEgg2(){
    egg[1].style.top=eggPosition2+"px"; 
    egg[1].style.visibility="visible";
    setInterval(hiddenEgg(1),500);
        if(checkEggHitsFloor(egg,1) || checkEggHitsBasket(egg,1)){
            eggPosition2=100;        
        }
        else{
            eggPosition2+=Math.random()*(100-40)+40;       
         }      
}
function fallingEgg3(){
    egg[2].style.top=eggPosition3+"px"; 
    egg[2].style.visibility="visible";
    setInterval(hiddenEgg(2),600);
        if(checkEggHitsFloor(egg,2) || checkEggHitsBasket(egg,2)){
            eggPosition3=100;        
        }
        else{
            eggPosition3+=Math.random()*(100-40)+40;       
        }
}

//hidden broken eggs
function hiddenEgg(index){
    brokenEgg[index].style.visibility="hidden";
}

function isCollapsed(obj1,obj2){
    //obj1 diminsions
    var obj1OffsetTop=obj1.offsetTop;
    var obj1OffsetLeft=obj1.offsetLeft;
    var obj1Width=obj1.offsetWidth;
    var obj1Height=obj1.offsetHeight;
    var obj1DistanceLeft=obj1Width+obj1OffsetLeft;
    var obj1distanceTop=obj1Height+obj1OffsetTop;

    //obj2 diminsions
    var obj2OffsetTop=obj2.offsetTop;
    var obj2OffsetLeft=obj2.offsetLeft;
    var obj2Width=obj2.offsetWidth;
    var obj2Height=obj2.offsetHeight;
    var obj2DistanceLeft=obj2Width+obj2OffsetLeft;
    var obj2distanceTop=obj2Height+obj2OffsetTop;
    var Collapse=(obj2OffsetLeft<obj1DistanceLeft && obj2DistanceLeft>obj1OffsetLeft && obj2OffsetTop<obj1distanceTop && obj2distanceTop>obj1OffsetTop);
    return Collapse;
}
function checkEggHitsFloor(egg,index){
    if(isCollapsed(egg[index],floor)){
        egg[index].style.visibility="hidden";
        brokenEgg[index].style.visibility="visible";
        calcLife();
        return true;
    }
    return false;
}
function checkEggHitsBasket(egg,index){    
    if(isCollapsed(egg[index],basket)){
        egg[index].style.visibility="hidden";
        calcScore();
        return true;
    }
    return false;
}

function calcLife(){
    life--;
    if(life>0){
    lifeTable.innerHTML=life;
    }
    else{
        gameEnd();
        audio.src="music/game over.mp3";
        audio.play();
    }
}
function calcScore(){
    score++;
    scoreTable.innerHTML=score;
    basketScore.innerHTML=score;
    audioScore.src="music/score.mp3";
    audioScore.play();
    if(score==10){
     deleteInterval();
     t1= setInterval(fallingEgg,speed1*0.7);
     t2= setInterval(fallingEgg2,speed2*0.7);
     t3= setInterval(fallingEgg3,speed3*0.7); 
     limitScore=20;
    }
    else if(score==limitScore){
     clearInterval(t1);
     clearInterval(t2);
     clearInterval(t3);
     t1= setInterval(fallingEgg,speed1*0.5);
     t2= setInterval(fallingEgg2,speed2*0.5);
     t3= setInterval(fallingEgg3,speed3*0.5); 
     limitScore+=10;
    }
    
    
}
//set first intervals to start the game with  
function startInterval(){
    chick1= setInterval(fallingEgg,speed1);
    chick2= setInterval(fallingEgg2,speed2);
    chick3= setInterval(fallingEgg3,speed3);   
}
// Delete the first interval to start new one
function deleteInterval(){
    clearInterval(chick1);
    clearInterval(chick2);
    clearInterval(chick3);
}

function gameEnd(){
    gameOver.style.display="block";
    finalScore.innerHTML=score;
    lifeTable.innerHTML=0;
    clearInterval(t1);
    clearInterval(t2);
    clearInterval(t3);
    deleteInterval();
}





