import { useContext } from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../context';
import { showAlert } from '../helpers';

function Layout({...props}) {
  const {alert, setAlert} = useContext(AppContext);
  const alertContent = alert ? showAlert(
    alert.message, 
    alert.type, 
    {
      icon: <FontAwesomeIcon icon={solid('close')} onClick={() => { setAlert(''); }} />,
    }
  ) : null;

  return (
    <>
      {alertContent}
      <div className="App">
        {props.children}
      </div>
    </>
  );
}

export default Layout;
