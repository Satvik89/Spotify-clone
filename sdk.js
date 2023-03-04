window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQByzBr_xTke60Z6LME8nEAglJXHXoK26N8aC7lUBrLiMyzUo8_ehJ4fqC63XmAAsxMBqXAy7Y3zeRpH3leJ-owYK4nOTP2dYbn-yW1yaAlLFlb7OZLUmAf_j56BF9dCps0npN_LTfp-ftk0O6b2khvkkcDoKeVXYjE5cnmlqU-Vnhkb0bignvqnl3fIVrKiN4EubwVh_KYJqxmiLpz1qOdUDs11';
    let player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
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

    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);

    });

    setTimeout(() => {
        player.getCurrentState().then(state => {
            if (!state) {
                console.error('Player is not ready');
                return;
            }
            console.log('Active device:', state.device);
        });
        player.addListener('not_ready', ({
            device_id
        }) => {
            console.log('Device ID has gone offline', device_id);
        });
    }, 20000)


    player.connect().then(success => {
        if (success) {
            console.log('The Web Playback SDK successfully connected to Spotify!');
        }
    });


}