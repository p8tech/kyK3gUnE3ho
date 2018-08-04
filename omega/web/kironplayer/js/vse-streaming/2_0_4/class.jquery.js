function streamingClass () {
    this.playerVersion = "2.00.04"; // M.mm.rr
    this.video_container_id = "vseVideoContainer";
    this.poster_url = "";
    this.channel = "";
    this.format = "json";
    this.tech = "html5";
    this.height = 360;
    this.width = 640;
    this.autostart = true;
    this.volume = 10;
    this.endpoint_script = "backend/server.php";
    this.min_version_flash = 12;
    this.language = "en-en"; //en-en, fr-fr and es-es
    this.playerInstance = "";
    this.jw_script_src = "https://content.jwplatform.com/libraries/etrrAkNn.js"; //URL jwplayer version 7
    this.clock_format= 12; // 12 or 24
    this.localtime = 1;
    
    this.create_player = function() {
        var self = this;
		
		var messages_i18n = (typeof streaming_vse_i18n[this.language] !== "undefined") ? streaming_vse_i18n[this.language] : streaming_vse_i18n["en-en"];
		
        if (this.poster_url != undefined && this.poster_url != "") {
            this.preloadImage(this.video_container_id, this.poster_url, "poster");
        }
        
        this.parameters = "product=" + this.channel + "&format=" + this.format + "&tech=" + this.tech + "&player_version=" + this.playerVersion + "&language=" + this.language;
        this.url = this.endpoint_script + "?" + this.parameters;

        this.i18n_translate(messages_i18n["connecting"]);
        
        $.ajax({
            url: this.url,
            type: "POST",
            crossDomain: "true",
            dataType: "json",
            context: this,
            error: function(a, b, c) {
               this.i18n_translate(messages_i18n["internal_error"]);
            },
            success: function(result, status, xhr) {
                if (result == undefined) {
                    this.i18n_translate(messages_i18n["unexpected_response_server"]);
                    return
                }
                else {
                    if (result.status.code == 200) {
                        if (result.streams[0] == undefined || result.streams.length == 0) {
                            if (result.maintenance == undefined) {
                                this.i18n_translate(messages_i18n["browser_not_compatible"]);
                            }
                            else {
                                this.i18n_translate(messages_i18n["server_maintenance"] + this.minutesToTime(result.maintenance.start) + messages_i18n["to"] + this.minutesToTime(result.maintenance.stop) + ".");
                            }
                            
                            return;
                        }
                        else {
                            
                            Modernizr.load({
                                load: [this.jw_script_src],
                                complete: function() {
                                    self.playerInstance = jwplayer(self.video_container_id);
                                    var url_2 = result["streams"][0]["src"].split("?");
                                    $("#" + self.video_container_id + " video").prop("webkit-playsinline", true);
                                    $("#" + self.video_container_id + " video").prop("playsinline", true);
                                    $("#" + self.video_container_id + " video").attr("webkit-playsinline", true);
                                    $("#" + self.video_container_id + " video").attr("playsinline", true);

                                    self.playerInstance.setup({
                                        hlshtml: "true",
                                        primary: "html5",
                                        "autostart": self.autostart,
                                        "height": self.height,
                                        "width": self.width,
                                        file: url_2[0].trim(),
                                        rtmp: { subscribe: true }
                                    });
                                    
                                    $("#" + self.video_container_id + " video").prop("webkit-playsinline", true);
                                    $("#" + self.video_container_id + " video").prop("playsinline", true);
                                    $("#" + self.video_container_id + " video").attr("webkit-playsinline", true);
                                    $("#" + self.video_container_id + " video").attr("playsinline", true);

                                    self.playerInstance.setVolume(self.volume);
                                    
                                    $("#" + self.video_container_id + " video").prop("webkit-playsinline", true);
                                    $("#" + self.video_container_id + " video").prop("playsinline", true);
                                    $("#" + self.video_container_id + " video").attr("webkit-playsinline", true);
                                    $("#" + self.video_container_id + " video").attr("playsinline", true);
                                    
                                    setTimeout(function(){ 
                                        $("#" + self.video_container_id + " video").prop("webkit-playsinline", true);
                                        $("#" + self.video_container_id + " video").prop("playsinline", true);
                                        $("#" + self.video_container_id + " video").attr("webkit-playsinline", true);
                                        $("#" + self.video_container_id + " video").attr("playsinline", true);
                                    }, 1000);
                                }
                            });
                        }
                    }
                    else {
                        this.i18n_translate(messages_i18n["internal_error"]);
                        return;
                    }
                }
            }
        });
    };
    
    this.i18n_translate = function(text) {
        $(".errorPlayer").remove();
        $("#" + this.video_container_id).append("<div class='errorPlayer'>" + text + "</div>");
    };
    
    this.minutesToTime = function(e) {
        e = parseInt(e);
        if (this.localtime) {
            var t = (new Date).getTimezoneOffset();
            e = -1 * t + e;
            if (e < 0) {
                e += 1440;
            } else if (e > 1440) {
                e -= 1440;
            }
        }
        e = Math.round(e);
        var n = Math.floor(e / 60);
        var r = Math.floor(e % 60);
        r = (r < 10 ? "0" : "") + r;
        if (this.clock_format == 12) {
            if (n > 11) {
                n -= 12;
                if (n == 0) {
                    n = 12;
                    r += "PM";
                } else {
                    r += "PM";
                }
            } else {
                r += "AM";
            }
        }
        var i = n + ":" + r;
        return i;
    };
    
    this.preloadImage = function(e, t, n) {
        var r = document.createElement("img");
        r.className = n;
        r.onload = function() {
            var t = document.getElementById(e);
            t.appendChild(this);
        };
        
        r.src = t;
    };
    
    this.destroy_player = function() {
        $("#" + this.video_container_id).html("");
        $("#" + this.video_container_id).removeClass("error");
        $("#" + this.video_container_id).removeClass("loading");
        $("#" + this.video_container_id).attr({
            style: ""
        });
    };
    
    this.resize = function() {
        $("#" + this.video_player_id).width = this.width;
        $("#" + this.video_player_id).height = this.height
    };
    
    this.getMute = function() {
        try {
            return jwplayer().getMute();
        } catch (t) {
            return void 0;
        }
    };
    
    this.setMute = function(s) {
        try {
            jwplayer().setMute(s);
        } catch (t) {
            return void 0;
        }
    };
    
    this.pause = function() {
        try {
            jwplayer().pause(true);
        } catch (t) {
            return void 0;
        }
    };
    
    this.play = function() {
        try {
            jwplayer().play(true);
        } catch (t) {
            return void 0;
        }
    };
    
    this.stop = function() {
        try {
            jwplayer().stop(true);
        } catch (t) {
            return void 0;
        }
    };
    
    this.getState = function() {
        try {
            if (void 0 != jwplayer)
                return jwplayer().getState();
            else
                return void 0;
        } catch (t) {
            return void 0;
        }
    };
    
    this.getVolume = function() {
        try {
            return jwplayer().getVolume();
        } catch (t) {
            return void 0;
        }
    };
    
    this.setVolume = function(volume) {
        try {
            jwplayer().setVolume(volume);
        } catch (t) {
            return void 0;
        }
    };
}

window.vse_streaming = new streamingClass;