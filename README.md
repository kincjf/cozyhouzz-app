# cozyhouzz-app
The app version of cozyhouzz.co.kr. This app is a hybrid app created using ionic2 and has a function to show VR images. To install and build the project, please see the instructions below.

### Preparations
To run the project, you need to build an Android or iPhone development environment.<br>
<ol start="1">
  <li>Android : requires JAVA installation and routing, Android studio, marshallow(6.0.0) version or above SDK. You also need to have a virtual machine installed to run the ionic run command.</li>
  <li>iPhone : Not yet supported. </li>
</ol>

* Android Studio Install - https://developer.android.com/studio/index.html?hl=ko
* Java Install - http://www.oracle.com/technetwork/java/javase/downloads/index.html
* NodeJS - https://nodejs.org/en/

### Ionic2 Install
To install ionic2 you need nodejs (current project: 6.9.4).
<ol start="1">
  <li>npm install -g ionic cordova (http://ionicframework.com/docs/v2/setup/installation/)</li>
</ol>

### Build Configuaration
* Windows 10
* Webstorm 16.3.2

### Project Install & Build(Run)
<ol start="1">
  <li>git clone https://github.com/kincjf/cozyhouzz-app.git</li>
  <li>cd cozyhouzz-app/cozyhouzz-app</li>
  <li>npm install</li>
  <li>ionic state reset</li>
  <li>ionic platform add android</li>
  <li>ionic state reset</li>
  <li>ionic plugin add https://github.com/Telerik-Verified-Plugins/ImagePicker</li>
  <li>ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyCjr4vfqafxsO1kq853HHZzy5kpLV_XB44" --variable API_KEY_FOR_IOS="AIzaSyBA7HfLTwOxkwsK4ex9dEI9Zh0eD_A2fIs"</li>
  <li>ionic plugin add call-number </li>
  <li>ionic platform add android (If you want. or ios)</li>
  <li>ionic serve (ionic run android, ionic build, ionic emulate android)</li>
</ol>

### License
Copyright (c) 2016 Hose Kim

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
