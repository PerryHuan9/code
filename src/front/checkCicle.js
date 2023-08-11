function isCircle(map, name, targetName = name) {
  const depSet = map.get(name);
  if (!depSet) return false;
  for (const dep of depSet) {
    if (dep === targetName) {
      return true;
    }
    if (isCircle(map, dep, targetName)) {
      return true;
    }
  }
  return false;
}

function checkCircleDep(deps) {
  const map = new Map();
  for (const dep of deps) {
    const set = new Set();
    for (const key in dep.dependencies) {
      const keyDeps = map.get(key);
      if (keyDeps?.has(dep.name)) {
        return true;
      }
      set.add(key);
    }
    map.set(dep.name, set);
  }

  for (const key of map.keys()) {
    if (isCircle(map, key)) {
      return true;
    }
  }

  return false;
}

module.exports = {
  checkCircleDep,
};
