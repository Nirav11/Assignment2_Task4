      require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/ImageryLayer",
        "esri/layers/support/RasterFunction"
      ], (Map, MapView, ImageryLayer, RasterFunction) => {
        /***************************************
         * Set up popup template of image layer
         **************************************/

        const imagePopupTemplate = {
          // autocasts as new PopupTemplate()
          title: "Data from {SensorName} satellite",
          content: `
            Rendered RGB values: <b>{Raster.ServicePixelValue} </b>
            <br>Original values (B, G, R, NIR): <b>{Raster.ItemPixelValue} </b>
            `
        };

        /*******************************************************************
         * Create image layer with server defined raster function templates
         ******************************************************************/

        const serviceRFT = new RasterFunction({
          functionName: "TorontoFalseColor",
          variableName: "Raster"
        });

        const layer = new ImageryLayer({
          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Toronto/ImageServer",
          rasterFunction: serviceRFT,
          popupTemplate: imagePopupTemplate
        });

        /*************************
         * Add image layer to map
         ************************/

        const map = new Map({
          basemap: "hybrid",
          layers: [layer]
        });

        const view = new MapView({
          container: "viewDiv",
          map: map,
          center: {
            // autocasts as esri/geometry/Point
            x: -8836932.6501,
            y: 5411004.902699997,
            spatialReference: 3857
          },
          zoom: 13,
          popup: {
            actions: []
          }
        });
      });
