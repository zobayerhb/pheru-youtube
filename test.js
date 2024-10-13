function getVideosLength(time) {
  const hour = parseInt(time / 3600);
  let remainingSeconds = parseInt(time % 3600);
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return ` ${hour} hour ${minute} minute ${remainingSeconds} sec `
}
console.log(getVideosLength(16278));
