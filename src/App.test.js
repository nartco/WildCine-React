import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import NavBar from './components/Navbar';
import Footer from './components/footer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
        <Provider store={Store}>
            <NavBar />
            <App />
            <Footer />
        </Provider>
    </MemoryRouter>,div);
  ReactDOM.unmountComponentAtNode(div);
});
