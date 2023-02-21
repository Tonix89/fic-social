export function tagsArray(data, tagList) {
  const arrOfTags = [];
  data
    .filter((tagFilter) => {
      // console.log(tagFilter.tags);
      if (tagFilter.tags[0]) {
        return true;
      }
    })
    .filter((tagFilter) => {
      //   console.log(tagFilter);
      if (tagFilter.tags.length === 1) {
        arrOfTags.push(tagFilter.tags[0]);
        return true;
      } else {
        tagFilter.tags.forEach((singleTag) => {
          arrOfTags.push(singleTag);
        });
      }
    });
  //   console.log(arrOfTags);

  arrOfTags.forEach((tags) => {
    const list = document.createElement("li");
    list.className = "dropdown-item btn postTags";
    const listText = document.createTextNode(tags);
    list.appendChild(listText);
    tagList.appendChild(list);
  });
}
