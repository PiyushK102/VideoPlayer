const playbtn=document.querySelector("#play");
const pausebtn=document.querySelector("#pause");
const forward=document.querySelector("#forward");
const back=document.querySelector("#back");
const Video= document.querySelector("#screen");
const Videocontainer=document.querySelector("#divscreen");
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
const playlistbutton=document.querySelector("#playlistbutton")
const VideoList=document.querySelector("#playlistbox")
const videoname=document.querySelector("#videonamediv")
const ham=document.querySelector(".ham")
const nav=document.querySelector(".navButtons")
const hamsym=document.querySelector("#hamsym")
const closebtn=document.querySelector("#close")
const closefscreen=document.querySelector("#exitfscreen")
const Social=document.querySelector(".Social")

///////////////////////////////////-----Video Name Function-------///////////////////////////////////////////////////////////////
    function changename(element){
        videoname.innerHTML=element.innerHTML
    }
    
    document.addEventListener("loaded",()=>{
        var winwidth=window.innerWidth
        var winheight=window.innerHeight
        document.querySelector("#screensizebox").innerHTML=" Screen Size → W:"+winwidth+"Px X "+"H:"+winheight+"Px";
        console.log(winheight);
        console.log(winwidth);
    })
    window.addEventListener("resize",()=>{
        var winwidth=window.innerWidth
        var winheight=window.innerHeight
        document.querySelector("#screensizebox").innerHTML=" Screen Size → W:"+winwidth+"Px X "+"H:"+winheight+"Px";
        console.log(winheight);
        console.log(winwidth);
    })
    window.addEventListener("orientationchange",()=>{
        var winwidth=window.innerWidth
        var winheight=window.innerHeight
        document.querySelector("#screensizebox").innerHTML=" Screen Size → W:"+winwidth+"Px X "+"H:"+winheight+"Px";
        console.log(winheight);
        console.log(winwidth);
    })
    
    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
// ham.addEventListener("click",()=>{
//     if(nav.style.display=="block"){
//         hamsym.style.display="none"
//         closebtn.style.display="block"
//     }
//     else{
//         hamsym.style.display="block"
//         closebtn.style.display="none"
//     }
// })
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////-----Change Video Source---------//////////////////////////////////
function changevideo(e){
    togglePlayPause();
    Video.setAttribute('src',e)
    Video.load();
    togglePlayPause();
   
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////-----Document Load Time Script-----/////////////////////////////////
// document.addEventListener("loaded",()=>{
//     screen.style.width===(7/9)*window.innerWidth;
//     screen.style.height===(7/9)*window.innerHeight;
    
// })
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////----Play Pause operation----///////////////////////////////////////

playbtn.addEventListener("click" , togglePlayPause)
Video.addEventListener("click",togglePlayPause) 
pausebtn.addEventListener("click",togglePlayPause)


function togglePlayPause(){
    if(Video.paused==true)
    {
        Video.play()
        pausebtn.style.display="block"
        playbtn.style.display="none"

    }
    else{
        Video.pause()
        playbtn.style.display="block"
        pausebtn.style.display="none"
    }   
}
function controldisplay(btn){
    if (document.getElementById(btn).style.display == "none") {
        document.getElementById(btn).style.display = "flex";
        document.getElementById("controloff").style.display="block"
        document.getElementById("controlon").style.display="none"
        Video.style.height="65vh"
        } 
    else {
        document.getElementById(btn).style.display = "none";
        document.getElementById("controlon").style.display="block"
        document.getElementById("controloff").style.display="none"
        Video.style.height="75vh" 
    } 
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////----Screen Modes----/////////////////////////////////////////////////////////////
fullscrbtn.addEventListener("click",fullscreen)
// closefscreen.addEventListener("click",fullscreen)
Video.addEventListener("dblclick",fullscreen)
function fullscreen(){
   if(document.fullscreenElement==null)
   {
        Videocontainer.requestFullscreen();
   }
   else
   {
        Videocontainer.exitFullscreen();
   }
  
}
// document.addEventListener("fullscreenchange",()=>{

// })
mpbtn.addEventListener("click",pipmode)
function pipmode() {
    if (mpbtn.pictureInPictureElement) {
            mpbtn.exitPictureInPicture();
        }
    else if (document.pictureInPictureEnabled) {
            Video.requestPictureInPicture();
        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////----Volume----/////////////////////////////////////////////////////
mute.addEventListener("click",toggleMute)
volvalue.addEventListener("click",toggleMute)
vol.addEventListener("input",e =>{
    Video.volume=(e.target.value)/100
    Video.muted=e.target.value===0
    volval.innerHTML=Math.round((Video.volume)*100)
    if(vol.value==0){
        mute.style.display="block"
        volvalue.style.display="none"
        volval.innerHTML="Muted"

    }
    else{
        mute.style.display="none"
        volvalue.style.display="block"
        volval.innerHTML=Math.round((Video.volume)*100);
   }
})
function toggleMute()
{
   Video.muted=!Video.muted
   if(Video.muted==true || Video.volume==0)
   {
        mute.style.display="block"
        volvalue.style.display="none"
        vol.value="0"
        volval.innerHTML="Muted"
   }
   else{
        mute.style.display="none"
        volvalue.style.display="block"
        volval.innerHTML=Math.round((Video.volume)*100)
        vol.value=Math.round((Video.volume)*100)
   }
}
function volpm(vvalue){
    
    Video.volume+=vvalue/100
    vol.value=(Video.volume)*100
    volval.innerHTML=(vol.value)
}
//////////////////////////////////////////////////////////////////////////////////
/////////////////--------ProgressBar-----------///////////////////////////////////

Video.addEventListener("loadeddata",()=>{
    seekbar.setAttribute("max",(Video.duration));
    
})
Video.addEventListener("timeupdate",()=>{
    seekbar.value=(Video.currentTime)
    if(Video.currentTime==Video.duration)
    {
        togglePlayPause()
    }
})
    
seekbar.addEventListener("input",e => {
    Video.currentTime=(e.target.value);
    
})
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////--------Duration-----------/////////////////////////

Video.addEventListener("loadeddata",()=>{
    totalTimeElement.textContent=formatDuration(Video.duration)
    
})
Video.addEventListener("timeupdate",()=>{
    currentTimeElement.textContent=formatDuration(Video.currentTime)
    
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
forward.addEventListener("click",skip(10))
back.addEventListener("click",skip(-5))
function skip(duration){
    
    Video.currentTime+=duration
}

///////////////////////////////////////////////////////////////////////////////////////
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
        case "arrowup":
            case "AudioVolumeUp":
                volpm(1)
                break
        case "arrowdown":
            case "AudioVolumeDown":
            case "DOM_VK_VOLUME_DOWN":
                volpm(-1)
                break
        case "c":
            controldisplay('controlscontainer')
            break;         
    }   
})

/////////////////////////////////////////////////////////////////////////////////////////////////////