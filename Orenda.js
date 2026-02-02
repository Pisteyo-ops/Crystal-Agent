window.botpress.init({
  "botId": "59851f38-94fa-4719-8b70-f89a84bf6050",
  "configuration": {
    "version": "v2",
    "botName": "Crystal",
    "botAvatar": "https://files.bpcontent.cloud/2025/11/11/18/20251111180338-X9MO6TG3.png",
    "botDescription": "How can I help you rule your pool today? ",
    "fabImage": "https://files.bpcontent.cloud/2025/11/11/16/20251111164320-K3VSYICJ.png",
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
    "allowFileUpload": true,
    "storageLocation": "localStorage",
    "soundEnabled": true,
    "embeddedChatId": "testing"
  },
  "clientId": "6e9fa6a4-3cc4-45b4-a1dd-88b0360ee898"
});

window.botpress.on('webchat:initialized', () => {
  console.log('Webchat has been initialized. Loading user...');
  window.botpress.updateUser({
    data: {
      brand:"Orenda"
    },
  })
});
