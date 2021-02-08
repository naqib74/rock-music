const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error =>displayError('something went wrong!! please try again later.'))

}

const displaySongs = songs => {
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML="";
    songs.forEach(song => {
        
        const songsDiv = document.createElement('div');
        songsDiv.className = "single-result row align-items-center my-3 p-3";
        songsDiv.innerHTML = `
        <div class="col-md-9">
             <h3 class="lyrics-name">${song.title}</h3>
             <p class="author lead">Album by <span>${song.artist.name}</span></p>
             <audio controls>
                <source src='${song.preview}'>
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
             <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
         </div>`
         songsContainer.appendChild(songsDiv)
        

    });
    
}

const getLyric = async (artist,title) =>{
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`
    const res =await fetch(url);
    const data=await res.json();
     displayLyrics(data.lyrics)
}

const displayLyrics = lyrics =>{
    const lyricsDiv=document.getElementById('song-lyrics');
    lyricsDiv.innerText=lyrics;
}

const displayError= error => {
    const errorMessage=document.getElementById('error-message');
    errorMessage.innerText=error;

}