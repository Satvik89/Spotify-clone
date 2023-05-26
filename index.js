//Client ID def5ff19fdbc46ab85b683aefc110180
//Client Secret 88a78da6906347c1984911fb38fe4959

var redirect_uri = "https://spotify-clone-satvik89.vercel.app/";

var client_id = "def5ff19fdbc46ab85b683aefc110180";
var client_secret = "88a78da6906347c1984911fb38fe4959";
var access_token = null;
const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";

const search = document.querySelector("#search");
const input = document.querySelector("#input");
const image = document.querySelector(".image");
const images = document.querySelector(".new_div_content_inner");
const id = document.querySelector(".ID");
const list = document.querySelector("#lists");

const audio_container = document.querySelector(".audio-container");
const search_container = document.querySelector(".search");
const button = document.querySelector(".btn-play");
var play = document.querySelector(".play");
var button_state = "play";
const bu = document.querySelectorAll(".bu");
const song_name = document.querySelector(".audio-track-name");
const artist_name = document.querySelector(".audio-artist-name");
const next = document.querySelector(".btn-next");
const prev = document.querySelector(".btn-prev");
const logo = document.querySelector("#logo");
const song_image = document.querySelector("#song-image");
const lyrics_container = document.querySelector(".song_lyrics");
const lyrics = document.querySelector("#song_lyrics");
const song_container = document.querySelector(".song-container");


logo.addEventListener("click", () => {

    list.style.display = "block";
    image.style.display = "none";
    lyrics_container.style.display="none";
    lyrics.style.display="none";

    for (i = 0; i < 9; i++) {
        const imgs = document.querySelector(`#images-${i}`);
        const name = document.querySelector(`#new_name-${i}`);
        const artist = document.querySelector(`#artist-${i}`);

        imgs.style.height = '10vw';
        imgs.style.width = '10vw';
        imgs.style.margin = "2vw";
        imgs.style.flexBasis = "33%";


        const new_div = document.querySelector(`.bu-${i}`);
        new_div.style.height = "17vw";
        new_div.style.width = "100%";
        new_div.style.backgroundColor = "#282828";
        new_div.style.border = "none";
        new_div.style.justifyContent = "space-around";


        const item = document.querySelector(`#item-${i}`);
        item.style.fontSize = "0.5vw";
        item.style.display = "flex";
        item.style.flexDirection = "column";
        list.style.display = "flex";
        list.style.flexWrap = "wrap";
        list.style.justifyContent = "left";
        list.style.flexDirection = "row";

        item.style.justifyContent = "center";
        item.style.display = "flex";
        item.style.justifyContent = "center";
        item.style.alignItems = "flex-start";
        item.style.paddingLeft = "0.7vw";
        if (window.innerWidth < 768) {
            new_div.style.height = "170px";
            item.style.fontSize = "4.1px";
            item.style.textAlign = "right";
            item.style.paddingLeft = "3.2px";
            imgs.style.height = '100px';
            imgs.style.width = '100px';
            imgs.style.margin = "20px";
            imgs.style.objectFit = "cover";
            name.style.fontSize = "12px";
            new_div.style.justifyContent = "left";
            artist.style.fontSize = "7px";
            list.style.flexDirection = "column";
            new_div.style.display = "flex";
            new_div.style.justifyContent = "left";
            new_div.style.alignItems = "center";
            new_div.style.outline = "none";
            imgs.style.margin = "35px";



        }
    }

})

function foo() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6fa4163ff2mshf9541c1eb49ead8p1b845bjsn1ce68d75cd5c',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    fetch(`https://spotify23.p.rapidapi.com/search/?q=one&type=multi&offset=0&limit=10&numberOfTopResults=5`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let listItems = "";
            var source = [];
            var new_name = [];
            var new_artist = [];
            var songs = [];

            for (let i = 0; i < response.tracks.items.length; i++) {


                source[i] = response.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url;
                new_name[i] = response.tracks.items[i].data.name;
                new_artist[i] = response.tracks.items[i].data.artists.items[0].profile.name;
                songs[i] = response.tracks.items[i].data.uri;
                // songs[i] = response.tracks.items[i].data.albumOfTrack.sharingInfo.shareUrl;
                id[i] = response.tracks.items[i].data.id;



                listItems += `<li>


                      <div class="new_div_content-${i}">
                      <button class="bu-${i}" onclick="music('${songs[i]}','${new_name[i]}','${new_artist[i]}','${id[i]}','${source[i]}',${i})">
                     
                          <div class="new_div_content_inner">
                          <img src = "${source[i]}" id="images-${i}">

                    </div>
                    <div id="item-${i}">
                        <h1 id="new_name-${i}">${new_name[i]}</h1>
                        <h2 id="artist-${i}">${new_artist[i]}</h2>
                    </div>

                    </button>
                    </div>
                </li>`




            }


            list.innerHTML = listItems;
            list.style.display = "block";
            image.style.display = "none";
            prev.addEventListener("click", () => {
                console.log("clicked");
                let spotify_uri = localStorage.getItem("spotify_uri");
                console.log(songs[1]);

                let i = localStorage.getItem("i");

                if (spotify_uri == undefined || i == 0) {

                    music(`${songs[9]}`, `${new_name[9]}`, `${new_artist[9]}`, `${id[9]}`, `${source[9]}`, 9);
                } else {
                    let z = localStorage.getItem("i");
                    let x = parseInt(z);
                    let y = x - 1;
                    music(`${songs[y]}`, `${ new_name[y]}`, `${ new_artist[y]}`, `${id[y]}`, `${source[y]}`, y);

                }
            })
            next.addEventListener("click", () => {
                console.log("clicked");
                let spotify_uri = localStorage.getItem("spotify_uri");
                console.log(songs[1]);
                let i = localStorage.getItem("i");
                console.log(i);

                if (spotify_uri == undefined || i == 9) {

                    music(`${songs[0]}`, `${new_name[0]}`, `${new_artist[0]}`, `${id[0]}`, `${source[0]}`, 0);
                } else {
                    let z = localStorage.getItem("i");
                    let x = parseInt(z);
                    let y = x + 1;
                    music(`${songs[y]}`, `${ new_name[y]}`, `${ new_artist[y]}`, `${id[y]}`, `${source[y]}`, y);

                }
            })

            for (i = 0; i < response.tracks.items.length; i++) {
                const imgs = document.querySelector(`#images-${i}`);
                const name = document.querySelector(`#new_name-${i}`);
                const artist = document.querySelector(`#artist-${i}`);

                imgs.style.height = '10vw';
                imgs.style.width = '10vw';
                imgs.style.margin = "2vw";
                imgs.style.flexBasis = "33%";


                const new_div = document.querySelector(`.bu-${i}`);
                new_div.style.height = "17vw";
                new_div.style.width = "100%";
                new_div.style.backgroundColor = "#282828";
                new_div.style.border = "none";
                new_div.style.justifyContent = "space-around";


                const item = document.querySelector(`#item-${i}`);
                item.style.fontSize = "0.5vw";
                item.style.display = "flex";
                item.style.flexDirection = "column";
                list.style.display = "flex";
                list.style.flexWrap = "wrap";
                list.style.justifyContent = "left";
                list.style.flexDirection = "row";

                item.style.justifyContent = "center";
                item.style.display = "flex";
                item.style.justifyContent = "center";
                item.style.alignItems = "flex-start";
                item.style.paddingLeft = "0.7vw";
                if (window.innerWidth < 768) {
                    new_div.style.height = "170px";
                    item.style.fontSize = "4.1px";
                    item.style.textAlign = "right";
                    item.style.paddingLeft = "3.2px";
                    imgs.style.height = '100px';
                    imgs.style.width = '100px';
                    imgs.style.margin = "20px";
                    imgs.style.objectFit = "cover";
                    name.style.fontSize = "12px";
                    new_div.style.justifyContent = "left";
                    artist.style.fontSize = "7px";
                    list.style.flexDirection = "column";
                    new_div.style.display = "flex";
                    new_div.style.justifyContent = "left";
                    new_div.style.alignItems = "center";
                    new_div.style.outline = "none";
                    imgs.style.margin = "35px";



                }

            }
        })

    .catch(err => console.error(err));

}


function onPageLoad() {
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if (window.location.search.length > 0) {
        handleRedirect();
        search_container.style.display = "block";
        id.style.display = "none";
        audio_container.style.display = "block";

        foo();


    }
}

function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri); // remove param from url
}

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}


function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}


function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function requestAuthorization() {
    client_id = document.getElementById("clientId").value;
    client_secret = document.getElementById("secretId").value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}
document.querySelector("#secretId").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        requestAuthorization();
    }
})

function handleAuthorizationResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if (data.access_token != undefined) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);

        }
        onPageLoad();
    } else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}




window.onSpotifyWebPlaybackSDKReady = () => {
    const token = localStorage.getItem("access_token");


    console.log(token);
    let player = new Spotify.Player({
        name: 'Echo',
        getOAuthToken: cb => {
            cb(token);
        },
        volume: 0.9
    });

    player.addListener('initialization_error', ({
        message
    }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({
        message
    }) => {
        console.error(message);
    });

    player.addListener('account_error', ({
        message
    }) => {
        console.error(message);
    });
    player.connect().then(success => {
        if (success) {
            console.log('The Web Playback SDK successfully connected to Spotify!');
        }
    });


    // player.addListener('ready', ({
    //     device_id
    // }) => {
    //     console.log(`Ready with device id ${device_id}`);





    //     const uri = localStorage.getItem(`spotify_uri`);

    //     const play = ({
    //         spotify_uri,
    //         playerInstance: {
    //             _options: { getOAuthToken },
    //         },
    //     }) => {
    //         getOAuthToken((access_token) => {
    //             fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
    //                 method: 'PUT',
    //                 body: JSON.stringify({ uris: [spotify_uri] }),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${access_token}`,
    //                 },
    //             });
    //         });
    //     };



    //     play({
    //         playerInstance: player,

    //         spotify_uri: uri,
    //     });
    // })

    button.addEventListener("click", function() {
        if (button_state === "play") {
            play.src = "pause.png";
            button_state = "pause";
            player.pause().then(() => {
                console.log('Paused!');
            });

        } else {
            play.src = "play.png";
            button_state = "play";
            player.resume().then(() => {
                console.log('Resumed!');
            });

        }


    })

};




function music(song_uri, name, artist, id, source, i) {
    let lyric_array = "";

    console.log(song_uri);
    localStorage.setItem("spotify_uri", song_uri);
    localStorage.setItem("i", i);
    localStorage.setItem("id", id);
    localStorage.setItem("image_source", source);
    const token = localStorage.getItem("access_token");

    fetch("https://api.spotify.com/v1/me/player/play", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                uris: [song_uri],
            }),
        })
        .then((response) => {
            console.log("Music started playing");
            console.log(response);
        })
        .catch((error) => {
            console.error("Error starting music playback:", error);
        });
    song_name.innerText = name;
    artist_name.innerText = artist;
    let x = localStorage.getItem("id");

    let y = localStorage.getItem("image_source");

    list.style.display = "none";
    image.style.display = "block";
    lyrics.style.display = "block";
    song_container.style.display="block";
    lyrics_container.style.display="block";
    

    song_image.src = `${y}`


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6fa4163ff2mshf9541c1eb49ead8p1b845bjsn1ce68d75cd5c',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
    };

    fetch(`https://spotify81.p.rapidapi.com/track_lyrics?id=${x}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            for (i = 0; i < response.lyrics.lines.length; i++) {
                lyric_array += response.lyrics.lines[i].words + "<br>";
            }
            lyrics.innerHTML = lyric_array;
            console.log(lyric_array);

        })
        .catch(err => {console.error(err)
            lyrics.innerHTML="";
            lyrics.innerHTML="No Lyrics Found";
        
        });


    // fetch('https://spotify81.p.rapidapi.com/track_lyrics?id=7nORGrTd2dDP38JC0YfZ4W', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
}




function fetchfunction() {
    const x = input.value;
    input.value = "";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6fa4163ff2mshf9541c1eb49ead8p1b845bjsn1ce68d75cd5c',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    fetch(`https://spotify23.p.rapidapi.com/search/?q=${x}&type=multi&offset=0&limit=10&numberOfTopResults=5`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let listItems = "";
            var source = [];
            var new_name = [];
            var new_artist = [];
            var songs = [];
            var id = [];

            for (let i = 0; i < response.tracks.items.length; i++) {


                source[i] = response.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url;
                new_name[i] = response.tracks.items[i].data.name;
                new_artist[i] = response.tracks.items[i].data.artists.items[0].profile.name;
                songs[i] = response.tracks.items[i].data.uri;
                // songs[i] = response.tracks.items[i].data.albumOfTrack.sharingInfo.shareUrl;
                id[i] = response.tracks.items[i].data.id;



                listItems += `<li>


                      <div class="new_div_content-${i}">
                      <button class="bu-${i}" onclick="music('${songs[i]}','${new_name[i]}','${new_artist[i]}','${id[i]}','${source[i]}',${i})">
                     
                          <div class="new_div_content_inner">
                          <img src = "${source[i]}" id="images-${i}">

                    </div>
                    <div id="item-${i}">
                        <h1 id="new_name-${i}">${new_name[i]}</h1>
                        <h2 id="artist-${i}">${new_artist[i]}</h2>
                    </div>

                    </button>
                    </div>
                </li>`




            }


            list.innerHTML = listItems;
            list.style.display = "block";
            image.style.display = "none";
            lyrics_container.style.display="none";
            lyrics.style.display="none";
            const a = document.querySelector(".bu-1");
            a.addEventListener("click", () => {
                console.log("superman");
            })
           
           
            
            prev.addEventListener("click", () => {
                console.log("clicked");
                let spotify_uri = localStorage.getItem("spotify_uri");
                console.log(songs[1]);
                
                let i = localStorage.getItem("i");
                if (spotify_uri == undefined || i == 0) {

                    music(`${songs[9]}`, `${new_name[9]}`, `${new_artist[9]}`, `${id[9]}`, `${source[9]}`, 9);
                } else {
                  
                    let x = parseInt(i);
                    console.log(x);
                    x--;
                    music(`${songs[x]}`, `${ new_name[x]}`, `${ new_artist[x]}`, `${id[x]}`, `${source[x]}`, x);

                }
            })
            next.addEventListener("click", () => {
                console.log("clicked");
                let spotify_uri = localStorage.getItem("spotify_uri");
                console.log(songs[1]);
                let i = localStorage.getItem("i");

               
                if (spotify_uri == undefined || i == 9) {

                    music(`${songs[0]}`, `${new_name[0]}`, `${new_artist[0]}`, `${id[0]}`, `${source[0]}`, 0);
                } else {
                  
                    let x = parseInt(i);
                    console.log(x);
                   x++;
                    music(`${songs[x]}`, `${ new_name[x]}`, `${ new_artist[x]}`, `${id[x]}`, `${source[x]}`, x);

                }
            })



            for (i = 0; i < response.tracks.items.length; i++) {
                const imgs = document.querySelector(`#images-${i}`);
                const name = document.querySelector(`#new_name-${i}`);
                const artist = document.querySelector(`#artist-${i}`);

                imgs.style.height = '10vw';
                imgs.style.width = '10vw';
                imgs.style.margin = "2vw";
                imgs.style.flexBasis = "33%";


                const new_div = document.querySelector(`.bu-${i}`);
                new_div.style.height = "17vw";
                new_div.style.width = "100%";
                new_div.style.backgroundColor = "#282828";
                new_div.style.border = "none";
                new_div.style.justifyContent = "space-around";


                const item = document.querySelector(`#item-${i}`);
                item.style.fontSize = "0.5vw";
                item.style.display = "flex";
                item.style.flexDirection = "column";
                list.style.display = "flex";
                list.style.flexWrap = "wrap";
                list.style.justifyContent = "left";
                list.style.flexDirection = "row";

                item.style.justifyContent = "center";
                item.style.display = "flex";
                item.style.justifyContent = "center";
                item.style.alignItems = "flex-start";
                item.style.paddingLeft = "0.7vw";
                if (window.innerWidth < 768) {
                    new_div.style.height = "170px";
                    item.style.fontSize = "4.1px";
                    item.style.textAlign = "right";
                    item.style.paddingLeft = "3.2px";
                    imgs.style.height = '100px';
                    imgs.style.width = '100px';
                    imgs.style.margin = "20px";
                    imgs.style.objectFit = "cover";
                    name.style.fontSize = "12px";
                    new_div.style.justifyContent = "left";
                    artist.style.fontSize = "7px";
                    list.style.flexDirection = "column";
                    new_div.style.display = "flex";
                    new_div.style.justifyContent = "left";
                    new_div.style.alignItems = "center";
                    new_div.style.outline = "none";
                    imgs.style.margin = "35px";



                }

            }
        })

    .catch(err => console.error(err));
}


search.addEventListener("click", function() {
    console.log("foo");
    fetchfunction();
    console.log("working");
})
input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        fetchfunction();
    }
})