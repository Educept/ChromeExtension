chrome.webRequest.onBeforeRequest.addListener(
  function(details) {

  return {redirectUrl: `localhost:3000/test/${uid}`} },
          // return {cancel: true}; },
  {urls: ["://www.reddit.com/"]},
  ["blocking"]);