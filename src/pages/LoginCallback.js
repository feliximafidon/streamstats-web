import '../App.css';

import AES from 'crypto-js/aes';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8'

function LoginCallback() {
    let url = '/auth/login?error=' + encodeURI('Could not complete login. Please try again.');

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const key = process.env.REACT_APP_KEY + urlParams.get('nonce');

        const tokenObj = JSON.parse(atob(token)); 
        const accessToken = AES.decrypt(tokenObj.value, Base64.parse(btoa(key)), { iv: Base64.parse(tokenObj.iv) }).toString(Utf8);

        if (accessToken.length) {
            window.localStorage.setItem('_token', accessToken);
            url = '/stats';
        } else {
            throw 'Login failed';
        }
    } catch (e) {
        // 
    }

    window.location.href = url;
    return <div>Redirecting... <a href="{url}">Click here</a> if you are redirected in a few seconds.</div>
}

export default LoginCallback;
