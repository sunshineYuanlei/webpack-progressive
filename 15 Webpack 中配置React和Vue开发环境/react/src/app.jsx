import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    return (
        <div>
            <h1>Hello React and Webpack</h1>
        </div>
    );
};

export default App;

ReactDOM.createRoot(
  document.getElementById('app')
).render(<App/>);