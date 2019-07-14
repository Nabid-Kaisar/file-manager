const fs = require("fs");
const flatten = require("flat");

let utilFunctions = {
  createEmptyFolderObj: (folderName, subFolderId, subFolderParentId) => {
    let d = new Date();
    let currentTime = d.getTime();
    return {
      name: folderName,
      type: "folder",
      hasChild: false,
      created: currentTime,
      lastModified: currentTime,
      subFolder: {
        folders: [],
        files: [],
        id: subFolderId,
        parentId: subFolderParentId
      }
    };
  },

  addFolder: (id, folderStructure, folderObj, parentId) => {
    if (id !== null) {
      if (id === "root") {
        folderStructure.folders.push(folderObj);
        return folderStructure;
      } else {
        let dirPathArr = id.split("-");
        let dirPath = folderStructure;
        let parentDir = "null";
        while (dirPathArr.length !== 0) {
          let singleDir = Number(dirPathArr.shift());
          parentDir = dirPath.folders[singleDir];
          dirPath = dirPath.folders[singleDir].subFolder;
        }
        dirPath.folders.push(folderObj);
        parentDir.hasChild = true;
        return folderStructure;
      }
    } else {
      //null folderDir id is not valid
      return folderStructure;
    }
  },

  addFile: (id, folderStructure, fileObj) => {
    if (id !== null) {
      if (id === "root") {
        folderStructure.files.push(fileObj);
        return folderStructure;
      } else {
        let dirPathArr = id.split("-");
        let dirPath = folderStructure;
        let parentDir = "null";
        while (dirPathArr.length !== 0) {
          let singleDir = Number(dirPathArr.shift());
          parentDir = dirPath.folders[singleDir];
          dirPath = dirPath.folders[singleDir].subFolder;
        }
        //hasChild value can be false even if it has files as childs
        dirPath.files.push(fileObj);
        return folderStructure;
      }
    } else {
      //null folderDir id is not valid
      return folderStructure;
    }
  },

  getDir: (id, folderStructure) => {
    if (id !== null) {
      if (id === "root") {
        return folderStructure;
      } else {
        let dirPathArr = id.split("-");
        let dirPath = folderStructure;
        let dirMetaData = folderStructure;
        while (dirPathArr.length !== 0) {
          let singleDir = Number(dirPathArr.shift());
          dirPath = dirPath.folders[singleDir].subFolder;
          dirMetaData = dirPath.folders[singleDir];
        }
        return dirPath;
      }
    } else {
      return folderStructure;
    }
  },
  isDirExist: dirPath => {
    if (fs.existsSync(dirPath)) {
      return true;
    } else return false;
  },

  addFolderToStorage: (folderName, dirPath) => {
    if (!fs.existsSync(`./public/${dirPath}${folderName}`)) {
      let folderDirArr = dirPath.split("/");
      let currentDir = `./public`;
      for (let i = 0; i < folderDirArr.length; i++) {
        currentDir += `/${folderDirArr[i]}`;
        if (!utilFunctions.isDirExist(currentDir)) {
          fs.mkdirSync(`${currentDir}`);
        }
      }
      if (!utilFunctions.isDirExist(`${currentDir}${folderName}`)) {
        fs.mkdirSync(`${currentDir}${folderName}`);
      }
      return true;
    } else {
      return false;
    }
  },

  searchDirByName: (searchStr, toSearchDir) => {
    let filteredFilesArr = toSearchDir.files.filter(file => {
      if (file.name.toLocaleLowerCase().match(searchStr.toLocaleLowerCase())) {
        return true;
      } else {
        return false;
      }
    });

    let filteredFoldersArr = toSearchDir.folders.filter(folder => {
      if (
        folder.name.toLocaleLowerCase().match(searchStr.toLocaleLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });

    toSearchDir.files = filteredFilesArr;
    toSearchDir.folders = filteredFoldersArr;

    return toSearchDir;
  },

  searchDirByType: (searchStr, toSearchDir) => {
    let filteredFilesArr = toSearchDir.files.filter(file => {
      if (
        file.format.toLocaleLowerCase().match(searchStr.toLocaleLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });

    toSearchDir.files = filteredFilesArr;
    toSearchDir.folders = [];

    return toSearchDir;
  },

  getFileMetaData: (fileName, fileDir) => {
    for (let i = 0; i < fileDir.files.length; i++) {
      if (fileDir.files[i].name === fileName) {
        return fileDir.files[i];
      }
    }
  },

  isFileExists: (req, fileName) => {
    let path;
    switch (req.body.fileType.split("/")[0]) {
      case "image":
        path = `public/Images/${req.body.dirToAdd}:${fileName}`;
        break;
      case "video":
        path = `public/Videos/${req.body.dirToAdd}:${fileName}`;
        break;
      case "audio":
        path = `public/Audios/${req.body.dirToAdd}:${fileName}`;
        break;
      default:
        path = `public/Others/${req.body.dirToAdd}:${fileName}`;
    }
    try {
      if (fs.existsSync(path)) {
        return true;
        // let d = new Date();
        // let time = d.getTime();
        // cb(null, req.body.dirToAdd + ":" + file.originalname + time);
      } else {
        return false;
        // console.log("not exist");
        // cb(null, req.body.dirToAdd + ":" + file.originalname);
      }
    } catch (err) {
      console.error(err);
    }
  },

  isPathAlreadyExists: path => {
    try {
      if (fs.existsSync(path)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  },

  isFolderNameExists: (folderNameToCheck, folderStructure) => {
    for (let folderObj of folderStructure.folders) {
      if (folderObj.name === folderNameToCheck) {
        return true;
      }
    }
    return false;
  },

  sameNameFileNameCheckInAllFolders: fileName => {
    let allFoldersPath = {
      images: `public/Images/${fileName}`,
      videos: `public/Videos/${fileName}`,
      audios: `public/Audios/${fileName}`,
      others: `public/Others/${fileName}`
    };
    if (
      utilFunctions.isPathAlreadyExists(allFoldersPath.images) ||
      utilFunctions.isPathAlreadyExists(allFoldersPath.videos) ||
      utilFunctions.isPathAlreadyExists(allFoldersPath.audios) ||
      utilFunctions.isPathAlreadyExists(allFoldersPath.others)
    ) {
      return true;
    } else {
      return false;
    }
  },

  renameFile: fileName => {
    //the renaming number will increase when it is fully implemented
    return `(2)${fileName}`;
    // let splittedArr = fileName.split(".");
    // splittedArr[splittedArr.length - 2] =
    //   splittedArr[splittedArr.length - 2] + "(2)";
    // // let renamedFile = fileName;
    // let splittedArr2 = fileName.split(":");
    // console.log(splittedArr2);
    // //consider file name without any type, that will not contain any "."
    // //can create bugs
    // return splittedArr.join(".");
  },

  fileNameInStorage: (fileName, fileDirId) => {
    return `${fileDirId}:${fileName}`;
  },

  filePathInStroage: (fileName, fileDirId, fileFormat) => {
    let fileNameInStorage = utilFunctions.fileNameInStorage(
      fileName,
      fileDirId
    );
    let pathInStorage;
    switch (fileFormat.split("/")[0]) {
      case "image":
        pathInStorage = `public/Images/${fileNameInStorage}`;
        break;

      case "video":
        pathInStorage = `public/Videos/${fileNameInStorage}`;
        break;

      case "audio":
        pathInStorage = `public/Audios/${fileNameInStorage}`;
        break;

      default:
        pathInStorage = `public/Others/${fileNameInStorage}`;
    }
    return pathInStorage;
  },

  downloadFile: (fileInfo, res) => {
    let { name, dirId, format } = fileInfo;
    let pathInStorage = utilFunctions.filePathInStroage(name, dirId, format);
    res.download(pathInStorage, name);
  },

  deleteFile: (id, parentId, name, folderStructure) => {
    if (id !== null) {
      if (id === "root") {
        let afterDeletionFileArr = folderStructure.files.filter(
          fileObj => fileObj.name !== name
        );
        folderStructure.files = afterDeletionFileArr;
        return folderStructure;
      } else {
        let dirPathArr = id.split("-");
        let dirPath = folderStructure;
        let parentDir = "null";
        while (dirPathArr.length !== 0) {
          let singleDir = Number(dirPathArr.shift());
          parentDir = dirPath.folders[singleDir];
          dirPath = dirPath.folders[singleDir].subFolder;
        }

        let afterDeletionFileArr = dirPath.files.filter(
          fileObj => fileObj.name !== name
        );
        dirPath.files = afterDeletionFileArr;
        return folderStructure;
      }
    } else {
      //null folderDir id is not valid
      return folderStructure;
    }
  },

  deleteFolder: (id, name, folderStructure) => {
    if (id !== null) {
      if (id === "root") {
        let toDeleteFolderSubFolderId;
        let afterDeletionFoldersArr = [];

        for (let i = 0; i < folderStructure.folders.length; i++) {
          if (folderStructure.folders[i].name !== name) {
            afterDeletionFoldersArr.push(folderStructure.folders[i]);
          } else {
            toDeleteFolderSubFolderId = folderStructure.folders[i].subFolder.id;
          }
        }
        folderStructure.folders = afterDeletionFoldersArr;
        return [folderStructure, toDeleteFolderSubFolderId];
      } else {
        let dirPathArr = id.split("-");
        let dirPath = folderStructure;
        let parentDir = "null";
        while (dirPathArr.length !== 0) {
          let singleDir = Number(dirPathArr.shift());
          parentDir = dirPath.folders[singleDir];
          dirPath = dirPath.folders[singleDir].subFolder;
        }
        let toDeleteFolderSubFolderId;
        let afterDeletionFoldersArr = [];

        for (let i = 0; i < dirPath.folders.length; i++) {
          if (dirPath.folders[i].name !== name) {
            afterDeletionFoldersArr.push(dirPath.folders[i]);
          } else {
            toDeleteFolderSubFolderId = dirPath.folders[i].subFolder.id;
          }
        }
        dirPath.folders = afterDeletionFoldersArr;

        return [folderStructure, toDeleteFolderSubFolderId];
      }
    } else {
      //null folderDir id is not valid
      return folderStructure;
    }
  },

  readDir: dirPath => {
    return fs.readdirSync(dirPath);
  },

  getAllFilesArr: () => {
    return utilFunctions
      .readDir(`public/Images/`)
      .concat(utilFunctions.readDir(`public/Audios/`))
      .concat(utilFunctions.readDir(`public/Videos/`))
      .concat(utilFunctions.readDir(`public/Others/`));
  },

  getFilteredFilesPathsById: (fileArr, dirId, parentPath) => {
    let filteredFileArrOfPaths = [];
    fileArr.forEach((file, idx) => {
      if (file.startsWith(dirId)) {
        filteredFileArrOfPaths.push(`${parentPath}${file}`);
      }
    });
    return filteredFileArrOfPaths;
  },

  getAllFilesPathInAdir: dirId => {
    let allFilesInDir = [];

    let allVidFilesArr = fs.readdirSync(`public/Videos/`);
    let filteredVidFilesByFolderId = utilFunctions.getFilteredFilesPathsById(
      allVidFilesArr,
      dirId,
      `public/Videos/`
    );
    allFilesInDir = allFilesInDir.concat(filteredVidFilesByFolderId);

    let allAudioFilesArr = fs.readdirSync(`public/Audios/`);
    let filteredAudFilesByFolderId = utilFunctions.getFilteredFilesPathsById(
      allAudioFilesArr,
      dirId,
      `public/Audios/`
    );
    allFilesInDir = allFilesInDir.concat(filteredAudFilesByFolderId);

    let allImgFilesArr = fs.readdirSync(`public/Images/`);
    let filteredImgFilesByFolderId = utilFunctions.getFilteredFilesPathsById(
      allImgFilesArr,
      dirId,
      `public/Images/`
    );
    allFilesInDir = allFilesInDir.concat(filteredImgFilesByFolderId);

    let allOtherFilesArr = fs.readdirSync(`public/Others/`);
    let filteredOtherFilesByFolderId = utilFunctions.getFilteredFilesPathsById(
      allOtherFilesArr,
      dirId,
      `public/Others/`
    );
    allFilesInDir = allFilesInDir.concat(filteredOtherFilesByFolderId);

    return allFilesInDir;
  },

  renameFileByUser: (id, oldFileName, newFileName, folderStructure) => {
    if (id !== null) {
      if (id === "root") {
        for (let fileObj of folderStructure.files) {
          if (fileObj.name === oldFileName) {
            fileObj.name = newFileName;
          }
        }
        return folderStructure;
      } else {
        let dirPathArr = id.split("-");
        let dirPath = folderStructure;
        let parentDir = "null";
        while (dirPathArr.length !== 0) {
          let singleDir = Number(dirPathArr.shift());
          parentDir = dirPath.folders[singleDir];
          dirPath = dirPath.folders[singleDir].subFolder;
        }
        for (let fileObj of dirPath.files) {
          if (fileObj.name === oldFileName) {
            fileObj.name = newFileName;
          }
        }
        return folderStructure;
      }
    } else {
      //null folderDir id is not valid
      return folderStructure;
    }
  },

  renameFolderByUser: (id, oldFolderName, newFolderName, folderStructure) => {
    if (id !== null) {
      if (id === "root") {
        for (let folderObj of folderStructure.folders) {
          if (folderObj.name === oldFolderName) {
            folderObj.name = newFolderName;
          }
        }
        return folderStructure;
      } else {
        let dirPathArr = id.split("-");
        let dirPath = folderStructure;
        let parentDir = "null";
        while (dirPathArr.length !== 0) {
          let singleDir = Number(dirPathArr.shift());
          parentDir = dirPath.folders[singleDir];
          dirPath = dirPath.folders[singleDir].subFolder;
        }
        for (let folderObj of dirPath.files) {
          if (folderObj.name === oldFolderName) {
            folderObj.name = newFolderName;
          }
        }
        return folderStructure;
      }
    } else {
      //null folderDir id is not valid
      return folderStructure;
    }
  },

  createRenamedFilePath: (
    name,
    currentDirId,
    fileFormat,
    renamedItem,
    filePath
  ) => {
    let splittedFilePath = filePath.split("/");
    splittedFilePath[
      splittedFilePath.length - 1
    ] = `${currentDirId}:${renamedItem}`;
    return splittedFilePath.join("/");
  },

  createHeadAndFile: (range, fileSize, path) => {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    };
    return [head, file];
  },

  calcTotalFolderSize: folder => {
    let totalSize = 0;
    let flattenFolderObj = flatten(folder);
    Object.keys(flattenFolderObj).forEach(function(key) {
      var arr = key.split(".");
      if (arr[arr.length - 1] === "size") {
        totalSize += flattenFolderObj[key];
      }
    });
    return totalSize;
  }
};

module.exports = utilFunctions;
