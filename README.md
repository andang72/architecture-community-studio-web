# DATA APIs Studio Dashbard
A dashboard for DATA APIs Server.

# It's based on Adminator HTML5 Admin Template
This project based on **Adminator**.
**Adminator** is a responsive Bootstrap 4 Admin Template. It provides you with a collection of ready to use code snippets and utilities, custom pages, a collection of applications and some useful widgets. Preview of this awesome admin template available here: https://colorlib.com/polygon/adminator/index.html

## TOC
- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing & Local Development](#installing--local-development)
- [Files/Folder Structure](#filesfolders-structure)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Changelog](#changelog)
- [Authors](#authors)
- [License](#license)

## About
**DATA APIs Studio** is simple management platform for making APIs, webpages.

## Getting Started
In order to run **DATA APIs Studio** on your local machine all what you need to do is to have the prerequisites stated below installed on your machine and follow the installation steps down below.

#### Prerequisites
  - node.js & npm
  - DATA APIs Studio Server (local or remote)
  - Tools (Visual Studio Code .. )

#### Installing & Local Development
Start by typing the following commands in your terminal in order to get **studio** full package on your machine and starting a local development server with live reload feature.

```
> git clone https://github.com/andang72/architecture-community-studio-web.git studio-web
> cd studio-web
> npm install
> npm run preview
```
Note that you must have a studio server and enter the server address in the webpack/manifest.js file.

## Files/Folders Structure
Here is a brief explanation of the template folder structure and some of its main files usage:

```
└── src                         # Contains all template source files.
│   └── assets                  # Contains JS, CSS, images and icon fonts.
│   │   └── scripts             # Contains all JavaScript files. 
│   │   │   └── clipboard       # All chat app JS code.
│   │   │   └── constants       # Template constant values like color values.
│   │   │   └── fancybox        # Date table plugin init.
│   │   │   └── kendo           # Bootstrap datepicker init.
│   │   │   └── masonry         # All email app code.
│   │   │   └── popover         # Fullcalendar plugin init.
│   │   │   └── scrollbar       # Google maps API integration code.
│   │   │   └── search          # Masonry layout code.
│   │   │   └── sidebar         # Bootstrap popover plugin init.
│   │   │   └── skycons        # Perfect scrollbar plugin init.
│   │   │   └── studio          # Topbar toggle search init.
│   │   │   └── utils           # Basic utils used for proper rendering.
│   │   │   └── index.js        # Indicator file.
│   │   │
│   │   └── static              # Contains the non-code files.
│   │   │   └── fonts           # Contains icon fonts.
│   │   │   └── images          # Contains all template images/svg.
│   │   │
│   │   └── styles              # Contains all SCSS files.
│   │       └── spec            # Contains custom SCSS files.
│   │       │   └── components  # Contains all template components.
│   │       │   └── generic     # Contains basic scaffolding styles.
│   │       │   └── screens     # Contains views specific styles.
│   │       │   └── settings    # Contains all template variables.
│   │       │   └── tools       # Contains all mixins.
│   │       │   └── utils       # Contains helper classes.
│   │       │   └── index.scss  # Indicator file.
│   │       │
│   │       └── vendor          # Contains all plugin files & custom styles.
│   │       └── index.scss      # Indicator file.
│   │
│   └── *.html                  # All HTML pages files .
└── webpack                     # Contains Webpack init code.
│   └── plugins                 # Contains all Webpack plugins config.
│   └── rules                   # Contains Loaders config code.
│   └── config.js               # Contains Webpack config object.
│   └── devServer.js            # Webpack dev server config code.
│   └── manifest.js             # All build system constants.
│
└── .babelrc                    # Babel ES6 Transpiler.
└── .editorconfig               # Keep same coding styles between code editors.
└── .eslintrc.yml               # JavaScript Linting.
└── .gitattributes              # Git Attributes.
└── .gitignore                  # Ignored files in Git.
└── .stylelintrc.yml            # SCSS/CSS Linting.
└── browserslist                # Supported Browsers.
└── CHANGELOG.md                # Versioning.
└── package.json                # Package metadata.
└── README.md                   # Manual file.
└── webpack.config.js           # Webpack main config file.
└── yarn.lock                   # Yarn metadata.
``

## Deployment
In deployment process, you have two commands:

1. Build command
Used to generate the final result of compiling src files into build folder. This can be achieved by running the following command:
```
> npm run build
```

2. Preview command
Used to create a local dev server in order to preview the final output of build process. This can be achieved by running the following command:
```
> npm run preview
```

## Built With
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)
- [Eslint](https://eslint.org/)
- [Sass](http://sass-lang.com/)
- [Postcss](http://postcss.org/)
- [Stylelint](https://stylelint.io/)
- [Bootstrap](http://getbootstrap.com/)    
- [Jquery](https://jquery.com/)
- [Jquery Sparkline](https://omnipotent.net/jquery.sparkline/)   
- [Masonry](https://masonry.desandro.com/)
- [Moment](https://momentjs.com/)
- [Perfect Scrollbar](https://github.com/utatti/perfect-scrollbar)
- [Skycons](https://darkskyapp.github.io/skycons/)
- [Fontawesome](http://fontawesome.io/)
- [Themify Icons](https://themify.me/themify-icons)  


## Changelog
#### V 1.0.0
Initial Release

## Authors
 
## More info 

## License

