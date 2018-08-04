var BranchLocator = (function (){
    'use strict';

    var configMap = {
        url: '/m/cms/variantui?name=bamboo::store_locations',
        frameUrl: '/shared/BranchLocator/index.html'
    };

    var stateMap = {
        status: null,
        results: null
    };

    var jqueryMap = {
        $container: null
    };

    // var getList = function() {
    //     stateMap.status = 'LOADING';
    //     //redraw
    //     MIFY.get(configMap.url, function(data) {
    //         console.log('aaaa',data);
    //         stateMap.status = 'LOADED';
    //         stateMap.results = data;

    //         jqueryMap.$container.html(NovaWeb.Templates['ui/locator']({
    //             title : 'Branch Locator',
    //             frameUrl: configMap.frameUrl,
    //             data: data
    //         }));
    //         //redraw
    //     }, function(){
    //         stateMap.status = 'ERROR';
    //         //redraw
    //     });
    // };

    // var getResults = function() {
    //     return stateMap.results;
    // }

    var initModule = function($container) {
        jqueryMap.$container = $container;
        jqueryMap.$container.html(NovaWeb.Templates['ui/locator']({
            title : 'Branch Locator',
            frameUrl: configMap.frameUrl,
        }));
        // getList();
    };

    return {
        initModule: initModule,
        // getResults: getResults
    }
}());

NovaWeb.BranchLocator = BranchLocator;
// export default BranchLocator;