/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojlegend', 'ojs/ojchart'],
 function(oj, ko, $) {
  
    function CustomerViewModel() {
      var self = this;

      var attrGroups = new oj.ColorAttributeGroupHandler();

      var blacSeries = [{name: "Series 1", items: [74, 62, 70, 76]},
          {name: "Series 2", items: [50, 38, 46, 54]},
          {name: "Series 3", items: [34, 22, 30, 32]},
          {name: "Series 4", items: [18, 6, 14, 22]}];
      var bubbleSeries = [{name: "Series 1", items: [{x: 15, y: 25, z: 5, id: 'Series: 1; Group A'}, {x: 25, y: 30, z: 12, id: 'Series 1; Group B'}, {x: 25, y: 45, z: 12, id: 'Series 1; Group C'}, {x: 10, y: 50, z: 5, id: 'Series 1; Group D'}]},
          {name: "Series 2", items: [{x: 15, y: 15, z: 8, id: 'Series 2; Group A'}, {x: 25, y: 10, z: 7, id: 'Series 2; Group B'}, {x: 40, y: 50, z: 25, id: 'Series 2; Group C'}, {x: 20, y: 40, z: 15, id: 'Series 2; Group D'}]},
          {name: "Series 3", items: [{x: 10, y: 10, z: 8, id: 'Series 3; Group A'}, {x: 18, y: 55, z: 10, id: 'Series 3; Group B'}, {x: 30, y: 40, z: 15, id: 'Series 3; Group C'}, {x: 5, y: 15, z: 3, id: 'Series 3; Group D'}]},
          {name: "Series 4", items: [{x: 8, y: 20, z: 6, id: 'Series 4; Group A'}, {x: 11, y: 30, z: 8, id: 'Series 4; Group B'}, {x: 5, y: 35, z: 10, id: 'Series 4; Group C'}, {x: 40, y: 20, z: 11, id: 'Series 4; Group D'}]}];
      var scatterSeries = [{name: "Series 1", items: [{x: 15, y: 25, id: 'Series: 1; Group A'}, {x: 25, y: 30, id: 'Series 1; Group B'}, {x: 25, y: 45, id: 'Series 1; Group C'}, {x: 10, y: 50, id: 'Series 1; Group D'}]},
          {name: "Series 2", items: [{x: 15, y: 15, id: 'Series 2; Group A'}, {x: 25, y: 10, id: 'Series 2; Group B'}, {x: 40, y: 50, id: 'Series 2; Group C'}, {x: 20, y: 40, id: 'Series 2; Group D'}]},
          {name: "Series 3", items: [{x: 10, y: 10, id: 'Series 3; Group A'}, {x: 18, y: 55, id: 'Series 3; Group B'}, {x: 30, y: 40, id: 'Series 3; Group C'}, {x: 5, y: 15, id: 'Series 3; Group D'}]},
          {name: "Series 4", items: [{x: 8, y: 20, id: 'Series 4; Group A'}, {x: 11, y: 30, id: 'Series 4; Group B'}, {x: 5, y: 35, id: 'Series 4; Group C'}, {x: 40, y: 20, id: 'Series 4; Group D'}]}];


      var groups = ["Group A", "Group B", "Group C", "Group D"];

      self.blacSeriesValue = ko.observableArray(blacSeries);
      self.bubbleSeriesValue = ko.observableArray(bubbleSeries);
      self.scatterSeriesValue = ko.observableArray(scatterSeries);
      self.groupsValue = ko.observableArray(groups);

      var selected = ['Series: 1; Group A', 'Series 1; Group B', 'Series 1; Group C', 'Series 1; Group D'];
      self.selectedItemsValue = ko.observableArray(selected);

      // Legend Data
      var legendSections = [{items : [{text : "Series 1",  color : attrGroups.getValue("Series 1")},
                                      {text : "Series 2",  color : attrGroups.getValue("Series 2")},
                                      {text : "Series 3",  color : attrGroups.getValue("Series 3")},
                                      {text : "Series 4",  color : attrGroups.getValue("Series 4")}]}];
      self.legendSections = ko.observableArray(legendSections);

      // Listen to selectInput and show live update of other components
      self.scatterSelectInput = function(event){
          $("#bubbleChart")[0].selection =  event.detail['items'];
          $("#barChart")[0].selection =  event.detail['items'];
          $("#areaChart")[0].selection =  event.detail['items'];
      }
      self.bubbleSelectInput = function(event){
          $("#scatterChart")[0].selection =  event.detail['items'];
          $("#barChart")[0].selection =  event.detail['items'];
          $("#areaChart")[0].selection =  event.detail['items'];
      }
      self.barSelectInput = function(event){
          $("#scatterChart")[0].selection =  event.detail['items'];
          $("#bubbleChart")[0].selection =  event.detail['items'];
          $("#areaChart")[0].selection =  event.detail['items'];
      }
      self.areaSelectInput = function(event){
          $("#scatterChart")[0].selection =  event.detail['items'];
          $("#bubbleChart")[0].selection =  event.detail['items'];
          $("#barChart")[0].selection =  event.detail['items'];
      }


      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CustomerViewModel();
  }
);
