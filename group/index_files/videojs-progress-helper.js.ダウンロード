/**
 * Video.js Progress helper
 *
 * This plugin for Video.js adds a progress bar clickable padding
 */

(function(window, videojs) {
    'use strict';

    /***********************************************************************************
     * Register the plugin with videojs, main plugin function
     ***********************************************************************************/
    videojs.plugin('ProgressHelper', function(options) {
        var player = this;
        var helper;

        helper = new videojs.ProgressControl(player, {
            el: videojs.Component.prototype.createEl(null, {
                className: 'vjs-progress-helper'
            })
        });

        player.controlBar.addChild(helper);
    });

})(window, window.videojs);
