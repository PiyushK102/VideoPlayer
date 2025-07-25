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
const closefscreen=document.querySelector("#exitfullscr")
const Social=document.querySelector(".Social")


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Social.addEventListener("click",()=>{
//     if(document.querySelector("#socialButtons").style.display=="none"){
//         document.querySelector("#socialButtons").style.display="block"
//         document.querySelector("#uparrow").style.display="block"
//         document.querySelector("#downarrow").style.display="none" 
//     }
//     else{
//         document.querySelector("#socialButtons").style.display="none"
//         document.querySelector("#uparrow").style.display="none"
//         document.querySelector("#downarrow").style.display="block" 
//     }
// })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////-----Video Name Function-------///////////////////////////////////////////////////////////////
    function changename(element){
        videoname.innerHTML=element
    }
    // Videocontainer.addEventListener("onmouseover",()=>{
    //     document.querySelector("#topline").setAttribute("top",0)
    // })
    document.addEventListener("loaded",()=>{
        var winwidth=window.innerWidth
        var winheight=window.innerHeight
        document.querySelector("#screensizebox").innerHTML=" Screen Size → W:"+winwidth+"Px X "+"H:"+winheight+"Px";
        console.log(winheight);
        console.log(winwidth);
    })
    Video.addEventListener("onchange",()=>{
        var winwidth=window.innerWidth
        var winheight=window.innerHeight
        document.querySelector("#screensizebox").innerHTML=" Screen Size → W:"+winwidth+"Px X "+"H:"+winheight+"Px";
    })
    document.addEventListener("onchange",()=>{
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
///////////////////////////////////----Play Pause operation----///////////////////////////////////////

playbtn.addEventListener("click" , togglePlayPause)
Video.addEventListener("click",togglePlayPause) 
pausebtn.addEventListener("click",togglePlayPause)


function togglePlayPause(){
    if(Video.paused==true)
    {
        Video.play()
        pausebtn.style.display="flex"
        playbtn.style.display="none"

    }
    else{
        Video.pause()
        playbtn.style.display="flex"
        pausebtn.style.display="none"
    }   
}
function controldisplay(btn){
    if (document.getElementById(btn).style.opacity ==0) {
        document.getElementById(btn).style.opacity = 1;
        document.getElementById("topline").style.opacity=1
        document.getElementById("controlon").style.display="none"
        document.getElementById("controloff").style.display="flex"
        } 
    else {
        document.getElementById(btn).style.opacity = 0;
        document.getElementById("controlon").style.display="flex"
        document.getElementById("topline").style.opacity=0
        document.getElementById("controloff").style.display="none"
    } 
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////----Screen Modes----/////////////////////////////////////////////////////////////

///////////////////////////////////------FullScreen Button--------/////////////////////////////////////
fullscrbtn.addEventListener("click",fullscreen)
closefscreen.addEventListener("click",fullscreen)
Video.addEventListener("dblclick",fullscreen)
document.addEventListener("fullscreenchange",()=>{
    if(document.fullscreenElement==null || document.fullscreenEnabled==false){
        closefscreen.style.display="none"
        fullscrbtn.style.display="flex"
    }
    else{
        closefscreen.style.display="flex"
        fullscrbtn.style.display="none"
    }
})
function fullscreen(){
    if(document.fullscreenElement!=null || document.fullscreenEnabled==false)
    {
         document.exitFullscreen()
         closefscreen.style.display="none"
         fullscrbtn.style.display="flex"
    }
    else
    {
         Videocontainer.requestFullscreen()
         closefscreen.style.display="flex"
         fullscrbtn.style.display="none"
    }
 }
///////////////////////////////////------MiniPlayer Button--------/////////////////////////////////////
mpbtn.addEventListener("click",pipmode)
function pipmode() {
    if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        }
    else {
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
        mute.style.display="flex"
        volvalue.style.display="none"
        volval.innerHTML="Muted"

    }
    else{
        mute.style.display="none"
        volvalue.style.display="flex"
        volval.innerHTML=Math.round((Video.volume)*100);
   }
})
function toggleMute()
{
   Video.muted=!Video.muted
   if(Video.muted==true || Video.volume==0)
   {
        mute.style.display="flex"
        volvalue.style.display="none"
        vol.value="0"
        volval.innerHTML="Muted"
   }
   else{
        mute.style.display="none"
        volvalue.style.display="flex"
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
forward.addEventListener("click",()=>{skip(10)})
back.addEventListener("click",()=>{skip(-10)})
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
                skip(-10)
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
