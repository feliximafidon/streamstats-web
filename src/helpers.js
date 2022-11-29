import { Alert } from '@fluentui/react-components/unstable';

export const showAlert = (text, type, action) => {
    type = type.toLowerCase();

    if (['success', 'error', 'warning', 'info'].indexOf(type) < 0) {
        type = 'info';
    }

    return (
        <div style={{ position: 'fixed', minWidth: '300px', textAlign: 'center', top: '20px', left: '50%', transform: 'translate(-50%, 0)' }}>
            <Alert intent={type} action={action} style={{ backgroundColor: '#dbe1ed' }}>
                {text}
            </Alert>
        </div>
    );
}