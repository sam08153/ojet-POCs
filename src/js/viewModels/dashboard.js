/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojknockout','ojs/ojfilepicker', 'ojs/ojinputtext', 'ojs/ojchart','ojs/ojtreemap', 'ojs/ojgauge',
'ojs/ojpictochart',  'ojs/ojtable', 'ojs/ojbutton'],
 function(oj, ko, $, ArrayDataProvider) {
  
    function DashboardViewModel() {
      var self = this;
      
        self.multiple = ko.observableArray(['multiple']);
        self.multipleStr = ko.pureComputed(function () {
          return self.multiple()[0] ? "multiple" : "single";
        }, self);

        self.value = ko.observable('');
        
       
        self.acceptStr = ko.observable("file/*");
        self.acceptArr = ko.pureComputed(function () {
          var accept = self.acceptStr();
          return accept ? accept.split(",") : [];
        }, self);

        self.fileNames = ko.observableArray([]);
        

        self.buttonClick = function(event){
          if($('#picker').is(':visible')){
            $('#picker').hide();
            $('#text-area').show();
          }else{
            $('#picker').show();
            $('#text-area').hide();            
          }

      }
      self.selectListener = function (event) {
        var files = event.detail.files;
        if(files[0].name != null){
          self.value(files[0].name);
          $('#picker').hide();
          $('#text-area').show();
        }
      }
       
      //line chart
      self.stackValue = ko.observable('off');
      self.orientationValue = ko.observable('vertical');
      self.locationValue = ko.observable('back');
      self.refObjTypeValue = ko.observable('area');
      self.refObjItemsTypeValue = ko.observable('constant');
      self.axisValue = ko.observable('xAxis');
      
      /* chart data */
      var arr = [];
      for (var i=0, t=40; i<1000; i++) {
        arr.push(Math.round(Math.random() * 20))
      }
      //document.write(arr);
      var areaSeries = [{name : "Series 1", items : arr}];
      console.log(arr)
      
      var areaGroups = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
      
      this.areaSeriesValuea = ko.observableArray(areaSeries);
      this.areaGroupsValuea = ko.observableArray(areaGroups);
       var converterFactory = oj.Validation.converterFactory('number');
                    var converterOptions = {style: 'percent'};
                    this.yConverter = converterFactory.createConverter(converterOptions);
      
      /* reference object example data */
      var constantAreaX = {referenceObjects:[
        {text:'Reference Object', type: 'area', low: 0.5, high: 1.5, color: 'rgba(160,206,236,0.5)', displayInLegend: 'on', location: 'back', shortDesc: 'Sample Reference Area'}    
      ]};
      self.yAxisData = ko.observable({});
      self.xAxisData = ko.observable(constantAreaX);


      //area chart
      var createPercentData = function (values) {

        var items = [];
        for (var i = 0; i < values[0].length; i++) {
            items.push([]);
        }
        for (var j = 0; j < values.length; j++) {
            var group = values[j];
            var sum = group.reduce(function (a, b) {
                return a + b;
            });
            for (var i = 0; i < group.length; i++) {
                items[i].push(group[i] / sum);
            }
        }
        return items;
    };
    
    var areaGroupValues = [[74, 42, 70, 46], [50, 58, 46, 54], [34, 22, 30, 32], [18, 6, 14, 22], [34, 30, 50, 46]];
    var areaSeriesItems = createPercentData(areaGroupValues);
    var areaSeries = [{name: "Series 1", items: areaSeriesItems[0]},
        {name: "Series 2", items: areaSeriesItems[1]},
        {name: "Series 3", items: areaSeriesItems[2]},
        {name: "Series 4", items: areaSeriesItems[3]}];
    var areaGroups = ["Group A", "Group B", "Group C", "Group D", "Group E"];

    this.areaSeriesValue = ko.observableArray(areaSeries);
    this.areaGroupsValue = ko.observableArray(areaGroups);

    var converterFactory = oj.Validation.converterFactory('number');
    var converterOptions = {style: 'percent'};
    this.yConverter = converterFactory.createConverter(converterOptions);


        //tree map
        var handler = new oj.ColorAttributeGroupHandler();
        var unitedStates = createNode("United States", 301461533, 51425);
        var reg_SO = createNode("South Region", 110450832, 47204);
        var div_SA = createNode("South Atlantic", 57805475, 50188);
        addChildNodes(unitedStates, [reg_SO]);
        addChildNodes(reg_SO, [div_SA]);
        addChildNodes(div_SA, [
          createNode("Delaware", 863832, 57618),
          createNode("District of Columbia", 588433, 56519),
          createNode("Florida", 18222420, 47450),
          createNode("Georgia", 9497667, 49466),
          createNode("Maryland", 5637418, 69475),
          createNode("North Carolina", 9045705, 45069),
          createNode("South Carolina", 4416867, 43572),
          createNode("Virginia", 7721730, 60316),
          createNode("West Virginia", 1811403, 37356)
      ]);

      self.nodeValues = ko.observableArray([unitedStates]);

      function createNode(label, population, meanIncome) {
        return {label: label,
                id: label,
                value: population,
                color: getColor(meanIncome),
                shortDesc: "&lt;b&gt;" + label +
                  "&lt;/b&gt;&lt;br/&gt;Population: " + 
                  population+"&lt;br/&gt;Income: " + meanIncome};
    }
    
    function getColor(meanIncome) {
        if (meanIncome < 45000) // 1st quartile
            return handler.getValue('1stQuartile');
        else if (meanIncome < 49000) // 2nd quartile
            return handler.getValue('2ndQuartile');
        else if (meanIncome < 56000) // 3rd quartile
            return handler.getValue('3rdQuartile');
        else
            return handler.getValue('4thQuartile');
    }
    
    function addChildNodes(parent, childNodes) {
        parent.nodes = [];
        for (var i = 0; i < childNodes.length; i++) {
            parent.nodes.push(childNodes[i]);
        }
    }

    //bubble series chart
    var bubbleSeries = [{name : "Series 1", items : [{x:15, y:25, z:5}, {x:25, y:30, z:12}, {x:25, y:45, z:12}]},
    {name : "Series 2", items : [{x:15, y:15, z:8}, {x:20, y:35, z:14}, {x:40, y:55, z:35}]},
    {name : "Series 3", items : [{x:10, y:10, z:8}, {x:18, y:55, z:10}, {x:40, y:50, z:18}]},
    {name : "Series 4", items : [{x: 8, y:20, z:6}, {x:11, y:30, z: 8}, {x:30, y:40, z:15}]}];

    var bubbleGroups = ["Group A", "Group B", "Group C"];


    this.bubbleSeriesValue = ko.observableArray(bubbleSeries);
    this.bubbleGroupsValue = ko.observableArray(bubbleGroups);


    //barchar

    var categories = ["Initial", "Qualification", "Meeting", "Proposal", "Close"];
    var hiddenCategories = [categories[0]];
    self.hiddenCategoriesValue = ko.observableArray(hiddenCategories);

    var timeSeries = [{name: categories[0], items: [74, 62, 70, 76, 66]},
    {name: categories[1], items: [50, 38, 46, 54, 42]},
    {name: categories[2], items: [34, 22, 30, 32, 26]},
    {name: categories[3], items: [18, 6, 14, 22, 10]},
    {name: categories[4], items: [3, 2, 3, 3, 2]}];
    var timeGroups = [1980, 1990, 2000, 2010, 2020];

    self.timeSeriesValue = ko.observableArray(timeSeries);
    self.timeGroupsValue = ko.observableArray(timeGroups);


    //line chart

    self.orientationValue = ko.observable('vertical');
        
    /* chart data */
    var lineSeries = [{name : "Series 1", items : [74, 62, 70, 76, 66]},
                      {name : "Series 2", items : [50, 38, 46, 54, 42]},
                      {name : "Series 3", items : [34, 22, 30, 32, 26]},
                      {name : "Series 4", items : [18,  6, 14, 22, 10]}];

    var lineGroups = ["Jan", "Feb", "Mar", "Apr", "May"];
    this.lineSeriesValue = ko.observableArray(lineSeries);
    this.lineGroupsValue = ko.observableArray(lineGroups);

    //guage

    self.getTooltip = function (data) {
      var tooltip;
      if (data.componentElement.id == "gauge")
        tooltip = "Value: " + data.label + "<br>Reference Lines: Low 33, Medium 67, High 100";
      else
        tooltip = "Value: " + data.label + "<br>Thresholds: Low 33, Medium 67, High 100";
      return {insert: tooltip};
    } 

    this.thresholdValues = [{max: 33}, {max: 67}, {}];
    this.value5 = ko.observable(80);

    //bar

    /* chart data */
    var barGroupValues = [[42, 55, 36, 22, 22], [34, 30, 50, 46, 46]];

    // Function to create the percent data
    var createPercentData = function (values) {

        var items = [];
        for (var i = 0; i < values[0].length; i++) {
            items.push([]);
        }
        for (var j = 0; j < values.length; j++) {
            var group = values[j];
            var sum = group.reduce(function (a, b) {
                return a + b;
            });
            for (var i = 0; i < group.length; i++) {
                items[i].push(group[i] / sum);
            }
        }
        return items;
    };
    
    // Data for the bar chart
    var barSeriesItems = createPercentData(barGroupValues);
    var barSeries = [{name: "Series 1", items: barSeriesItems[0]},
        {name: "Series 2", items: barSeriesItems[1]}
      ];
    var barGroups = ["Group A", "Group B"];

    this.barSeriesValue = ko.observableArray(barSeries);
    this.barGroupsValue = ko.observableArray(barGroups);
    var converterFactory = oj.Validation.converterFactory('number');
    var converterOptions = {style: 'percent'};
    this.yConverter = converterFactory.createConverter(converterOptions);



    var colorHandler = new oj.ColorAttributeGroupHandler();
        this.barColor = colorHandler.getValue('barColor');
        this.rangeBarColor = colorHandler.getValue('rangeBarColor');
        this.lineColor = colorHandler.getValue('lineColor');
        this.lineWithAreaColor = colorHandler.getValue('lineWithAreaColor');
        this.areaColor = colorHandler.getValue('areaColor');
        this.rangeAreaColor = colorHandler.getValue('rangeAreaColor');
        
        /* chart data */
        var values = [5, 8, 2, 7, 0, 9, 2, 3, 4, 2];
        
        this.sparkValues = ko.observableArray(values);
        
        var rangeValues = [{low: 5, high: 9},
                           {low: 3, high: 7},
                           {low: 3, high: 8},
                           {low: 5, high: 10},
                           {low: 7, high: 14},
                           {low: 8, high: 13},
                           {low: 6, high: 11},
                           {low: 4, high: 9},
                           {low: 1, high: 5},
                           {low: 2, high: 8}];
        
        this.sparkRangeValues = ko.observableArray(rangeValues);


//

var deptArray = [{EmployeeId: 5, Photo: 'images/dvt/1.png',FirstName: 'Amy', LastName: 'Bartlet', Revenue: 100000, Rating: 1, TargetComplete: 20, TargetIncomplete: 80},
{EmployeeId: 10, Photo: 'images/dvt/10.png', FirstName: 'Andy', LastName: 'Jones', Revenue: 200000, Rating: 2, TargetComplete: 40, TargetIncomplete: 60},
{EmployeeId: 20, Photo: 'images/dvt/11.png', FirstName: 'Andrew', LastName: 'Bugsy', Revenue: 130000, Rating: 3, TargetComplete: 10, TargetIncomplete: 90},
{EmployeeId: 30, Photo: 'images/dvt/2.png', FirstName: 'Annette', LastName: 'Barnes', Revenue: 110000, Rating: 4, TargetComplete: 30, TargetIncomplete: 70},
{EmployeeId: 40, Photo: 'images/dvt/12.png', FirstName: 'Bob', LastName: 'Jones', Revenue: 230000, Rating: 5, TargetComplete: 70, TargetIncomplete: 30}];
self.dataprovider = new ArrayDataProvider(deptArray, {keyAttributes: 'EmployeeId'});



self.columnArray = [
            {"headerText": "Employee Name", 
             "sortable": "enabled", 
             "renderer": oj.KnockoutTemplateUtils.getRenderer("emp_name", true), 
             "sortProperty": "FirstName"},
            {"headerText": "Sales Target Achievement", 
             "field": "TargetAchievement",
             "sortable": "disabled",
             "renderer": oj.KnockoutTemplateUtils.getRenderer("target", true)},
             {"headerText": "Sales Target Achievement", 
             "field": "TargetAchievement",
             "sortable": "disabled",
             "renderer": oj.KnockoutTemplateUtils.getRenderer("target", true)}];

             this.value4 = ko.observable(60);
             this.thresholdValues = [{max: 33}, {max: 67}, {}];



             
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
        $('#text-area').hide();
        
      };
      
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      
      function basicModel() {
        
      }




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
    return new DashboardViewModel();
  }
);
