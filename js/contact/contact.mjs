import { following } from "./following.mjs";

/**
 * This function extract informations of who is the login user's following and followers.
 * Then combine following and follower to a new array with no repeatition of object.
 * The new array will be used to a contact container.
 * @param {Array} data This is an array of data of the login user.
 * @example
 * ```js
 * // Determine if an object exist in both following and follower array. Set new object in follower array if follower or following is true.
 * const followers = data.followers;
 * const followings = data.following;
 * //Loop both follower and following and match their name object.
 *   if(follower.name !== following){
 *           // The object is only a follower
 *   }else{
 *      // The object is also a following
 *  }
 * // Remove object in following array that match in follower array to avoid repeatition.
 * const newFollowingrray = // filter() the following array and return only if some() is not true.
 * // Combine newFollowingarray and follower array.
 * const newDataArray = [...newFollowingArray, ...follower];
 * ```
 */
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
