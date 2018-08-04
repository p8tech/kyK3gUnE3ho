var MIFY = {
  USER_KEY : "MIFY_USER",
  ANON_TOKEN_KEY : "MIFY_A_TOKEN",
  USER_TOKEN_KEY : "MIFY_U_TOKEN",
  LVS_INFO_KEY : "X-LVS-Information",
  TOKEN_KEY : "X-LVS-HSToken",
  LVS_PRICE_KEY: "MIFY_PRICE_FORMAT",
  LVS_PRICE_HEADER_KEY: "X-LVS-PriceFormat",
    LANGUAGE_KEY: "MIFY_LANG",
    LANGUAGE_HEADER_KEY: "Accept-Language",
    ACCOUNT_ID : 'MIFY_ACCOUNT_ID',
    TIMEZONE : '+07:00',
    LINE_ID: 2,
    ORIGIN_ID: 3,

    insertQueryStringInUrl: function(url, queryString, value) {

        if(hasQueryString(url)) {
            url = url + '&';
        } else {
            url = url + '?'
        }
        return url + queryString + '=' + value;

        function hasQueryString(url) {
            if(!url) return false
            var pattern = new RegExp(/.*?\?/);
            return pattern.test(url);
        }
    },



  log : function(obj) {
    // For now, assume we are in debug mode.
    //console.log(obj);
  },

  error : function(obj) {
    //console.error(obj);
  },

  setPriceFormatHeader : function(format) {
    localStorage.setItem(MIFY.LVS_PRICE_KEY, format);
  },

  getPriceFormatHeader : function() {
    return localStorage.getItem(MIFY.LVS_PRICE_KEY);
  },

    setLanguage : function(languageIsoCode) {
        localStorage.setItem(MIFY.LANGUAGE_KEY, languageIsoCode);
    },

    getLanguage : function() {
        return localStorage.getItem(MIFY.LANGUAGE_KEY);
    },

  logout : function() {
    localStorage.removeItem(MIFY.USER_TOKEN_KEY);
  },

  isLoggedIn : function() {
    if (localStorage.getItem(MIFY.USER_TOKEN_KEY) && localStorage.getItem(MIFY.ACCOUNT_ID)) {
      return true;
    } else {
      return false;
    }
  },

  get : function(url, success_callback, error_callback, options) {
    return MIFY.ajax('GET', url, null, success_callback, error_callback, options);
  },

  post : function(url, data, success_callback, error_callback) {
    return MIFY.ajax('POST', url, data, success_callback, error_callback);
  },

  put : function(url, data, success_callback, error_callback) {
    return MIFY.ajax('PUT', url, data, success_callback, error_callback);
  },

  "delete" : function(url, data, success_callback, error_callback) { // delete is quoted as it's a keyword that is causing issue with the JS minifier
    return MIFY.ajax('DELETE', url, data, success_callback, error_callback);
  },

  ajax : function(method, url, data, success_callback, error_callback, options) {
    // To mimic how JQuery works, the signatures for success() and error() are as follows:
    // success( PlainObject data, String textStatus, jqXHR jqXHR )
    // error( jqXHR jqXHR, String textStatus, String errorThrown )
    
    // this is used to check if a query string is already in the url
        // avoid duplicate query strings
        var isQueryStringInUrl = function(url, queryString) {
            if(url.indexOf('?'+queryString) > -1 ||  url.indexOf('&'+queryString) > -1) {
                return true;
            } else {
                return false;
            }
        };

        //forces to add lineId query string in URL if it does not have one yet
        if(method === 'GET' && !isQueryStringInUrl(url, 'lineId')) {
            url = MIFY.insertQueryStringInUrl(url, 'lineId', MIFY.LINE_ID);
        }
        if(method === 'GET' && !isQueryStringInUrl(url, 'originId')) {
            url = MIFY.insertQueryStringInUrl(url, 'originId', MIFY.ORIGIN_ID);
        }

    var start = new Date().getTime();
    var userToken = true;

    var token = localStorage.getItem(MIFY.USER_TOKEN_KEY);



    if(typeof options == "undefined" || options)
      options = {};

    if (options['token']) {
      token = options['token'];
    }

    if (token === null) {
      // We will get the machine specific anonymous token
      userToken = false;
      token = localStorage.getItem(MIFY.ANON_TOKEN_KEY);
      if (token === null && url != '/m/acc/token?lineId=' + MIFY.LINE_ID + '&originId=' + MIFY.ORIGIN_ID) {
        var ajax_start = new Date().getTime();

        MIFY.ajax(
          "GET",
          "/m/acc/token",
          null,
          function(data, xhr) {
            // Following this call, MIFY will have created a token in LocalStorage which is stored as a user token.
            // In this instance, the token will actually be an anonymous one, so we swap it.
            token = localStorage.getItem(MIFY.USER_TOKEN_KEY);
            localStorage.removeItem(MIFY.USER_TOKEN_KEY);
            localStorage.setItem(MIFY.ANON_TOKEN_KEY, token);
            // options['new_annon_token'] = true;
            MIFY.ajax(method, url, data, success_callback, error_callback, options);
          },
          function(xhr, status, error) {
            ajax_start = 0;
            error_callback(xhr, status, error);
          }, options
        );

        return;
      }
    }


    var xhr = new XMLHttpRequest();

    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true); // the 3rd parameter is Async
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      if (error_callback) {
        error_callback(xhr, "error", "CORS is not suppported");
      } else {
        console.error("error: CORS is not supported");
      }
      return;
    }

    xhr.timeout = 90000;
    if(url.indexOf("/uploadDepositForm") !== -1){
      xhr.setRequestHeader("Content-type", "image/jpeg");
    } else {
      xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    }

        if(url.indexOf("/fdr") !== -1){
            xhr.responseType = 'arraybuffer';
        }

    xhr.setRequestHeader('timezone', MIFY.TIMEZONE);

    if(token && url.indexOf("/m/acc/id") < 0)
      xhr.setRequestHeader(MIFY.TOKEN_KEY, token);
    var priceFormat = localStorage.getItem(MIFY.LVS_PRICE_KEY);
    if(priceFormat)
      xhr.setRequestHeader(MIFY.LVS_PRICE_HEADER_KEY, priceFormat);

        var language = MIFY.getLanguage();
        if (language) {
            xhr.setRequestHeader(MIFY.LANGUAGE_HEADER_KEY, language);
        }

    xhr.onload = function(e) {

      var responseReceived = new Date().getTime();

      var token = xhr.getResponseHeader(MIFY.TOKEN_KEY);
      if(options && options['ignore_new_token']) {
        console.log('Ignore token:', token);
      }
      else if (token) {
        localStorage.setItem(MIFY.USER_TOKEN_KEY, token);
      }

      var rc = parseInt(xhr.status.toString()[0]); // Get the first character.
      if (rc >= 4) {
        MIFY.error("-------------------");
        MIFY.error(method + " " + url + "[" + (responseReceived - start) + "ms]");
        MIFY.error(xhr);

        if ((xhr.status === 403 || xhr.status === 401) && !options['new_annon_token']) {
          var loggingIn = xhr.responseURL.indexOf('/m/acc/id') >= 0;
          var thirdPartyApiCall = xhr.responseURL.indexOf('/imggaming/') >= 0;
          if(userToken && !loggingIn && !thirdPartyApiCall) { // session timed out
            MIFY.logout();
            return;
          } else {
            var resp = JSON.parse(xhr.responseText);
            if (resp['message']){
              MIFY.error('Invalid anonymous token.');
                localStorage.removeItem(MIFY.ANON_TOKEN_KEY); // invalid anonymous token
                options['token'] = null;
              MIFY.ajax(method, url, data, success_callback, error_callback, options);
              return;
            }
          }
        }

        var info = xhr.getResponseHeader(MIFY.LVS_INFO_KEY);
        MIFY.error(info);
        if (error_callback) {
          error_callback(xhr, "error", xhr.status.toString() + " (" + info + ")");
        } else {
          console.error("error: " + xhr.status.toString() + " (" + info + ")");
        }

        var responseHandled = new Date().getTime();
        MIFY.error("Handled in " + (responseHandled - responseReceived) + "ms");
        MIFY.error("-------------------\n");

      } else if(xhr.status == 204 || (xhr.response == "" && xhr.status == 200)){ /* Execute success callback for no content response eg PUT: rgl/current */
                            if (success_callback) { success_callback(); }
                        }else{

        MIFY.log("-------------------");
        MIFY.log(method + " " + url + " [" + (responseReceived - start) + "ms]");
        MIFY.log(xhr);

        if (success_callback) {
          success_callback(MIFY.xml2array(xhr), xhr.status.toString(), xhr);
        }

        var responseHandled = new Date().getTime();
        MIFY.log("Handled in " + (responseHandled - responseReceived) + "ms");
        MIFY.log("-------------------\n");
      }
    };

    xhr.onerror = function(e) {
      var responseReceived = new Date().getTime();

      MIFY.error("-------------------");
      MIFY.error(method + " " + url + " [" + (responseReceived - start) + "ms]");
      MIFY.error(xhr);

      if (xhr.status === 403 && userToken) { // session timed out
        MIFY.logout();
        MIFY.ajax(method, url, data, success_callback, error_callback, options);
        return;
      }

      var info = xhr.getResponseHeader(MIFY.LVS_INFO_KEY);
      MIFY.error(info);
      if (error_callback) {
        error_callback(xhr, "error", xhr.status.toString() + " (" + info + ")");
      } else {
        console.error("error: " + xhr.status.toString() + " (" + info + ")");
      }

      var responseHandled = new Date().getTime();
      MIFY.error("Handled in " + (responseHandled - responseReceived) + "ms");
      MIFY.error("-------------------\n");

    };

    xhr.ontimeout = function(e) {
      var responseReceived = new Date().getTime();

      MIFY.error("-------------------");
      MIFY.error(method + " " + url + " [" + (responseReceived - start) + "ms]");
      MIFY.error(xhr);

      var info = xhr.getResponseHeader(MIFY.LVS_INFO_KEY);
      MIFY.error(info);
      if (error_callback) {
        error_callback(xhr, "timeout", xhr.status.toString() + " (" + info + ")");
      } else {
        console.error("timeout: " + xhr.status.toString() + " (" + info + ")");
      }

      var responseHandled = new Date().getTime();
      MIFY.error("Handled in " + (responseHandled - responseReceived) + "ms");
      MIFY.error("-------------------\n");

    }

    xhr.onabort = function(e){
      // console.log('xhr aborted',e);
    };

    if ((method === "POST" || method === "PUT" || method === "DELETE") && data) {
      xhr.send(data);
    } else {
      xhr.send();
    }

    return xhr;
    },

    init: function() {
      if (!localStorage.getItem(MIFY.USER_TOKEN_KEY)) {
        console.log('Initilizing connection to server...');
        MIFY.ajax(
          "GET",
          "/m/acc/token",
          null,
          function(data, xhr) {
            console.log('Connection to server successful');
          },
          function(xhr, status, error) {
            console.log('Error connecting to server...');
          }
        );
      } else {
        console.log('Found USER_TOKEN_KEY');
        if(localStorage.getItem(MIFY.ACCOUNT_ID)){
          MIFY.get('/m/acc/' + localStorage.getItem(MIFY.ACCOUNT_ID) + '/fin/bal', function(data) {
              console.log('Connection to server successful');
          }, function(){
            console.log('Error token key expired...');
          });
        }
      }
    },
  xml2array : function(res){
    try {
        if(/<?xml/.test(res.responseText) && typeof window.DOMParser != "undefined" && res.responseXML){
            return xml2array( res.responseXML.documentElement );
        }
        if(res.responseText !== "") {
            return JSON.parse(res.responseText);
        }
        return null;
    } catch(e) {
        return '';
    }
 }

};

