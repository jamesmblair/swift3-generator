'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require('glob');

module.exports = yeoman.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('Swift3') + ' project generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter project name',
        default: 'MyProject'
      },
      {
        type: 'input',
        name: 'companyName',
        message: 'Enter company name',
        default: 'MyCompany'
      },
      {
        type: 'input',
        name: 'bundleID',
        message: 'Enter bundle identifier',
        default: 'com.mycompany.myproject'
      },
      {
        type: "checkbox",
        message: "Select pods to install",
        name: "cocoapods",
        store: false,
        choices: [
          {
            name: "Alamofire"
          },
          {
            name: "SwiftyJSON"
          },
          {
            name: "ModelMapper"
          },
          {
            name: "Hue"
          },
          {
            name: "SwiftString"
          },
          {
            name: "CocoaLumberjack/Swift"
          },
          {
            name: "Timepiece"
          },
          {
            name: "SwiftSpinner"
          },
          {
            name: "Kingfisher"
          }
        ]
      }
    ];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: {
    app: function () {
      var tp = this.templatePath('swift3-project');

      var files = glob.sync(tp + '/**', {nodir: true});
      files.forEach(function (file) {
        var source = file.slice(tp.length + 1);
        var destination = this.props.projectName + '/' + source.replace(/ProjectName/g, this.props.projectName);

        this.fs.copyTpl(
          tp + '/' + source,
          this.destinationPath(destination),
          this.props
        );

      }, this);

    }
  },

  install: {
    app: function () {
      process.chdir(this.props.projectName);

      this.log('Initializing Git repository...');
      this.spawnCommand('git', ['init']);

      this.log('Installing pods...');
      this.spawnCommand('pod', ['install']);
    }
  }

});
