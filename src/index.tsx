import React from 'react';
import ReactDOM, {Container} from 'react-dom/client';
const App: React.FC = ()=>{
    const a: string = 'world';
    return <div>Hello world! {a}</div>;
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as Container
);

root.render(<App/>);
