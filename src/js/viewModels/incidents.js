/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar'],

 function(oj, ko, $) {
  
    function IncidentsViewModel() {
      var self = this;

      this.value5 = ko.observable(80);
      this.thresholdValues = [{max: 33}, {max: 67}, {}]
      
      self.getTooltip = function (data) {
        var tooltip;
        if (data.componentElement.id == "gauge")
          tooltip = "Value: " + data.label + "<br>Reference Lines: Low 33, Medium 67, High 100";
        else
          tooltip = "Value: " + data.label + "<br>Thresholds: Low 33, Medium 67, High 100";
        return {insert: tooltip};
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
    return new IncidentsViewModel();

   
  }
);