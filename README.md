![Heading Image](https://raw.githubusercontent.com/aayusharyan/particleText.js/main/heading.gif)

---

**A Library to create text using particles.**

This library is written in Vanilla JS and is compatible with Various Browsers (Even Internet Explorer) and Mobile Devices. Currently working example (DEMO) can be seen at https://yush.dev/ (A better example will be updated soon).

<br />

# Getting Started

## Import the Script

To import this library, you can either download [this release](https://github.com/aayusharyan/particleText.js/releases/tag/v0.1.0) and use the `particleText.js` file inside the src directory or use the CDN.

```
<script src="https://cdn.jsdelivr.net/gh/aayusharyan/particleText.js@0.1.0/src/particleText.js"></script>
```
*Note - Minified version coming soon, code coverage and size information + integrity information also coming soon, hopefully!*

## Initialize ParticleText

Initialize by passing the element selector and the configuration object as two parameters of the `initParticleJS` method. Store the result in a variable as it will be helpful for calling the helper methods. 

**(Note - A canvas element is required, this will not create an element on it's own)**

```
<canvas id="mainCanvas" data-text="ParticleText.JS" width="2000px" height="400px">
<script>
    let particleText = initParticleJS('#mainCanvas', {});
</script>
```
The text data can be set using the `data-text` attribute of the canvas element or the configuration object property (Defined below). Also, the width and height of the canvas needs to be defined as an attribute and not as CSS because that's how W3 specification is for canvases. This can also be configured in a better way using the configuration object. (Basically an attempt to make this library responsive in terms of device sizes).

<br />

# Configuration

This is a JSON object, which can contain the following properties:

1. `text` - This is the text which will be created using particles. If provided, this will override the `data-text` attribute of the canvas element. This is a string.
2. `colors` - This needs to be in the form of HEX and this id dynamic number of colors. Can be in an array format or single color
3. Breakpoints - xxxs, xxs, xs, sm, md, lg, xl, xxl, xxxl
4. fontSize - In absolute pixel number

5. give width and height in attribute.
It seems that the width and height attributes determine the width or height of the canvas's coordinate system, whereas the CSS properties just determine the size of the box in which it will be shown.
6. fontWeight - normal|bold
7. textAlign - center
8. autoAnimate - This is used to decide whether the loading of snimation will start automatically or not. Default true.
9. particleRadius - This is a nreakpoint scoped value of what the radius of each particle will be. It requires two properties, base and rand. Or it can also be a function.
If set to false, then the animation needs to be manually started by calling the startAnimation method.
9. Friction - This will determine the speed of each of the particles, this has base and rand.
10. supportSlowBrowsers - Default false. On slow browsers, the animation might lag and jitter, in order to fix this, the quality of pixel will be reduced and the number of particles on screen will be reduced. This will be achieved by scaling so as to not make it smaller.
11. slowBrowserDetected - This is a callback function which will be triggered when a slow browser is detected.
12. renderTimeThreshold - This is the threshold time whithin which the browser should be able to render the first animated frame, if the browser is not able to render within this threshold time, then it is treated as slow browser. This value is in milliseconds.

<br />

# Callbacks and Triggers

<br />

# Helper Functions

<br />

# Breakpoints

1. xxxs  | <= 
2. xxs   | <=  =>
3. xs    | <=  =>
4. sm    | <=  =>
5. md    | <=  =>
6. lg    | <=  =>
7. xl    | <=  =>
8. xxl   | <=  =>
9. xxxl  | <=  =>