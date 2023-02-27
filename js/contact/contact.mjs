import { following } from "./following.mjs";
export function getContact(data) {
  //   console.log(data.following, data.followers);
  const followers = data.followers;
  const followings = data.following;
  const set = { follower: true };
  const set1 = { following: true };

  followings.forEach((follow) => {
    followers.forEach((follower) => {
      if (follow.name !== follower.name) {
        follower = Object.assign(follower, set);
      } else {
        follow = Object.assign(follower, set1);
      }
    });
  });

  const newFollowingArray = followings.filter(
    (follow) => !followers.some((follower) => follower.name === follow.name)
  );
  //   console.log(followers, newFollowingArray);
  const newDataArray = [...newFollowingArray, ...followers];
  //   console.log(newDataArray);
  following(newDataArray);
}
