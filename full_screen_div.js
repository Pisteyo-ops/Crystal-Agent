(function() {
    'use strict';
    
    // Create and inject styles
    const style = document.createElement('style');
    style.textContent = `
        html,
        body {
            height: 100%;
            margin: 0;
        }

        #bp-embedded-webchat {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
        }
    `;
    document.head.appendChild(style);
    
    // Create webchat container
    const webchatDiv = document.createElement('div');
    webchatDiv.id = 'bp-embedded-webchat';
    document.body.appendChild(webchatDiv);
    
    console.log('Webchat container and styles injected');
})();
