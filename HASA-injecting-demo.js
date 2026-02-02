(function () {
    'use strict';

    // Configuration
    const config = {
        botpressWebchatUrl: 'https://crystal-agent.pages.dev/inject_full_screen.js',
        botpressConfigUrl: 'https://crystal-agent.pages.dev/HASA_Demo.js',
        botLogoUrl: 'animaged-crystal.png',
        botName: 'Crystal',
        popupMessage: 'Have a Question? I can help!',
        popupDelay: 10000
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
                z-index: 2147483646;
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
                fill: #FF0000;
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
                z-index: 2147483645;
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
                z-index: 2147483644;
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

            /* Desktop styles - consistent spacing from top */
            @media (min-width: 769px) {
                .crystal-chat-container {
                    bottom: 100px;
                    right: 20px;
                    width: 25vw;
                    min-width: 350px;
                    max-width: 450px;
                    /* Dynamic height: from 100px from bottom to 20px from top */
                    height: calc(100vh - 120px);
                    top: 20px;
                }
            }

            /* Mobile styles - fullscreen with safe areas */
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

                /* Hide close icon on mobile - use dedicated close button instead */
                .crystal-widget-button .crystal-close-icon {
                    display: none;
                }

                .crystal-widget-button.active .crystal-chat-gif {
                    opacity: 1;
                }

                .crystal-chat-container {
                    /* Full viewport width minus small margins */
                    left: 0.5vw;
                    right: 0.5vw;
                    width: 99vw;
                    
                    /* Full height accounting for safe areas and browser chrome */
                    top: env(safe-area-inset-top, 0);
                    bottom: 0;
                    height: calc(100vh - env(safe-area-inset-top, 0));
                    height: calc(100dvh - env(safe-area-inset-top, 0)); /* dvh for mobile browsers */
                    
                    border-radius: 0;
                    margin: 0;
                }

                /* iOS Safari specific - accounts for address bar */
                @supports (-webkit-touch-callout: none) {
                    .crystal-chat-container {
                        height: -webkit-fill-available;
                    }
                }

                .crystal-chat-container {
                    overscroll-behavior: contain;
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

            /* Mobile close button */
            .crystal-mobile-close-btn {
                display: none;
                position: absolute;
                top: 0.3%;
                right: 6%;
                padding: 4px 8px;
                background: transparent;
                border: none;
                cursor: pointer;
                z-index: 2147483647;
                align-items: center;
                justify-content: center;
                font-size: 15px;
                font-family: Arial, sans-serif;
                color: #5e6576;
                font-weight: 400;
                text-decoration: underline;
                transition: all 0.2s ease;
            }

            .crystal-mobile-close-btn:active {
                color: #0056b3;
            }

            @media (max-width: 768px) {
                .crystal-chat-container.active .crystal-mobile-close-btn.show {
                    display: flex;
                }
            }

            .crystal-chat-content {
                flex: 1;
                overflow-y: auto;
                overflow-x: hidden;
                position: relative;
                -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
            }

            .crystal-chat-content::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
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

            /* Prevent zoom on iOS */
            @media (max-width: 768px) {
                .crystal-chat-container * {
                    touch-action: manipulation;
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
                <button class="crystal-mobile-close-btn" id="crystalMobileCloseBtn" aria-label="Close chat">
                    Close
                </button>
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
    function loadBotpressScripts() {
        return new Promise((resolve, reject) => {
            const webchatScript = document.createElement('script');
            webchatScript.src = config.botpressWebchatUrl;
            webchatScript.async = false;
            webchatScript.onload = () => {
                const configScript = document.createElement('script');
                configScript.src = config.botpressConfigUrl;
                configScript.async = false;
                configScript.onload = resolve;
                configScript.onerror = reject;
                document.head.appendChild(configScript);
            };
            webchatScript.onerror = reject;
            document.head.appendChild(webchatScript);
        });
    }

    // Handle mobile viewport changes (address bar showing/hiding)
    function handleViewportResize() {
        if (window.innerWidth <= 768) {
            const chatContainer = document.getElementById('crystalChatContainer');
            if (chatContainer && chatContainer.classList.contains('active')) {
                // Force recalculation of height when viewport changes
                chatContainer.style.height = window.innerHeight + 'px';
            }
        }
    }

    // Initialize widget functionality
    function initializeWidget() {
        const widgetButton = document.getElementById('crystalWidgetButton');
        const chatContainer = document.getElementById('crystalChatContainer');
        const chatContent = document.getElementById('crystalChatContent');
        const popupNotification = document.getElementById('crystalPopupNotification');
        const popupClose = document.getElementById('crystalPopupClose');
        const mobileCloseBtn = document.getElementById('crystalMobileCloseBtn');

        // Handle viewport resize for mobile
        window.addEventListener('resize', handleViewportResize);
        window.addEventListener('orientationchange', handleViewportResize);

        // Mobile close button handler
        mobileCloseBtn.addEventListener('click', () => {
            chatContainer.classList.remove('active');
            widgetButton.classList.remove('active');
            document.body.classList.remove('crystal-chat-active');
            
            // Show widget button on mobile and hide close button
            if (window.innerWidth <= 768) {
                widgetButton.style.display = 'flex';
                mobileCloseBtn.classList.remove('show');
            }
        });

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
                widgetButton.style.display = 'none';
                handleViewportResize();
                
                // Show close button after 0.5 seconds
                setTimeout(() => {
                    mobileCloseBtn.classList.add('show');
                }, 500);
            }
        });

        // Toggle chat
        widgetButton.addEventListener('click', () => {
            const isActive = chatContainer.classList.contains('active');

            if (isActive) {
                chatContainer.classList.remove('active');
                widgetButton.classList.remove('active');
                document.body.classList.remove('crystal-chat-active');
                
                // Show widget button on mobile and hide close button
                if (window.innerWidth <= 768) {
                    widgetButton.style.display = 'flex';
                    mobileCloseBtn.classList.remove('show');
                }
            } else {
                popupNotification.classList.remove('show');
                popupNotification.classList.add('hide');
                chatContainer.classList.add('active');
                widgetButton.classList.add('active');

                if (window.innerWidth <= 768) {
                    document.body.classList.add('crystal-chat-active');
                    widgetButton.style.display = 'none';
                    handleViewportResize();
                    
                    // Show close button after 4 seconds
                    setTimeout(() => {
                        mobileCloseBtn.classList.add('show');
                    }, 4000);
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
        // let scrollPosition = 0;

        // chatContent.addEventListener('mouseenter', () => {
        //     scrollPosition = window.pageYOffset;
        //     document.body.style.position = 'fixed';
        //     document.body.style.top = `-${scrollPosition}px`;
        //     document.body.style.width = '100%';
        //     document.body.style.overflowY = 'scroll';
        // });

        // chatContent.addEventListener('mouseleave', () => {
        //     if (window.innerWidth > 768) {
        //         document.body.style.position = '';
        //         document.body.style.top = '';
        //         document.body.style.width = '';
        //         document.body.style.overflowY = '';
        //         window.scrollTo(0, scrollPosition);
        //     }
        // });
    }

    // Public API
    window.CrystalBot = {
        init: function (options = {}) {
            if (options.botLogoUrl) config.botLogoUrl = options.botLogoUrl;
            if (options.botName) config.botName = options.botName;
            if (options.popupMessage) config.popupMessage = options.popupMessage;
            if (options.popupDelay !== undefined) config.popupDelay = options.popupDelay;
            if (options.botpressWebchatUrl) config.botpressWebchatUrl = options.botpressWebchatUrl;
            if (options.botpressConfigUrl) config.botpressConfigUrl = options.botpressConfigUrl;

            injectStyles();
            injectHTML();
            loadBotpressScripts();

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
