(function () {
    'use strict';

    // Configuration
    const config = {
        botpressWebchatUrl: 'https://cdn.botpress.cloud/webchat/v3.5/inject.js',
        botpressConfigUrl: 'https://pisteyo-ops.github.io/Crystal-Agent/HASA.js',
        botLogoUrl: 'animaged-crystal.png', // You can override this when initializing
        botName: 'Crystal',
        popupMessage: 'Have a Question? I can help!',
        popupDelay: 10000 // 10 seconds
    };

    // Inject CSS
    function injectStyles() {
        const styles = `
            * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
            .crystal-widget-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background: transparent;
                border-radius: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: none;
                transition: transform 0.3s ease;
                z-index: 1001;
                border: none;
            }

            .crystal-widget-button:hover {
                transform: scale(1.1);
                box-shadow: none;
            }

            .crystal-widget-button img {
                width: 60px;
                height: 60px;
                transition: opacity 0.3s ease;
                border-radius: 0;
            }

            .crystal-widget-button .crystal-chat-gif {
                position: absolute;
                opacity: 1;
            }

            .crystal-widget-button .crystal-close-icon {
                position: absolute;
                opacity: 0;
                fill: #87CEEB;
                width: 50px;
                height: 50px;
            }

            .crystal-widget-button.active .crystal-chat-gif {
                opacity: 0;
            }

            .crystal-widget-button.active .crystal-close-icon {
                opacity: 1;
            }

            .crystal-popup-notification {
                position: fixed;
                bottom: 90px;
                right: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                padding: 15px;
                display: flex;
                align-items: flex-start;
                gap: 12px;
                max-width: 320px;
                z-index: 1002;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                transition: all 0.3s ease;
            }

            .crystal-popup-notification.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .crystal-popup-notification.hide {
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
            }

            .crystal-popup-logo {
                width: 45px;
                height: 45px;
                flex-shrink: 0;
                border-radius: 8px;
            }

            .crystal-popup-content {
                flex: 1;
            }

            .crystal-popup-content h3 {
                margin: 0 0 5px 0;
                font-size: 16px;
                font-weight: bold;
                color: #2c3e50;
            }

            .crystal-popup-content p {
                margin: 0;
                font-size: 14px;
                color: #555;
                line-height: 1.4;
            }

            .crystal-popup-close {
                cursor: pointer;
                color: #999;
                font-size: 20px;
                line-height: 1;
                padding: 0 5px;
                flex-shrink: 0;
            }

            .crystal-popup-close:hover {
                color: #333;
            }

            .crystal-chat-container {
                position: fixed;
                background: white;
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
                border-radius: 12px;
                overflow: hidden;
                z-index: 1000;
                transition: all 0.3s ease;
                opacity: 0;
                visibility: hidden;
                transform: scale(0.9);
            }

            .crystal-chat-container.active {
                display: flex;
                flex-direction: column;
                opacity: 1;
                visibility: visible;
                transform: scale(1);
            }

            @media (min-width: 769px) {
                .crystal-chat-container {
                    bottom: 100px;
                    right: 20px;
                    width: 25vw;
                    height: 85vh;
                    min-width: 350px;
                }
            }

            @media (max-width: 768px) {
                .crystal-widget-button {
                    bottom: 15px;
                    right: 15px;
                    width: 50px;
                    height: 50px;
                }

                .crystal-widget-button img {
                    width: 50px;
                    height: 50px;
                }

                .crystal-widget-button .crystal-close-icon {
                    width: 30px;
                    height: 30px;
                }

                .crystal-chat-container {
                    bottom: 80px;
                    right: 10px;
                    left: 10px;
                    width: calc(100vw - 10px);
                    height: calc(100vh - 20vh);
                    border-radius: 12px;
                    margin: 0;
                }

                .crystal-popup-notification {
                    bottom: 75px;
                    right: 10px;
                    left: 10px;
                    max-width: calc(100vw - 20px);
                }

                .crystal-popup-logo {
                    width: 40px;
                    height: 40px;
                }

                .crystal-popup-content h3 {
                    font-size: 15px;
                }

                .crystal-popup-content p {
                    font-size: 13px;
                }
            }

            .crystal-chat-content {
                flex: 1;
                overflow-y: auto;
                overflow-x: hidden;
                position: relative;
            }

            .crystal-chat-content:hover {
                overscroll-behavior: contain;
            }

            #testing {
                width: 100%;
                height: 100%;
                border: none;
            }

            body.crystal-chat-active {
                overflow: hidden;
            }

            @media (min-width: 769px) {
                body.crystal-chat-active {
                    overflow: auto;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Inject HTML
    function injectHTML() {
        const html = `
            <!-- Widget Button -->
            <div class="crystal-widget-button" id="crystalWidgetButton">
                <img class="crystal-chat-gif" src="${config.botLogoUrl}" alt="Chat">
                <svg class="crystal-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </div>

            <!-- Popup Notification -->
            <div class="crystal-popup-notification" id="crystalPopupNotification">
                <img class="crystal-popup-logo" src="${config.botLogoUrl}" alt="${config.botName}">
                <div class="crystal-popup-content">
                    <h3>${config.botName}</h3>
                    <p>${config.popupMessage}</p>
                </div>
                <span class="crystal-popup-close" id="crystalPopupClose">&times;</span>
            </div>

            <!-- Chat Container -->
            <div class="crystal-chat-container" id="crystalChatContainer">
                <div class="crystal-chat-content" id="crystalChatContent">
                    <div id="testing"></div>
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);
    }

    // Load Botpress scripts
    // Load Botpress scripts (guaranteed order)
    function loadBotpressScripts() {
        return new Promise((resolve, reject) => {
            // 1) Load webchat inject script FIRST
            const webchatScript = document.createElement('script');
            webchatScript.src = config.botpressWebchatUrl;
            webchatScript.async = false; // important: preserve execution order
            webchatScript.onload = () => {
                // 2) Then load your bot configuration script
                const configScript = document.createElement('script');
                configScript.src = config.botpressConfigUrl;
                configScript.async = false; // important
                configScript.onload = resolve;
                configScript.onerror = reject;
                document.head.appendChild(configScript);
            };
            webchatScript.onerror = reject;
            document.head.appendChild(webchatScript);
        });
    }


    // Initialize widget functionality
    function initializeWidget() {
        const widgetButton = document.getElementById('crystalWidgetButton');
        const chatContainer = document.getElementById('crystalChatContainer');
        const chatContent = document.getElementById('crystalChatContent');
        const popupNotification = document.getElementById('crystalPopupNotification');
        const popupClose = document.getElementById('crystalPopupClose');

        // Show popup after configured delay
        let popupTimer = setTimeout(() => {
            if (!chatContainer.classList.contains('active')) {
                popupNotification.classList.add('show');
            }
        }, config.popupDelay);

        // Close popup
        popupClose.addEventListener('click', (e) => {
            e.stopPropagation();
            popupNotification.classList.remove('show');
            popupNotification.classList.add('hide');
        });

        // Click popup to open chat
        popupNotification.addEventListener('click', () => {
            popupNotification.classList.remove('show');
            popupNotification.classList.add('hide');
            chatContainer.classList.add('active');
            widgetButton.classList.add('active');

            if (window.innerWidth <= 768) {
                document.body.classList.add('crystal-chat-active');
            }
        });

        // Toggle chat
        widgetButton.addEventListener('click', () => {
            const isActive = chatContainer.classList.contains('active');

            if (isActive) {
                chatContainer.classList.remove('active');
                widgetButton.classList.remove('active');
                document.body.classList.remove('crystal-chat-active');
            } else {
                popupNotification.classList.remove('show');
                popupNotification.classList.add('hide');
                chatContainer.classList.add('active');
                widgetButton.classList.add('active');

                if (window.innerWidth <= 768) {
                    document.body.classList.add('crystal-chat-active');
                }
            }
        });

        // Prevent body scroll when mouse/touch is over chat content
        chatContent.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: true });

        chatContent.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });

        // Store scroll position and prevent scrolling
        let scrollPosition = 0;

        chatContent.addEventListener('mouseenter', () => {
            scrollPosition = window.pageYOffset;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
            document.body.style.overflowY = 'scroll';
        });

        chatContent.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflowY = '';
                window.scrollTo(0, scrollPosition);
            }
        });
    }

    // Public API
    window.CrystalBot = {
        init: function (options = {}) {
            // Override default config with user options
            if (options.botLogoUrl) config.botLogoUrl = options.botLogoUrl;
            if (options.botName) config.botName = options.botName;
            if (options.popupMessage) config.popupMessage = options.popupMessage;
            if (options.popupDelay !== undefined) config.popupDelay = options.popupDelay;
            if (options.botpressWebchatUrl) config.botpressWebchatUrl = options.botpressWebchatUrl;
            if (options.botpressConfigUrl) config.botpressConfigUrl = options.botpressConfigUrl;

            // Initialize the widget
            injectStyles();
            injectHTML();
            loadBotpressScripts();

            // Wait for DOM to be ready before initializing widget
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeWidget);
            } else {
                initializeWidget();
            }
        }
    };

    // Auto-initialize if data attribute is present
    if (document.currentScript && document.currentScript.hasAttribute('data-auto-init')) {
        window.CrystalBot.init();
    }
})();
