/**
SIS Streaming Platform Javascript Player

@author SIS
@copyright SIS 2015

The content of this file is not to be edited in any way.
**/

requirejs.config({
    baseUrl: 'sisplayer',
    paths: {
        app: ''
    }
});


define(['jwplayer', 'level3player', 'json2', 'config', 'domReady', 'playerUtils', 'moment', 'jquery', 'flipclock'], function(player, level3player, json2, config, domReady, playerUtils, moment, jQuery, flipclock) {

    console.log(config);
    var userID = config.userID;
    var customer = config.customer;
    var playerID = config.playerID;
    var URL = config.URL;
    var fullyAdaptive = config.fullyAdaptive;
    console.log(fullyAdaptive);

    domReady(function() {
        if(urlHasParams()) {
            getRequestedStream();
        } else {
            getStreamUrl(userID, customer, playerID, fullyAdaptive);
        }
    });

    <!-- Init player -->
    jwplayer.key = "HxmttXLgfKzbdYkqZ8MSoiGJ8suGX6ZeyUPYOg==";


// Is populated in the createPlaylist() function.
    var playlist;

//Configure Player Object
    function SisPlayer() {
        config.playerHeight == null || config.playerHeight == '' ? this.playerHeight = '500' : this.playerHeight = config.playerHeight;
        config.playerWidth == null || config.playerWidth == '' ? this.playerWidth = '1000' : this.playerWidth = config.playerWidth;
        config.playerTitle == null || config.playerTitle == '' ? this.playerTitle = 'Player' : this.playerTitle = config.playerTitle;
        config.aspectRatio == null || config.aspectRatio == '' ? this.aspectRatio = '16:9' : this.aspectRatio = config.aspectRatio;
        config.listbarSize == null || config.listbarSize == '' ? this.listbarSize = 222 : this.listbarSize = config.listbarSize;
        config.autoStart == null || config.autoStart == '' ? this.autoStart = 'true' : this.autoStart = config.autoStart;
        config.channelLogo == null || config.channelLogo == '' ? this.channelLogo = './img/totepool_logo.jpg' : this.channelLogo = config.channelLogo;
    }

//Configuration for the player.
    var SisPlayer = new SisPlayer();


    function getStreamUrl(userID, customer, player, fullyAdaptive) {
        playerUtils.callStreamingService(URL, userID, customer, player, fullyAdaptive, function(response){
            if(response!=null){
                playlist = playerUtils.processPlaylist(response, SisPlayer);
                createPlayers();
            } else {
                document.getElementById('playerDiv').innerHTML = "No active schedules"
            }
        });
    }

    function getRequestedStream() {

        var nvb = new Date (moment(urlParams().nvb, "YYYYMMDDHHmmss"));
        var nva = new Date (moment(urlParams().nva, "YYYYMMDDHHmmss"));

        if(moment().isBefore(nvb)) {
            initialisePlayerDivSize()
            showCountdownBeforeScheduleStart(nvb)
            setTimeoutOnScheduleFinish(showMessageAfterScheduleFinish, nva)
        } else if(moment().isSame(nvb) || (moment().isAfter(nvb) && moment().isBefore(nva))) {
            hideOverlay();
            getTokenisedStream()
            setTimeoutOnScheduleFinish(showMessageAfterScheduleFinish, nva)
        } else {
            initialisePlayerDivSize()
            showMessageAfterScheduleFinish()
        }

    }

    function getTokenisedStream() {
        var url;

        $.ajax({
            type: "GET",
            url: "/StreamingService/stream/getTokenisedProductStream?" + getQueryString(),
            success: function (response) {
                if (response != null) {
                    if(response['channels'].length > 0) {
                        playlist = playerUtils.processPlaylist(response, SisPlayer);
                        createPlayers();
                        var timeout  = response['channels'][0]['timeout']
                        if(timeout != 0) {
                            setConfiguredProductTimeout(timeout)
                            setOnBeforePlayEvent(timeout)
                        }
                    } else {
                        console.log("Channel response is empty")
                    }
                }
            },
            error: function (xhr, textStatus, err) {
                console.log("readyState: " + xhr.readyState);
                console.log("responseText: " + xhr.responseText);
                console.log("status: " + xhr.status);
                console.log("text status: " + textStatus);
                console.log("error: " + err);
            }
        });
    }

    function createPlayers() {
        // setupAnalytics();
        if(playlist.length > 0) { //if there are no items in playlist do not create player.

            var listbar;

            if (playlist.length > 1) {
                listbar = {
                    position: "right",
                    size: SisPlayer.listbarSize
                }
            }

            jwplayer('playerDiv').setup({

                playlist:playlist,
                androidhls: true,
                title: SisPlayer.playerTitle,
                width: SisPlayer.playerWidth,
                height: SisPlayer.playerHeight,
                listbar: listbar,
                modes: [
                    { type: 'html5' },
                    { type: 'flash', src: '../../sisplayer/jwplayer.flash.swf' }
                ],
                aspectratio: SisPlayer.aspectRatio,
                fallback: 'true',
                autostart: SisPlayer.autoStart,
                primary: 'html5'
            });
        } else {
            document.getElementById('playerDiv').innerHTML = "No active schedules.";
        }

    }

    function showCountdownBeforeScheduleStart(nvb) {
        var diff = getTimeDiffFromCurrent(nvb)
        var clock = $('.count-down').FlipClock(diff,{
            clockFace: 'HourCounter',
            countdown: true,
            showSeconds: true,
            callbacks: {
                stop: function() {
                    hideOverlay();
                    //Had to add 2 seconds delay otherwise the getTokenisedProductStream end point is returning old cache...
                    //or empty if there is no previous cache present for the channel in question when the request is made on or just before nvb time.
                    //This will ensure getting the latest player urls.
                    setTimeout(getTokenisedStream, (2 * 1000))
                }
            }
        });

        createOverlay('overlay')
        placeCountdownTimerOnCenter()
    }

    function placeCountdownTimerOnCenter() {
        $(".count-down").css({
            top: ($('.overlay').height()/2 - $('.count-down').height()/2),
            left: ($('.overlay').width()/2 - $('.count-down').width()/2) + 200
        });
    }

    function showMessageAfterScheduleFinish() {
        jwplayer('playerDiv').stop()
        createOverlay('overlay-stream-finished')
    }

    function stopPlayerOnProductTimeout() {
        jwplayer('playerDiv').stop()
    }

    function setOnBeforePlayEvent(timeout) {
        jwplayer('playerDiv').onBeforePlay(function(){
            var nva = new Date (moment(urlParams().nva, "YYYYMMDDHHmmss"));
            if(moment().isBefore(nva)) {
                setConfiguredProductTimeout(timeout)
            } else {
                showMessageAfterScheduleFinish()
            }
        })
    }

    function createOverlay(className) {
        $('.' + className).css({
            display: 'block',
            width: $('#playerDiv').width(),
            height: $('#playerDiv').height(),
            top: $('#playerDiv').position().top,
            left: $('#playerDiv').position().left,
            position:'absolute',
            'background-color': 'grey'
        });
    }

    function  urlHasParams() {
        return location.search.slice(1).split('&')[0].length > 0
    }

    function urlParams() {
        var pairs = location.search.slice(1).split('&');

        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return result;
    }

    function getQueryString() {
        return location.search.slice(1).split('?');
    }

    function hideOverlay() {
        $('.overlay').css({display: 'none'})
    }

    function setConfiguredProductTimeout(timeout) {
        return setTimeout(stopPlayerOnProductTimeout, (timeout * 60 * 1000))
    }

    function setTimeoutOnScheduleFinish(fn, d){
        var t = d.getTime() - (new Date()).getTime();
        return setTimeout(fn, t);
    }

    function getTimeDiffFromCurrent(future) {
        var now = new Date();
        var diff = future.getTime()/1000 - now.getTime()/1000;
        return diff;
    }

    function initialisePlayerDivSize() {
        $('#playerDiv').height(config.playerHeight +'px')
        $('#playerDiv').width(config.playerWidth + 'px')
    }

});
