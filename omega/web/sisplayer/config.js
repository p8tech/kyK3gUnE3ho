/*
 * ------------------------------
 * Copyright SIS (c) 2015.
 * ------------------------------
 *
 * Module: StreamingService
 *
 * Last Updated: aphillips - 08/05/15 11:27
 *
 * -------------------------------
 */

/**
 * Created by aphillips on 03/10/2014.
 */

define(['module'], function(module) {
   return {
       userID: module.config().userID,
       customer: module.config().customer,
       playerID: module.config().playerID,
       playerWidth: module.config().playerWidth,
       playerHeight: module.config().playerHeight,
       playerTitle: module.config().playerTitle,
       aspectRatio: module.config().aspectRatio,
       autoStart: module.config().autoStart,
       listbarSize: module.config().listbarSize,
       channelLogo: module.config().channelLogo,
       URL: module.config().URL,
       fullyAdaptive: module.config().fullyAdaptive
   }
});
