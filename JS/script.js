    console.log("Welcome to Spotify");


//Initialize Variables
let songIndex=0;
let audioElement=new Audio('songs/4.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems= Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:'Salam-E-Ishq',coverPath:"covers/1.jpg",filePath:"songs/1.mp3"},
    {songName:'O-Re Piya',coverPath:"covers/2.jpg",filePath:"songs/2.mp3"},
    {songName:'Baadshaho',coverPath:'covers/3.jpg',filePath:'songs/3.mp3'},
    {songName:'Dil Ghalti Kar Betha hai',coverPath:'covers/4.jpg',filePath:'songs/4.mp3'},
    {songName:'Galliyan Returns',coverPath:'covers/5.jpg',filePath:'songs/5.mp3'},
    {songName:'I am Ready',coverPath:'covers/6.jpg',filePath:'songs/6.mp3'},
    {songName:'Phir Milenge',coverPath:'covers/7.jpg',filePath:'songs/7.mp3'},
]   

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterSongName.innerText=songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate', ()=> {
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);//in %
    myProgressBar.value=progress;//in %
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        
        //target targets the clicked element
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6)
    {
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})

document.getElementById('prev').addEventListener('click', ()=>{
    if(songIndex<=0)
    {
        songIndex=6;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})