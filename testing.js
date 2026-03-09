(function () {
    'use strict';

    const config = {
        botpressWebchatUrl: 'https://pisteyo-ops.github.io/Crystal-Agent/inject_full_screen.js',
        botpressConfigUrl: 'https://pisteyo-ops.github.io/Crystal-Agent/HASA.js',
        botLogoUrl: 'animaged-crystal.png',
        botName: 'Crystal',
        popupMessage: 'Have a Question? I can help!',
        popupDelay: 10000
    };

    /* -------------------- STYLES -------------------- */
    function injectStyles() {
        const styles = `
        * { margin:0; padding:0; box-sizing:border-box; }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        /* Floating widget */
        .crystal-widget-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 2147483646;
            border: none;
        }

        .crystal-widget-button img {
            width: 60px;
            height: 60px;
        }

        .crystal-chat-gif { position:absolute; opacity:1; }
        .crystal-close-icon { position:absolute; opacity:0; fill:#FF0000; }

        .crystal-widget-button.active .crystal-chat-gif { opacity:0; }
        .crystal-widget-button.active .crystal-close-icon { opacity:1; }

        /* Popup */
        .crystal-popup-notification {
            position: fixed;
            bottom: 90px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,.15);
            padding: 15px;
            display: flex;
            gap: 12px;
            max-width: 320px;
            z-index: 2147483645;
            opacity: 0;
            visibility: hidden;
            transition: .3s;
        }

        .crystal-popup-notification.show {
            opacity: 1;
            visibility: visible;
        }

        .crystal-popup-logo { width:45px; height:45px; }

        /* Chat container */
        .crystal-chat-container {
            position: fixed;
            background: white;
            box-shadow: 0 0 30px rgba(0,0,0,.2);
            border-radius: 12px;
            z-index: 2147483644;
            opacity: 0;
            visibility: hidden;
            transition: .3s;
        }

        .crystal-chat-container.active {
            opacity: 1;
            visibility: visible;
            display: flex;
            flex-direction: column;
        }

        @media (min-width: 769px) {
            .crystal-chat-container {
                bottom: 100px;
                right: 20px;
                width: 25vw;
                min-width: 350px;
                max-width: 450px;
                height: calc(100vh - 120px);
                top: 20px;
            }
        }

        /* Mobile fullscreen */
        @media (max-width: 768px) {
            .crystal-chat-container {
                left: 0;
                right: 0;
                top: env(safe-area-inset-top,0);
                bottom: 0;
                width: 100vw;
                height: 100dvh;
                border-radius: 0;
                overscroll-behavior: contain;
            }

            /* Hide floating close on mobile */
            .crystal-widget-button.active {
                display: none;
            }
        }

        .crystal-chat-content {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }

        body.crystal-chat-active {
            overflow: hidden;
        }

        /* Mobile header close button */
        @media (max-width: 768px) {
            .bp-mobile-close {
                position: absolute;
                top: 48px;
                right: 12px;
                padding: 6px 14px;
                font-size: 12px;
                border-radius: 999px;
                background: #f1f3f5;
                border: 1px solid #ddd;
                cursor: pointer;
                z-index: 10;
            }
        }

        /* Mobile: hide floating close icon */
        @media (max-width: 768px) {
            .crystal-widget-button.active {
                display: none;
            }
        }

        @media (max-width: 768px) {
            .bp-mobile-close {
                position: absolute;
                top: 48px; /* just below sound & restart */
                right: 12px;
                padding: 6px 14px;
                font-size: 12px;
                font-weight: 500;
                border-radius: 999px; /* cylindrical */
                background: #f1f3f5;
                color: #333;
                border: 1px solid #ddd;
                cursor: pointer;
                z-index: 10;
                transition: background 0.2s ease;
            }

            .bp-mobile-close:hover {
                background: #e9ecef;
            }
        }


<<<<<<< HEAD
=======
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
>>>>>>> a24ad937b7fc483230c94539c8fa02d392670550
        `;
        const s = document.createElement('style');
        s.textContent = styles;
        document.head.appendChild(s);
    }

    /* -------------------- HTML -------------------- */
    function injectHTML() {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="crystal-widget-button" id="crystalWidgetButton">
            <img class="crystal-chat-gif" src="${config.botLogoUrl}">
            <svg class="crystal-close-icon" viewBox="0 0 24 24">
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </div>

        <div class="crystal-chat-container" id="crystalChatContainer">
            <div class="crystal-chat-content">
                <div id="testing"></div>
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

    /* -------------------- BOTPRESS -------------------- */
    function loadBotpressScripts() {
        return new Promise((resolve, reject) => {
            const s1 = document.createElement('script');
            s1.src = config.botpressWebchatUrl;
            s1.onload = () => {
                const s2 = document.createElement('script');
                s2.src = config.botpressConfigUrl;
                s2.onload = resolve;
                s2.onerror = reject;
                document.head.appendChild(s2);
            };
            document.head.appendChild(s1);
        });
    }

    /* -------------------- MOBILE HEADER CLOSE -------------------- */
    function injectMobileHeaderClose() {
        if (window.innerWidth > 768) return;

    // Initialize widget functionality
    function initializeWidget() {
        const widgetButton = document.getElementById('crystalWidgetButton');
        const chatContainer = document.getElementById('crystalChatContainer');
        const chatContent = document.getElementById('crystalChatContent');
        const popupNotification = document.getElementById('crystalPopupNotification');
        const popupClose = document.getElementById('crystalPopupClose');
        const mobileCloseBtn = document.getElementById('crystalMobileCloseBtn');

            const btn = document.createElement('button');
            btn.className = 'bp-mobile-close';
            btn.textContent = 'Close';

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

            header.style.position = 'relative';
            header.appendChild(btn);
            clearInterval(interval);
        }, 300);
    }

    /* -------------------- INIT -------------------- */
    function initializeWidget() {
        const btn = document.getElementById('crystalWidgetButton');
        const chat = document.getElementById('crystalChatContainer');

        btn.onclick = () => {
            const open = chat.classList.toggle('active');
            btn.classList.toggle('active', open);

            if (open) {
                document.body.classList.add('crystal-chat-active');
                injectMobileHeaderClose();
            } else {
                document.body.classList.remove('crystal-chat-active');
            }
        };
    }

    function injectMobileHeaderClose() {
    if (window.innerWidth > 768) return;

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

        const closeBtn = document.createElement('button');
        closeBtn.className = 'bp-mobile-close';
        closeBtn.textContent = 'Close';

        closeBtn.addEventListener('click', () => {
            const chatContainer = document.getElementById('crystalChatContainer');
            const widgetButton = document.getElementById('crystalWidgetButton');

            chatContainer.classList.remove('active');
            widgetButton.classList.remove('active');
            document.body.classList.remove('crystal-chat-active');
        });

        header.style.position = 'relative';
        header.appendChild(closeBtn);

        clearInterval(interval);
    }, 300);
    }


    window.CrystalBot = {
        init() {
            injectStyles();
            injectHTML();
            loadBotpressScripts();
            document.readyState === 'loading'
                ? document.addEventListener('DOMContentLoaded', initializeWidget)
                : initializeWidget();
        }
    };

    if (document.currentScript?.hasAttribute('data-auto-init')) {
        window.CrystalBot.init();
    }
})();
