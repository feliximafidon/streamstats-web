import '../App.css';

function Layout(props) {
  return (
    <div className="App">
      {props.children}
    </div>
  );
}

export default Layout;
