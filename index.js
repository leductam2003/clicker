import CryptoJS from 'crypto-js';
import axios from 'axios';
let secretKey = "HJNzsFzqJaxE8jA3tE3fTLNVtkG";
//https://t.me/userinfobot 在这里获取你的telegram ID 例如：1069874033
const telegramId = '';
const amount = 1000000;


const encrypt = (e) => {
    let t = JSON.stringify({
        input: e,
        timestamp: Date.now()
    });
    return CryptoJS.AES.encrypt(t, secretKey).toString();
}
let data = JSON.stringify({
    "telegramId": encrypt(telegramId),
    "amount": encrypt('1')
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://memechan-clicker-webapp.vercel.app/api/users/balance',
    headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'content-type': 'application/json',
        'origin': 'https://memechan-clicker-webapp.vercel.app',
        'priority': 'u=1, i',
        'referer': 'https://memechan-clicker-webapp.vercel.app/',
        'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    },
    data: data
};
async function clicker() {
    for (let i = 0; i < amount; i++) {
        await axios.request(config)
        .then((response) => {
            console.log(`[${i + 1}/ ${amount}]`, JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

clicker()
