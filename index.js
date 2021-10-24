'use strict';
// ==UserScript==
// @name         AutoInsta
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Auto follow, auto like
// @author       anilmaharjan.com.np
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle(`div.auto-insta-ui {
  background-color: rgba(255,255,255,0.5);
  border: 1px solid #ccc;
  margin: 2px;
  padding: 2rem;
  position: fixed;
  right:0;
  bottom:0;
  z-index: 99999;
}
div.auto-insta-ui h3{
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 2rem;
}
div.auto-insta-ui button{
  cursor: pointer;
  padding: 1rem 1.5rem;
  margin-bottom: 4px;
  background-color: #000;
  color: #fff;
  border: none;
}
div.auto-insta-ui button:last-child{
  background-color: #800;
}
div.auto-insta-ui button:focus{
  background-color: #585;
}
div.auto-insta-ui button:last-child:focus{
  background-color: #855;
}`);
(function () {
  'use strict';
  let currentInterval = null;
  const saveInstagramFollowersToLocalStorage = () => {
    const followers = [];
    const followerNodes = document.getElementsByClassName('FPmhX');
    for (let i = 0; i < followerNodes.length; i++) {
      const f = followerNodes[i];
      if (f.innerHTML) {
        followers.push(f.innerHTML);
      }
    }
    localStorage.setItem('instaFollowers', JSON.stringify(followers));
  };
  const getInstagramFollowers = () => {
    const instagramFollowersLocal = localStorage.getItem('instaFollowers');
    if (instagramFollowersLocal) {
      JSON.parse(instagramFollowersLocal);
    }
  };
  const getInstagramFollowersCount = () => getInstagramFollowers.length;
  const autoFollowList = () => {
    let followCount = 0;
    const followInterval = setInterval(() => {
      const nextFollowBtn = document.querySelectorAll('.y3zKF')[0];
      nextFollowBtn.click();
      followCount++;
      console.log({ followCount });
      if (followCount > 49) {
        clearInterval(followInterval);
      }
      setTimeout(() => {
        nextFollowBtn.scrollIntoView();
      }, 1000);
    }, 2000);
    currentInterval = followInterval;
  };
  const autoLikeList = () => {
    let likeCount = 0;
    const likeInterval = setInterval(() => {
      const nextLike = document.querySelectorAll(
        '.fr66n button [aria-label=Like]'
      )[0];
      const btn = nextLike.closest('button');
      if (btn) {
        btn.click();
        likeCount++;
        console.log({ likeCount });
        if (likeCount > 49) {
          clearInterval(likeInterval);
        }
      } else {
        console.log('Like button not found, scroll DOWN!!');
      }
    }, 1000);
    currentInterval = likeInterval;
  };
  const autoLikePage = () => {
    let likeCount = 0;
    const likeInterval = setInterval(() => {
      const nextLike = document.querySelectorAll(
        '.fr66n button [aria-label=Like]'
      )[0];
      const btn = nextLike.closest('button');
      if (btn) {
        btn.click();
        likeCount++;
        console.log({ likeCount });
        setTimeout(() => {
          document.querySelector('.coreSpriteRightPaginationArrow').click();
        }, 1000);
        if (likeCount > 49) {
          clearInterval(likeInterval);
        }
      } else {
        console.log('Like button not found, scroll DOWN!!');
      }
    }, 2000);
    currentInterval = likeInterval;
  };
  const clearCurrentTask = () => {
    if (currentInterval) {
      clearInterval(currentInterval);
    }
  };
  const createUIButton = (label = 'Button', clickHandler) => {
    const btn = document.createElement('button');
    btn.innerHTML = label;
    btn.addEventListener('click', clickHandler);
    return btn;
  };
  const autoInstaUI = document.createElement('div');
  autoInstaUI.className = 'auto-insta-ui';
  const uiHead = document.createElement('h3');
  uiHead.innerHTML = 'AutoInsta';
  autoInstaUI.appendChild(uiHead);
  autoInstaUI.appendChild(createUIButton('Like list', autoLikeList));
  autoInstaUI.appendChild(createUIButton('Like Page', autoLikePage));
  autoInstaUI.appendChild(createUIButton('Follow', autoFollowList));
  autoInstaUI.appendChild(
    createUIButton('Clear current task', clearCurrentTask)
  );
  document.body.appendChild(autoInstaUI);
})();
