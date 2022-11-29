import '../App.css';
import { Button, LargeTitle, makeStyles, Subtitle2 } from '@fluentui/react-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

function Login({redirect}) {
    const login = () => { 
        redirect(process.env.REACT_APP_API_ROOT + '/auth/login/twitch'); 
    }

    return (
        <div>
            <div style={styles.loginForm}>
                <div style={{marginTop: '30px'}}>
                    <LargeTitle>StreamStats</LargeTitle>
                </div>
                <div style={{marginTop: '60px', marginBottom: '120px'}}>
                    <Subtitle2>Welcome to StreamStats.<br />Kindly login below.</Subtitle2>
                </div>
                <div>
                    <Button appearance="primary" iconProps={{ iconName: 'twitch' }} onClick={login}>
                    <FontAwesomeIcon icon={brands('twitch')} />
                        <span style={{paddingLeft: '10px'}}>Login with Twitch</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    loginForm: {
        borderRadius: '15px', 
        margin: '0', 
        padding: '30px', 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        border: '1px solid',
        minWidth: '300px',
        minHeight: '400px',
        borderColor: '#e1dfdd',
    }
};

export default Login;