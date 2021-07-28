//Obs.: discordAuth.ts deleted in project, variables placed in .env = I set it to .gitignore to keep it.

// https://discord.com/api/oauth2/authorize?client_id=867023311740731452&redirect_uri=https%3A%2F%2Fauth.expo.io%2Fxplay&response_type=code&scope=identify%20email%20connections%20guilds
//C4:1.20 - values extracted from discord generated url (above) once app is created:
const REDIRECT_URI = 'https://auth.expo.io/@anonymous/xplay-c4ad912a-429c-4d63-847d-d5e5dd218ab2';
const SCOPE = 'identify%20email%20connections%20guilds';
const RESPONSE_TYPE = 'token';
const CLIENT_ID = '867023311740731452';
const CDN_IMAGE = 'https://cdn.discordapp.com';

//EXPO Lan: local environment
//EXPO Tunel: like a proxy, to expose to external environment


// services/axios.ts = https://discord.com/api

export {
    REDIRECT_URI,
    SCOPE,
    RESPONSE_TYPE,
    CLIENT_ID,
    CDN_IMAGE
}

