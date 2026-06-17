
let currentSong = new Audio() ;

let songs ;
let currFolder ;
let albumsData = null ;

// convert second to min
function formatTime(seconds) {
    if(isNaN(seconds) || seconds<0){
        return "00:00"
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


// it return an array of songs from the JSON manifest
async function getSongs(folder) {

    currFolder = folder ;

    // load albums data if not already loaded
    if(!albumsData){
        let a = await fetch("songs/songs.json") ;
        albumsData = await a.json() ;
    }

    // find the matching album by folder name
    let folderName = folder.split("/").pop() ;
    let album = albumsData.albums.find(a => a.folder === folderName) ;

    songs = album ? album.songs : [] ;
    
    // show all the songs in the playlist
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0] ;
    songUl.innerHTML = "" ;

    for(let song of songs){
        songUl.innerHTML = songUl.innerHTML + `<li>
                    <img class="invert" src="img/music.svg" alt="music">
                    <div class="info">
                        <div>${song.replaceAll(".mpeg" , "")}</div>
                        <div>Song artist</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img class="invert" src="img/play.svg" alt="">
                    </div>
            </li>` ;
    }

    // attach an event listner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click" , e =>{
            playMusic(li.querySelector(".info").firstElementChild.innerHTML.trim() + ".mpeg") ;
        });
    }) ;

    return songs ;

}

const playMusic = (track , pause=false) => {
    // let audio = new Audio("songs/" + track) ;
    currentSong.src = `${currFolder}/` + encodeURIComponent(track) ;

    if(!pause){
        currentSong.play() ;
        play.src = "img/pause.svg" ;
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track) ;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00" ;

}

async function displayAlbums() {

    // load albums data if not already loaded
    if(!albumsData){
        let a = await fetch("songs/songs.json") ;
        albumsData = await a.json() ;
    }

    let cardContainer = document.querySelector(".cardContainer") ;

    for(let album of albumsData.albums){

        let folder = album.folder ;

        cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">  
                    <div class="play">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                        <circle cx="24" cy="24" r="24" fill="#22c55e"/>
                        <g transform="translate(12, 12)">
                        <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" fill="black" stroke="black" stroke-width="1.5" stroke-linejoin="round"/>
                        </g>
                        </svg>
                    </div>
                    <img src="songs/${encodeURIComponent(folder)}/cover.jpg" alt="song">
                    <h2>${album.title}</h2>
                    <p>${album.description}</p>
                </div>`

    }

    // load playlist when card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click" , async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`) ;
            playMusic(songs[0]) ;
        })
    });

}


async function main(){


    // store list of all the song in songs
    await getSongs("songs/HollyWood") ;
    playMusic(songs[0] , true) ;

    // display all the albums on the page 
    displayAlbums() ;

    // attach event listner to prev pplay and next
    play.addEventListener("click" , () => {
        if(currentSong.paused){
            currentSong.play() ;
            play.src = "img/pause.svg" ;
        }
        else{
            currentSong.pause() ;
            play.src = "img/play.svg" ;
        }
    }) ;

    // listen for time update event
    currentSong.addEventListener("timeupdate" , () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`
        
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) *100 + "%" ; 
    }) ;


    // add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click" , e => {
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100 ;
        document.querySelector(".circle").style.left = percent + "%" ;
        currentSong.currentTime = ((currentSong.duration)* percent)/100 ;
    })

    // Add event listener to hamburger
    document.querySelector(".hamburger").addEventListener("click" , () => {
        document.querySelector(".left").style.left = "0" ;
    });

    // Add event listener to close
    document.querySelector(".close").addEventListener("click" , () => {
        document.querySelector(".left").style.left = "-120%" ;
    });

    // add event listener to prev AND NEXT
    previous.addEventListener("click" , () => {
        let index = songs.indexOf(decodeURIComponent(currentSong.src.split("/").slice(-1)[0])) ;
        if(index-1 >= 0){
            playMusic( songs[index-1]) ;
        }
    }) ;

    next.addEventListener("click" , () => {
        let index = songs.indexOf(decodeURIComponent(currentSong.src.split("/").slice(-1)[0])) ;
        if(index+1 < songs.length){
            playMusic( songs[index+1]) ;
        }
    }) ;

    // add event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change" ,(e) => {
        currentSong.volume = parseInt(e.target.value)/100 ;
        if(currentSong.volume > 0){
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("img/mute.svg" , "img/volume.svg") ;
        }
    });

    // Add event listner to mute the track
    document.querySelector(".volume>img").addEventListener("click" , e => {
        if(e.target.src.includes("img/volume.svg")){
            e.target.src = e.target.src.replace("img/volume.svg" , "img/mute.svg") ;
            currentSong.volume = 0 ;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0
        }
        else{
            currentSong.Volume = .1 ;
            e.target.src = e.target.src.replace("img/mute.svg" , "img/volume.svg") ;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10 ;
            currentSong.volume = 0.1 ;
        }
    });


}

main() ;
