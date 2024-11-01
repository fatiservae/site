      import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
      if (temaAtual === 'dark') {
      mermaid.initialize({ 
          'theme': 'base',
          'timeline': {'disableMulticolor': true},
          'themeVariables': {
            'primaryColor': 'transparent',
            'primaryTextColor': '#a0acb9',
            'primaryBorderColor': '#ffdead',
            'lineColor': '#ffdead',
            'secondaryColor': '#22272e',
            'tertiaryColor': 'transparent'
          }
      });
    } else {
      mermaid.initialize({ 
          'theme': 'base',
          'timeline': {'disableMulticolor': true},
          'themeVariables': {
            'primaryColor': 'transparent',
            'primaryTextColor': '#000000',
            'primaryBorderColor': 'black',
            'lineColor': '#000000',
            'secondaryColor': '#f4f4f4',
            'tertiaryColor': '#f4f4f4'
          }
      });
    } 
