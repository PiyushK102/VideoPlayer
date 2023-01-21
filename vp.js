const playbtn=document.querySelector("#play");
const pausebtn=document.querySelector("#pause");
const forward=document.querySelector("#forward");
const back=document.querySelector("#back");
const video= document.querySelector("#screen");
const videocontainer=document.querySelector("screendiv");
const mpbtn=document.querySelector("#minip");
const fullscrbtn=document.querySelector("#fullscr");
const controls=document.querySelector("#controlscontainer");
const volvalue=document.querySelector("#voln");
const vol=document.querySelector("#volslider");
const volval=document.querySelector("#volval")
const mute=document.querySelector("#mute");
const currentTimeElement=document.querySelector(".currtime");
const totalTimeElement=document.querySelector(".totaltime");
const seekbar=document.querySelector("#progress");


///////////////////////////////////----Play Pause operation----////////////////////////////////////

playbtn.addEventListener("click" , togglePlayPause)
video.addEventListener("click",togglePlayPause) 
pausebtn.addEventListener("click",togglePlayPause)
controls.addEventListener("hover",display)

function togglePlayPause(){
    if(video.paused==true)
    {
        video.play()
        pausebtn.style.display="block"
        playbtn.style.display="none"
    }
    else{
        video.pause()
        playbtn.style.display="block"
        pausebtn.style.display="none"
        
    }   
}

function display()
{ 
    if(controls.addEventListener("hover")==true || video.addEventListener("hover")==true || video.addEventListener("pause")==true)
    {
        controls.style.display="flex" 
    }
    else{
        controls.style.display="none"
    }
}
////////////////////////////////////////////////////////////////
///////////////////////----Screen Modes----////////////////////////////
fullscrbtn.addEventListener("click",fullscreen)
video.addEventListener("dblclick",fullscreen)
function fullscreen(){
   if(fullscrbtn.requestFullscreen ||video.requestFullscreen)
   {
        video.requestFullscreen();
   }
   else if(video.requestFullscreen==true)
   {
        video.exitFullscreen();
   }
  
}
mpbtn.addEventListener("click",pipmode)
function pipmode() {
    if (mpbtn.pictureInPictureElement) {
            mpbtn.exitPictureInPicture();
        }
    else if (document.pictureInPictureEnabled) {
            video.requestPictureInPicture();
        }
}


//////////////////////////////////////////////////////////////////////
///////////////////////----Volume----////////////////////////////
mute.addEventListener("click",toggleMute)
volvalue.addEventListener("click",toggleMute)
vol.addEventListener("input",e =>{
    video.volume=(e.target.value)/100
    video.muted=e.target.value===0
    volval.innerHTML=Math.round((video.volume)*100)
    if(vol.value==0){
        mute.style.display="block"
        volvalue.style.display="none"
        volval.innerHTML="Muted"

    }
    else{
        mute.style.display="none"
        volvalue.style.display="block"
        volval.innerHTML=Math.round((video.volume)*100);
   }
})
function toggleMute()
{
   video.muted=!video.muted
   if(video.muted==true || video.volume==0)
   {
        mute.style.display="block"
        volvalue.style.display="none"
        vol.value="0"
        volval.innerHTML="Muted"
   }
   else{
        mute.style.display="none"
        volvalue.style.display="block"
        volval.innerHTML=Math.ceil((video.volume)*100)
        vol.value=Math.floor((video.volume)*100)
   }
}


/////////////////////////////////////////////////////////////////
/////////////////--------ProgressBar-----------////////////////////

video.addEventListener("loadeddata",()=>{
    seekbar.setAttribute("max",(video.duration));
})
video.addEventListener("timeupdate",()=>{
    seekbar.value=(video.currentTime)
})
    
seekbar.addEventListener("input",e => {
    video.currentTime=(e.target.value);
    
})
///////////////////////////////////////////////////////////////////
/////////////////--------Duration-----------////////////////////

video.addEventListener("loadeddata",()=>{
    totalTimeElement.textContent=formatDuration(video.duration)
    
})
video.addEventListener("timeupdate",()=>{
    currentTimeElement.textContent=formatDuration(video.currentTime)
    
})
const leadingZeroFormatter=new Intl.NumberFormat(undefined,{
    minimumIntegerDigits:2
})
function formatDuration(time){
    const sec=Math.floor(time%60)
    const min=Math.floor(time/60)%60
    const hr=Math.floor(time/3600)
    if(hr===0)
    {
        return`${min}:${leadingZeroFormatter.format(sec)}`
        
    }
    else{
        return `${hr}:${leadingZeroFormatter.format(min)
        }:${leadingZeroFormatter.format(sec)}`
    }
}

function skip(duration){
    
    video.currentTime+=duration
}
forward.addEventListener("click",skipf)
function skipf(duration)
{
    duration=10;
    video.currentTime+=duration

}
function skipb(duration)
{
    duration=5;
    video.currentTime-=duration
}
back.addEventListener("click",skipb)
///////////////////////////////////////////////////////////////////
document.addEventListener("keydown", e =>{
    switch(e.key.toLowerCase()){
        case " ":
        case "p":
        case "f10":
            togglePlayPause()
            break
        case "m":
            toggleMute()
            break 
        case "arrowleft":
            case "j":
                skip(-5)
                break
        
        case "arrowright":
            case "l":
                skip(+10)
                break
        case "f":
            fullscreen()
            break
        case "o":
            pipmode()
            break
    }   
})

/////////////////////////////////////////////////////////////////////////////////////////////////////