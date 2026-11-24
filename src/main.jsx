import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/variables.css';
import './styles/shared.css';
import './styles/Navbar.css';
import './styles/Hero.css';
import './styles/Story.css';
import './styles/Menu.css';
import './styles/ImmersiveMenu.css';
import './styles/Branches.css';
import './styles/Reviews.css';
import './styles/FunctionOrders.css';
import './styles/Contact.css';
import './styles/Footer.css';
import './styles/Polish.css';
import './styles/ImmersiveExperience.css';

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
