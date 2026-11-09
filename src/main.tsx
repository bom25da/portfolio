import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

const container = document.getElementById('root');
if (!container) throw new Error('Portfolio root element is missing.');
const app = <StrictMode><App /></StrictMode>;

if (container.children.length > 0) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
