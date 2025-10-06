window.botpress.init({
  "botId": "560191e9-30df-437a-8911-2f60d2da17a2",
  "configuration": {
    "version": "v2",
    "botName": "Crystal",
    "botAvatar": "https://files.bpcontent.cloud/2025/06/17/22/20250617221227-WK5LAJ4V.png",
    "botDescription": "How can I help you rule your pool today? ",
    "fabImage": "https://files.bpcontent.cloud/2025/06/17/22/20250617221822-2M71EV3F.png",
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
    "proactiveMessageEnabled": false,
    "proactiveBubbleMessage": "Hi! ðŸ‘‹ Need help?",
    "proactiveBubbleTriggerType": "afterDelay",
    "proactiveBubbleDelayTime": 10
  },
  "clientId": "0e1d8545-8363-4a31-943b-98333207676f"
});

window.botpress.on('webchat:initialized', () => {
  console.log('Webchat has been initialized. Loading user...');
  window.botpress.updateUser({
    data: {
      brand:"HASA"
    },
  })
});
