const { spawnSync } = require('child_process');
const semver = require('semver');
const extend = require('lodash.merge');
const Generator = require('yeoman-generator');
const parseAuthor = require('parse-author');
const path = require('path');
const validatePackageName = require('validate-npm-package-name');
const localPackageJson = require('../../package.json');
module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
  }

  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const genVersionFromNpm = "1.0.0"
    if (semver.gt(genVersionFromNpm, localPackageJson.version)) {
      process.exit(1);
    }

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage,
      repositoryName: this.options.repositoryName
    };

    if (typeof this.pkg.author === 'object') {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
    } else if (typeof this.pkg.author === 'string') {
      const info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
  }

  // first stage
  async prompting() {
    this.log('Generator starting... 🤖');

    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What shall we create today?',
        choices: ['app', 'screen', 'redux-module', 'pulumi'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Input the name for this module',
        validate: input => Boolean(input.length),
      },
    ]);
  }

  // second stage
  writing() {
    this.log('Writing files... 📝');

    const { type, name } = this.answers;
    if (type === 'app') {
      this.fs.copy(
        this.templatePath('react-app-template/**'),
        this.destinationRoot(),
        { globOptions: { dot: true } }
      );

      const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      const pkg = extend(
        {
          name: this.props.name,
          version: '0.0.1',
          description: this.props.description,
          homepage: this.props.homepage,
          author: {
            name: this.props.authorName,
            email: this.props.authorEmail
          },
          files: ['lib'],
          keywords: [],
          engines: {
            npm: '>= 10.0.0'
          }
        },
        currentPkg
      );

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    } else if (type == 'pulumi') {
      this.fs.copy(
        this.templatePath('pulumi/**'),
        this.destinationRoot(),
        { globOptions: { dot: true } }
      );

      const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      const pkg = extend(
        {
          name: this.props.name,
          version: '0.0.1',
          description: this.props.description,
          homepage: this.props.homepage,
          author: {
            name: this.props.authorName,
            email: this.props.authorEmail
          },
          files: ['lib'],
          keywords: [],
          engines: {
            npm: '>= 10.0.0'
          }
        },
        currentPkg
      );

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    }
    else if (type === 'screen') {
      this.fs.copyTpl(
        this.templatePath('component.js'),
        this.destinationPath(`components/${name}.js`),
        {
          name,
        },
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('module.js'),
        this.destinationPath(`modules/${name.toLowerCase()}.js`),
        {
          name,
        },
      );
    }
  }

  // last stage
  end() {
    this.log('Bye... 👋');
  }
};
