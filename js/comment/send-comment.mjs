import { auth } from "../logout/authorize.mjs";
import { openComment } from "./comments.mjs";
export async function sendComment(id, data) {
  const commentInput = document.getElementById(`${data.id}-input`);
  if (commentInput.value) {
    console.log(typeof id, id);
    let comBody = "";
    if (typeof id === "string") {
      comBody = {
        body: commentInput.value,
        replyToId: parseInt(id),
      };
    } else {
      comBody = {
        body: commentInput.value,
      };
    }
    try {
      //   console.log(comBody);
      const res = await fetch(
        `https://api.noroff.dev/api/v1/social/posts/${data.id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(comBody),
        }
      );
      //   console.log(res.json());
      if (res.ok) {
        openComment(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
