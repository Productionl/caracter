import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import FeralGradient from './FeralGradient.jsx';

var el = document.querySelector('.site-bg');
if (el) {
  createRoot(el).render(
    createElement(FeralGradient, {
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        aspectRatio: 'auto',
      },
    })
  );
}
