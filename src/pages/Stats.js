import logo from '../assets/images/logo.svg';

import { Button, Title1 } from '@fluentui/react-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { Link, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import Dashboard from './stats/Dashboard';

function Stats({redirect, stats}) {
    const queryClient = useQueryClient();
    let { topic } = useParams();

    const logout = () => {
        window.localStorage.removeItem('_token');
        redirect('/auth/login');
    }

    const pageLoadHook = () => {
        queryClient.invalidateQueries({ queryKey: ['content', topic] });
    }

    const base = (content) => {
        return (
            <div id='stats'>
                <div className='toolbar'>
                    <Title1>StreamStats</Title1>
                    <Button onClick={logout} style={{float: 'right', marginTop: '0.3rem'}}>
                        <FontAwesomeIcon icon={brands('twitch')} />
                        <span style={{paddingLeft: '10px'}}>Logout of StreamStats</span>
                    </Button>
                </div>
                <div className='flex min-h-screen'>
                    <div className='sidebar'>
                        <Link to={'/stats/dashboard'} onClick={pageLoadHook}>
                            <FontAwesomeIcon icon={solid('home')} />
                            <span style={{paddingLeft: '10px'}}>Dashboard</span>
                        </Link>
                        <Link to={'/stats/games'} onClick={pageLoadHook}>
                            <FontAwesomeIcon icon={solid('trophy')} />
                            <span style={{paddingLeft: '10px'}}>Game Metrics</span>
                        </Link>
                        <Link to={'/stats/top-1000'} onClick={pageLoadHook}>
                            <FontAwesomeIcon icon={solid('heart-circle-bolt')} />
                            <span style={{paddingLeft: '10px'}}>Top 1k Streams</span>
                        </Link>
                        <Link to={'/stats/top-100'} onClick={pageLoadHook}>
                            <FontAwesomeIcon icon={solid('bolt')} />
                            <span style={{paddingLeft: '10px'}}>Top 100 Streams</span>
                        </Link>
                    </div>
                    <div className='content'>
                        {content}
                    </div>
                </div>
            </div>
        );
    }

    const content = (topic) => {
        switch (topic) {
            case 'dashboard':
                return <Dashboard data={stats} />;
            case 'games':
                return 'games';
            case 'top-1000':
                return 'top1k';
            case 'top-100':
                return 'top1h';
            default:
                redirect('/stats/dashboard');
                return;
        }
    }

    const { isLoading, error, data } = useQuery(["content", topic], async () => {
        return content(topic);
    });

    if (isLoading) {
        return base(
            <div style={styles.loading}>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        );
    }

    return base(data);
}

const styles = {
    loading: {
        margin: '0', 
        position: 'relative', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
    }
}

export default Stats;