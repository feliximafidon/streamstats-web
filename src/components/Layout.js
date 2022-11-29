import '../App.css';
import { showAlert } from '../helpers';

function Layout({alert, ...props}) {
  const alertContent = alert ? showAlert(alert.message, alert.type, alert.action) : null;
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
