/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function (oj, ko, moduleUtils) {
    function ControllerViewModel() {
      var self = this;

      //m starts
      var newLang = '';
      self.langA = [
        { value: 'en', label: 'English', selected: true },
        { value: 'zh-CN', label: 'Chinese - Simplified', selected: false },
        { value: 'zh-TW', label: 'Chinese - Traditional', selected: false },
        { value: 'fr', label: 'French', selected: false },
        { value: 'de', label: 'German', selected: false },
        { value: 'it', label: 'Italian', selected: false },
        { value: 'ja', label: 'Japanese', selected: false },
        { value: 'ko', label: 'Korean', selected: false },
        { value: 'pt-PT', label: 'Portuguese', selected: false },
        { value: 'ru', label: 'Russian', selected: false },
        { value: 'es', label: 'Spanish', selected: false }
      ];
      self.langItems = ko.observableArray(self.langA);
      
      self.setLangAction = function (event) {
        var newLang = event.target.value;
        oj.Config.setLocale(newLang,
          function () {
            $('html').attr('lang', newLang);
          });
        self.testel=  ko.utils.arrayFilter(self.langA, function(lang) {
              lang.selected =false;
              if(lang.value === newLang){
                lang.selected =true;
              }
         });
        // self.langItems([]);
         self.langItems().subscribe(self.langA);
         console.log(self.langItems(), self.testel);
      };


      //m ends

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
        'dashboard': { label: 'Dashboard', isDefault: true },
        'incidents': { label: 'Incidents' },
        'customers': { label: 'Customers' },
        'about': { label: 'About' }
      });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      self.moduleConfig = ko.observable({ 'view': [], 'viewModel': null });

      self.loadModule = function () {
        ko.computed(function () {
          var name = self.router.moduleConfig.name();
          var viewPath = 'views/' + name + '.html';
          var modelPath = 'viewModels/' + name;
          var masterPromise = Promise.all([
            moduleUtils.createView({ 'viewPath': viewPath }),
            moduleUtils.createViewModel({ 'viewModelPath': modelPath })
          ]);
          masterPromise.then(
            function (values) {
              self.moduleConfig({ 'view': values[0], 'viewModel': values[1] });
            }
          );
        });
      };

      // Navigation setup
      var navData = [
        {
          name: self.dashboardLabel, id: 'dashboard',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
        },
        {
          name: 'Incidents', id: 'incidents',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
        },
        {
          name: 'Customers', id: 'customers',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
        },
        {
          name: 'About', id: 'about',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'
        }
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, { idAttribute: 'id' });

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function () { oj.OffcanvasUtils.close(self.drawerParams); });
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function () {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function () { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
    }

    return new ControllerViewModel();
  }
  /*
  $(function() {
    ko.applyBindings(new ControllerViewModel(), document.getElementById('menu1'));
  });
*/
);
