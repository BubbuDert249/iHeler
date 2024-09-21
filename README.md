# iHeler NodeJs Edition
HOW TO INCLUDE: const iheler = require('./src/iheler');
 <br>
<br>
Display HTML Content: iheler.displayHTMLContent('index.html', 3000); <br>
Create Android/iOS Apps: iheler.createApp('MyAndroidApp', 'Android');     iheler.createApp('MyIOSApp', 'iPhone'); <br>
Fetch HTML and Save: iheler.fetchHTML('http://example.com', 'output.html'); <br>
<br>
CUSTOM URI SERVER! : <br>
const uriConfig = { <br>
  '/home': 'Welcome Home!', <br>
  '/about': 'About Us Page', <br>
}; <br>
 <br>
// Create a custom URI server on port 8000 <br>
iheler.createCustomURIServer(uriConfig, 8000); <br>
