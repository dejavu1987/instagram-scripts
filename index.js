"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveInstagramFollowersToLocalStorage = function () {
    var followers = [];
    var followerNodes = document.getElementsByClassName('FPmhX');
    for (var i = 0; i < followerNodes.length; i++) {
        var f = followerNodes[i];
        if (f.innerHTML) {
            followers.push(f.innerHTML);
        }
    }
    localStorage.setItem('instaFollowers', JSON.stringify(followers));
};
exports.getInstagramFollowers = function () {
    var instagramFollowersLocal = localStorage.getItem('instaFollowers');
    if (instagramFollowersLocal)
        JSON.parse(instagramFollowersLocal);
};
exports.getInstagramFollowersCount = function () { return exports.getInstagramFollowers.length; };
