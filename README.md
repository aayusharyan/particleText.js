# particleText.js
Library to create Text using Particles.

To initialize the function 

initParticleJS();
First parameter the element selector. Required
Second parameter the config object.

Element selector can have data props - data-text.
This can be overwritten by configObject {}.

props of configObject:
1. text - This is the text that is to be shown.
2. colors - This needs to be in the form of HEX and this id dynamic number of colors. Can be in an array format or single color
3. Breakpoints - xxxs, xxs, xs, sm, md, lg, xl, xxl, xxxl
4. fontSize - In absolute pixel number

5. give width and height in attribute.
It seems that the width and height attributes determine the width or height of the canvas's coordinate system, whereas the CSS properties just determine the size of the box in which it will be shown.
6. fontWeight - normal|bold
7. textAlign - center
8. autoAnimate - This is used to decide whether the loading of snimation will start automatically or not. Default true.
If set to false, then the animation needs to be manually started by calling the startAnimation method.
9. Friction - This will determine the speed of each of the particles, this has base and rand.


Breakpoints:
1. xxxs  | <= 
2. xxs   | <=  =>
3. xs    | <=  =>
4. sm    | <=  =>
5. md    | <=  =>
6. lg    | <=  =>
7. xl    | <=  =>
8. xxl   | <=  =>
9. xxxl  | <=  =>