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




///////////////////////////////////-----Video Name Function-------////////////////////////////////////
    function changename(element){
        videoname.innerHTML=element.innerHTML
    }
    
    document.addEventListener("loaded",()=>{
        var winwidth=window.innerWidth
        var winheight=window.innerHeight
        document.querySelector("#screensizebox").innerHTML="Width:"+winwidth+" X "+"Height"+winheight;
        console.log(winheight);
        console.log(winwidth);
    })
    window.addEventListener("resize",()=>{
        var winwidth=window.innerWidth
        var winheight=window.innerHeight
        document.querySelector("#screensizebox").innerHTML="Width:"+winwidth+" X "+"Height"+winheight;
        console.log(winheight);
        console.log(winwidth);
    })
    window.addEventListener("orientationchange",()=>{
        var winwidth=window.innerWidth
        var winheight=window.innerHeight
        document.querySelector("#screensizebox").innerHTML="Width:"+winwidth+" X "+"Height"+winheight;
        console.log(winheight);
        console.log(winwidth);
    })
    
    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////-----Change Video Source---------//////////////////////////////////
function changevideo(e){
    togglePlayPause();
    Video.setAttribute('src',e)
    Video.load();
    togglePlayPause();
   
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////-----Document Load Time Script-----/////////////////////////////////
document.addEventListener("loaded",()=>{
    screen.style.width=(7/9)*window.innerWidth;
    screen.style.height=(7/9)*window.innerHeight;
    
})
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////----Play Pause operation----///////////////////////////////////////

playbtn.addEventListener("click" , togglePlayPause)
Video.addEventListener("click",togglePlayPause) 
pausebtn.addEventListener("click",togglePlayPause)
controls.addEventListener("hover",display)

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
////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////-------PlaylistBox Display-------/////////////////////////////////
function display(element) {
    if (document.getElementById(element).style.display == "none") {
        document.getElementById(element).style.display = "block";
        
        } 
    else {
        document.getElementById(element).style.display = "none";
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////----Screen Modes----/////////////////////////////////////////////////////////////
fullscrbtn.addEventListener("click",fullscreen)
Video.addEventListener("dblclick",fullscreen)
function fullscreen(){
   if(fullscrbtn.requestFullscreen ||Video.requestFullscreen)
   {
        Video.requestFullscreen();
   }
   else if(Video.requestFullscreen==true)
   {
        Video.exitFullscreen();
   }
  
}
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
        volval.innerHTML=Math.ceil((Video.volume)*100)
        vol.value=Math.floor((Video.volume)*100)
   }
}


/////////////////////////////////////////////////////////////////
/////////////////--------ProgressBar-----------////////////////////

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
///////////////////////////////////////////////////////////////////
/////////////////--------Duration-----------////////////////////

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

function skip(duration){
    
    Video.currentTime+=duration
}
forward.addEventListener("click",skipf)
function skipf(duration)
{
    duration=10;
    Video.currentTime+=duration

}
function skipb(duration)
{
    duration=5;
    Video.currentTime-=duration
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
