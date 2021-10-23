export const saveInstagramFollowersToLocalStorage = () => {
  const followers = [];
  const followerNodes = document.getElementsByClassName('FPmhX');
  for (let i = 0; i < followerNodes.length; i++) {
    const f: Element = followerNodes[i];
    if (f.innerHTML) {
      followers.push(f.innerHTML);
    }
  }
  localStorage.setItem('instaFollowers', JSON.stringify(followers));
};

export const getInstagramFollowers = () => {
  const instagramFollowersLocal = localStorage.getItem('instaFollowers');
  if (instagramFollowersLocal) JSON.parse(instagramFollowersLocal);
};
export const getInstagramFollowersCount = () => getInstagramFollowers.length;
