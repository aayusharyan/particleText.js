![Heading Image](https://raw.githubusercontent.com/aayusharyan/particleText.js/main/heading.gif)

---

**A Library to create text using particles.**

This library is written in Vanilla JS and is compatible with Various Browsers (Even Internet Explorer) and Mobile Devices. Currently working example (DEMO) can be seen at https://yush.dev/ (A better example will be updated soon).

<br />

# Getting Started

Just import and initialize to get started out of the box.

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
| Name | Type | Description |
| --- | --- | --- |
| `text` | `String` | This is the text which will be created using particles. If provided, this will override the `data-text` attribute of the canvas element. |
| `colors` | `String \| Array` | This is the color of each particle (Given randomly). The color value needs to be in a valid HEX format |
| `fontSize` | `Number` | This is the pixel number of the size of the text that will be displayed. Support for function coming soon. |
| `width` | `Number` | The width of the canvas in pixel values. |
| `height` | `Number` | The height of the canvas in pixel values. |
| `fontWeight` | `String` | Currently supported value only `bold`, other types coming soon. |
| `textAlign` | `String` | Currently supported type only `center` aligned, other types coming soon. |
| `autoAnimate` | `Boolean` | This is used to check whether the animation needs to be started automatically on page loan or not. If not starting automatically, then the `startAnimation` method needs to be called. |
| `particleRadius` | `Object \| Function` | This is the radius of each of the particles. The format of this Object should be following the structure, `{'<breakpoint_nm>': {'base': <number>, 'rand': number}}`. The base is the minimum pixel radius each particle will have and rand is the randomness factor. So, each particle will have radius between base and base + rand. More detail about breakpoints and how they work in the breakpoint section. If given function, the function will be called each time a new particle has to be created and that function should return the pixel value in Number format only. For easy reference, the breakpoint name will also be passed as a parameter to the function. But that is a future enhancement. |
| `friction` | `Object \| Function` | This is the friction that each particle will face during the animation. Less friction means faster speed, but also means lesser drag, that gives it an effect of going ahead and then coming back to the destination. (Something like a swinging pendulum). The object needs to follow this structure, `{'base': <number>, 'rand': <number>}`. The friction of each particle will be between base and base + rand. This property also accepts a function which will be called every time to decide the friction value for a new particle. In that case, the function should return a Number value. |
| `supportSlowBrowsers` | `Boolean` | On slow browsers, the animation might lag and jitter because they simply are not able to call the render method in a smooth 60fps framerate. in order to fix this, the quality of pixel will be reduced and the number of particles on screen will be reduced which might make it look small and that will be fixed by artificial scaling. Set this to `true` if you want to support slow browsers. (Smooth experience not guaranteed, ¯\\_(ツ)_/¯) |
| `slowBrowserDetected` | `Function` | This is a callback function which will be triggered in the case when a slow browser is detected. One of the usecase is to show some sort of message on the screen or stop the animation completely. |
| `renderTimeThreshold` | `Number` | This is the threshold for deeciding whether the browser is slow or not. This is the time (in milliseconds) a browser should take to render the first animation frame. If the browser is able to render that, then well and good, otherwise it is considered as a slow browser. For ideal 60pfs, the browser should be able to render each frame within `15` milliseconds. |

<br />

# Callbacks and Triggers

TODO

<br />

# Helper Functions

1. getCurrentBreakpoint - This function is used to get the Current Breakpoint value of the viewport. This function can also be overwritten to define custom breakpoint widths.

<br />

# Breakpoints

This is the default breakpoint structure being used. This can be customized by overriding the `getCurrentBreakpoint` method. It checks the width of the viewport and then based on the following conditions it assigns the breakpoint value which is then checked by other parts of this library. (Let's call this value as `ww` for references in the following table). 

| Breakpoint Name | Size Value |
| :-: | :-: |
| XXXS | 000px <= `ww` < 320px |
| XXS | 320px <= `ww` < 375px |
| XS | 375px <= `ww` < 768px |
| SM | 768px <= `ww` < 1024px |
| MD | 1024px <= `ww` < 440px |
| LG | 1440px <= `ww` < 2560px |
| XL | 2560px <= `ww` < 3440px |
| XXL | 3440px <= `ww` < 3840px |
| XXXL | 3840px <= `ww` < ∞ px

<br />

# Contribution

Wohoo, OpenSource, Hactoberfest, blah blah. Still needs planning about this.

Need to work on getting License as well


---
<p align="center">That's all folks!</p>