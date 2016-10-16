# booking

Hi, this is a quick guide for you to get my project up and running.

1. npm install: will download all node modules for gulp tasks
2. bower install: will download the bower components needed
3. gulp start: will start a local host on port: 8080
4. localhost:8080

:)

In case you don't want to install all the npm dependencies,
you could just use your own localhost and only install the bower components.
(or if you don't want to see the not-compressed code working you can go to localhost:{port}/indexProduccion)

I've uploaded the app on this url: https://dvmdeveloper.000webhostapp.com
And the code is also on my github: https://github.com/davidvalentin12/booking

Project structure:
.
+-- /_data : contains data in json format for local development
+-- /bower_components : bower components
+-- /dependencies : simplified version of bower components for production version
+-- /dist : minified/compressed code of this project (also por production)
+-- /node_modules : node modules
+-- /src
|   +-- /_images : local images (will later be build into /images)
|   +-- /images : build images (gulp tasks also puts bower components images in here)
|   +-- /scripts :
|       +-- /config : angular configurations
|       +-- /{component name}:
|           +-- {component name}.component.js : {component name}
|           +-- {component name}.tpl.html : template for the {component name}
|           +-- /shared : services whi will be used by {component name}
|           +-- /sass
|               +-- {component name}.scss : sass file, with exclusive styles for {component name}
|               +-- {component name}.css : css file (sass file will get compiled to this)
|       +-- /shared: different services which will be used all over the app
|       +-- app.js : initialization of main project module
|   +-- /styles : global styles
+-- bower.json : bower file
+-- gulpConfig.json : configuration for gulp tasks
+-- gulpfile.js : gulp file
+-- index: index for development (uses files from bower_components and src)
+-- indexProduccion: index for production (uses files from dist and dependencies)
+-- LICENSE: license
+-- package.json : package.json (node modules)




