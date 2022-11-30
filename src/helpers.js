import { Alert } from '@fluentui/react-components/unstable';

export const injectNumberFunctions = () => {
    if (typeof Number.prototype.format === 'undefined') {
        Number.prototype.format = function (precision) {
            if (!isFinite(this)) {
                return this.toString();
            }
    
            var a = this.toFixed(precision).split('.');
            a[0] = a[0].replace(/\d(?=(\d{3})+$)/g, '$&,');
            return a.join('.');
        }
    }
}

export const showAlert = (text, type, action, style) => {
    type = type.toLowerCase();

    if (['success', 'error', 'warning', 'info'].indexOf(type) < 0) {
        type = 'info';
    }

    if (! style) {
        style = {}
    }

    return (
        <div style={{ position: 'fixed', minWidth: '300px', textAlign: 'center', top: '20px', left: '50%', transform: 'translate(-50%, 0)' }}>
            <Alert intent={type} action={action ? action : () => { }} style={{ backgroundColor: '#dbe1ed', ...style }}>
                {text}
            </Alert>
        </div>
    );
}