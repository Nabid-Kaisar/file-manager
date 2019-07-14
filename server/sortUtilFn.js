let sortUtilFunctions = {
  sortDirByNameAscend: dir => {
    let sortedFolders = dir.folders.sort((obj1, obj2) => {
      return obj1.name.localeCompare(obj2.name);
    });
    let sortedFiles = dir.files.sort((obj1, obj2) => {
      return obj1.name.localeCompare(obj2.name);
    });
    dir.folders = sortedFolders;
    dir.files = sortedFiles;
    return dir;
  },
  sortDirByNameDescend: dir => {
    let sortedFolders = dir.folders.sort((obj1, obj2) => {
      return obj2.name.localeCompare(obj1.name);
    });
    let sortedFiles = dir.files.sort((obj1, obj2) => {
      return obj2.name.localeCompare(obj1.name);
    });
    dir.folders = sortedFolders;
    dir.files = sortedFiles;
    return dir;
  },
  sortDirBySizeAscend: dir => {
    let sortedFiles = dir.files.sort((obj1, obj2) => {
      return obj1.size - obj2.size;
    });
    dir.files = sortedFiles;
    return dir;
  },
  sortDirBySizeDescend: dir => {
    let sortedFiles = dir.files.sort((obj1, obj2) => {
      return obj2.size - obj1.size;
    });
    dir.files = sortedFiles;
    return dir;
  },
  sortDirByDateAscend: dir => {
    let sortedFolders = dir.folders.sort((obj1, obj2) => {
      return obj1.lastModified - obj2.lastModified;
    });
    let sortedFiles = dir.files.sort((obj1, obj2) => {
      return obj1.lastModified - obj2.lastModified;
    });
    dir.folders = sortedFolders;
    dir.files = sortedFiles;
    return dir;
  },
  sortDirByDateDescend: dir => {
    let sortedFolders = dir.folders.sort((obj1, obj2) => {
      return obj2.lastModified - obj1.lastModified;
    });
    let sortedFiles = dir.files.sort((obj1, obj2) => {
      return obj2.lastModified - obj1.lastModified;
    });
    dir.folders = sortedFolders;
    dir.files = sortedFiles;
    return dir;
  }
};

module.exports = sortUtilFunctions;
