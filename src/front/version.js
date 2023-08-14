function getVersionArr(version) {
  return version.split('.').map((item) => parseInt(item));
}

function checkVersion(v1, v2) {
  const v1Arr = getVersionArr(v1);
  const v2Arr = getVersionArr(v2);
  for (let i = 0; i < v1Arr.length; i++) {
    if (!v2Arr[i] && v1Arr[i] !== 0) {
      return 1;
    }
    if (v1Arr[i] > v2Arr[i]) {
      return 1;
    }
    if (v1Arr[i] < v2Arr[i]) {
      return -1;
    }
  }
  if (v2Arr.length > v1Arr.length) {
    for (let i = v1Arr.length; i < v2Arr.length; i++) {
      if (v2Arr[i] !== 0) {
        return -1;
      }
    }
  }
  return 0;
}

module.exports = {
  checkVersion
}

