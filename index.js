//Client ID def5ff19fdbc46ab85b683aefc110180
//Client Secret 88a78da6906347c1984911fb38fe4959
var redirect_uri = "http://127.0.0.1:5500/index.html";
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




function onPageLoad() {
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if (window.location.search.length > 0) {
        handleRedirect();
        search_container.style.display = "block";
        id.style.display = "none";
        audio_container.style.display = "block";


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


    player.addListener('ready', ({
        device_id
    }) => {
        console.log(`Ready with device id ${device_id}`);

        const play = ({
            spotify_uri,
            playerInstance: {
                _options: { getOAuthToken },
            },
        }) => {
            getOAuthToken((access_token) => {
                fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ uris: [spotify_uri] }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                });
            });
        };
        play({
            playerInstance: player,

            spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
        });


    });





};









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

            for (let i = 0; i < response.tracks.items.length; i++) {

                let source = [];
                let new_name = [];
                let new_artist = [];
                let songs = [];
                source[i] = response.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url;
                new_name[i] = response.tracks.items[i].data.name;
                new_artist[i] = response.tracks.items[i].data.artists.items[0].profile.name;
                songs[i] = response.tracks.items[i].data.albumOfTrack.sharingInfo.shareUrl;



                listItems += `<li>


                      <div class="new_div_content-${i}">
                      <button class="bu-${i}">
                      <audio src="${songs[i]}" type= "audio/mpeg" id="audio-${i}"></audio>
                          <div class="new_div_content_inner">
                          <img src = "${source[i]}" id="images-${i}">

                    </div>
                    <div id="item-${i}">
                        <h1 id="new_name">${new_name[i]}</h1>
                        <h2 id="artist">${new_artist[i]}</h2>
                    </div>

                    </button>
                    </div>
                </li>`



            }

            list.innerHTML = listItems;
            for (i = 0; i < response.tracks.items.length; i++) {
                const imgs = document.querySelector(`#images-${i}`);
                const name = document.querySelector(`#new_name-${i}`);
                imgs.style.height = '10vw';
                imgs.style.width = '10vw';
                imgs.style.margin = "2vw";
                imgs.style.flexBasis = "33%";


                const new_div = document.querySelector(`.bu-${i}`);
                new_div.style.height = "17vw";
                new_div.style.width = "100%";
                new_div.style.backgroundColor = "#282828";
                new_div.style.border = "none";

                const item = document.querySelector(`#item-${i}`);
                item.style.fontSize = "0.5vw";
                item.style.display = "flex";
                item.style.flexDirection = "column";
                list.style.display = "flex";
                list.style.flexWrap = "wrap";
                list.style.justifyContent = "left";
                list.style.flexDirection = "row";
                item.style.display = "flex";

                item.style.justifyContent = "center";
                item.style.alignItems = "flex-start";
                item.style.paddingLeft = "0.7vw";


                new_div.addEventListener("click", () => {
                    let audio = new Audio(`${songs[i]}`);
                    audio.play();
                })


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


button.addEventListener("click", function() {
    if (button_state === "play") {
        play.src = "pause.png";
        button_state = "pause";

    } else {
        play.src = "play.png";
        button_state = "play";

    }


})