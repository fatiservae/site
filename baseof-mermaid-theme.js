const rootStyles = getComputedStyle(document.documentElement);
const backgroundColor = rootStyles.getPropertyValue("--backgroundColor").trim();
const borderColor = rootStyles.getPropertyValue("--headingsColor").trim();
const fontColor = rootStyles.getPropertyValue("--fontColor").trim();

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

if (temaAtual === 'dark') {
  mermaid.initialize({ 
    'theme': 'base',
    'timeline': {'disableMulticolor': true},
    'themeVariables': {
      'primaryColor': 'transparent',
      'primaryTextColor': fontColor,
      'primaryBorderColor': borderColor,
      'lineColor': borderColor,
      'secondaryColor': backgroundColor,
      'tertiaryColor': 'transparent'
    }
  });
} else {
  mermaid.initialize({ 
    'theme': 'base',
    'timeline': {'disableMulticolor': true},
    'themeVariables': {
      'primaryColor': 'transparent',
      'primaryTextColor': fontColor,
      'primaryBorderColor': borderColor,
      'lineColor': borderColor,
      'secondaryColor': backgroundColor,
      'tertiaryColor': 'transparent'
    }
  });
} 
