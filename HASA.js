window.botpress.init({
  "botId": "59851f38-94fa-4719-8b70-f89a84bf6050",
  "configuration": {
    "version": "v2",
    "botName": "Crystal",
    "botAvatar": "https://files.bpcontent.cloud/2025/10/09/16/20251009162731-P1RP8COC.png",
    "botDescription": "How can I help you rule your pool today? ",
    "fabImage": "https://files.bpcontent.cloud/2025/10/09/16/20251009162810-VFG9XD80.png",
    "website": {},
    "email": {},
    "phone": {},
    "termsOfService": {},
    "privacyPolicy": {},
    "color": "#26699b",
    "variant": "soft",
    "headerVariant": "glass",
    "themeMode": "light",
    "fontFamily": "inter",
    "radius": 2.5,
    "feedbackEnabled": false,
    "footer": "Privacy Consent: By using this chat, you consent to the collection, recording, & use of this chat session & info you submit by HASA",
    "additionalStylesheetUrl": "https://files.bpcontent.cloud/2025/01/31/21/20250131211512-O4XWWO1J.css",
    "allowFileUpload": true,
    "storageLocation": "localStorage",
    "soundEnabled": true,
    "proactiveMessageEnabled": true,
    "proactiveBubbleMessage": "Hi! ðŸ‘‹ Need help?",
    "proactiveBubbleTriggerType": "afterDelay",
    "proactiveBubbleDelayTime": 10
  },
  "clientId": "d08d44d1-1b76-4275-9069-8a8cb366b734"
});

window.botpress.on('webchat:initialized', () => {
  console.log('Webchat has been initialized. Loading user...');
  window.botpress.updateUser({
    data: {
      brand:"HASA"
    },
  })
});
