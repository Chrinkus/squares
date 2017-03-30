# Testing Game Code

It seems like this could be tricky as a game's state is dynamically changing
due to user interaction. Individual files may be tested for return values then
tested again in the context of other files that use them. There can also be
inline testing when modules are applied very deep into the game architecture.

### Three Test Methods
- In the command line with the "node" command (numstringtest.js)
- In a browser context when needed (canvastest.js)
- Inline when deeply embedded (src/camera.js)

### Another Way
It would also be beneficial to run files through "jshint" to see what it
catches though how jshint interacts with node.js modules is worth exploring.
