/*
 * ------------------------------
 * Copyright SIS (c) 2015.
 * ------------------------------
 *
 * Module: StreamingService
 *
 * Last Updated: aphillips - 15/07/15 12:53
 *
 * -------------------------------
 */

/**
 * Created by aphillips on 05/05/2015.
 */
define(['module'], function(module) {

    function sortByName(array, key) {
        return array.sort(function(a,b){
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function getRequestUrl(url, userID, customer, player, fullyAdaptiveSupport) {
        return url + "/StreamingService/getUrl?userId="+userID+"&customer="+customer+"&player="+player+"&adaptive="+fullyAdaptiveSupport;
    }

    return {
        processPlaylist: function(response, SisPlayer) {

            var serverChannels = response['channels'];

            sortByName(serverChannels, 'name');

            // Long javascript workaround to function with  < IE9
            var channelCount = 0;
            for (var channel in serverChannels) {
                if (serverChannels.hasOwnProperty(channel)) {
                    channelCount++;
                }
            }

            var playlist = [];

            for (var x = 0; x < +channelCount; x++) {
                var sourceObject = {};
                var channel = [];

                var serverChannel = serverChannels[x];

                // Create the objects for each file.
                var rtmpFile = {};
                rtmpFile["file"] = serverChannel['rtmpUrl'];
                var hlsFile = {};
                hlsFile["file"] = serverChannel['hlsCallbackUrl'];

                // Add those files to the channel.
                channel.push(rtmpFile);
                channel.push(hlsFile);

                // Add that channel to sources.
                sourceObject["sources"] = channel;
                sourceObject["title"] = serverChannel['name'];
                var showLogo = serverChannel['logoImage'];
                if(showLogo) {
                    sourceObject["image"] = showLogo;
                } else {
                    sourceObject["image"] = SisPlayer.channelLogo;
                }

                var description = serverChannel['description'];
                if(description) {
                    sourceObject["description"] = description;
                }

                playlist.push(sourceObject);
            }
            return playlist;
        },

        processPlaylistForSisVdn: function(response, SisPlayer) {
            var serverChannels = response['channels'];

            sortByName(serverChannels, 'name');

            // Long javascript workaround to function with  < IE9
            var channelCount = 0;
            for (var channel in serverChannels) {
                if (serverChannels.hasOwnProperty(channel)) {
                    channelCount++;
                }
            }

            var playlist = [];

            for (var x = 0; x < +channelCount; x++) {
                var sourceObject = {};
                var channel = [];

                var serverChannel = serverChannels[x];

                var hlsFile = {};
                hlsFile["file"] = serverChannel['hlsCallbackUrl'];

                // Add those files to the channel.
                channel.push(hlsFile);

                // Add that channel to sources.
                sourceObject["sources"] = channel;
                sourceObject["title"] = serverChannel['name'];
                var showLogo = serverChannel['logoImage'];
                if(showLogo) {
                    sourceObject["image"] = showLogo;
                } else {
                    sourceObject["image"] = SisPlayer.channelLogo;
                }

                var description = serverChannel['description'];
                if(description) {
                    sourceObject["description"] = description;
                }

                playlist.push(sourceObject);
            }
            return playlist;
        },
        callSisVdnService: function(url, callback) {
            if(window.XDomainRequest){
                xhReq = new XDomainRequest();
                xhReq.open('get', url);

                xhReq.onload = function() {
                    callback(JSON.parse(xhReq.responseText));
                };

                xhReq.onerror = function() {
                    callback(null);
                };

                xhReq.ontimeout = function() {
                    callback(null);
                };
                xhReq.send()
            }
            else {
                if (window.XMLHttpRequest){
                    xhReq = new XMLHttpRequest();
                }
                else {
                    xhReq = new ActiveXObject();
                }

                xhReq.open('GET', url, true);

                xhReq.onreadystatechange = function() {
                    if(xhReq.readyState === 4 && xhReq.statusText === 'OK'){
                        var response = xhReq.responseText;
                        callback(JSON.parse(response));
                    }
                };
                xhReq.send(null);
            }
        },
        callStreamingService: function(url, userID, customer, player, fullyAdaptive, callback) {
            var xhReq;
            if(window.XDomainRequest){
                xhReq = new XDomainRequest();
                xhReq.open('get', getRequestUrl(url, userID, customer, player, fullyAdaptive));

                xhReq.onload = function() {
                    if(xhReq.responseText.indexOf('No Channels available for this customer at this time.') > -1) {
                        console.log("No active schedules");
                        callback(null);
                    } else {
                        callback(JSON.parse(xhReq.responseText));
                    }
                };

                xhReq.onerror = function() {
                    callback(null);
                };

                xhReq.ontimeout = function() {
                    callback(null);
                };
                xhReq.send()
            }
            else {
                if (window.XMLHttpRequest){
                    xhReq = new XMLHttpRequest();
                }
                else {
                    xhReq = new ActiveXObject();
                }

                xhReq.open('GET', getRequestUrl(url, userID, customer, player, fullyAdaptive), true);

                xhReq.onreadystatechange = function() {
                    if(xhReq.readyState === 4 && xhReq.statusText === 'OK'){
                        var response = xhReq.responseText;
                        if(response.indexOf('No Channels available for this customer at this time.') > -1) {
                            console.log("No active schedules");
                            callback(null);
                        } else {
                            callback(JSON.parse(response));
                        }
                    }
                };
                xhReq.send(null);
            }
        }
    }
});
