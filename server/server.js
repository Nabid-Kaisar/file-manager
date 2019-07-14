const express = require("express");
const app = express();

const fs = require("fs");
const bodyParser = require("body-parser");

const path = require("path");
const multer = require("multer");

const port = process.env.PORT || 8001;
// const cors = require("cors");

const utilFn = require("./utilFn");
const sortUtilFn = require("./sortUtilFn");

const sizeOf = require("image-size");

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

var newFileName;

//multer config
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    switch (req.body.fileType.split("/")[0]) {
      case "image":
        cb(null, "public/Images");
        break;
      case "video":
        cb(null, "public/Videos");
        break;
      case "audio":
        cb(null, "public/Audios");
        break;
      default:
        cb(null, "public/Others");
    }
  },
  filename: function(req, file, cb) {
    // console.log(req.body, file, cb);
    if (utilFn.isFileExists(req, file.originalname)) {
      let renamedFile = utilFn.renameFile(file.originalname);
      newFileName = renamedFile;
      cb(null, req.body.dirToAdd + ":" + renamedFile);
    } else {
      cb(null, req.body.dirToAdd + ":" + file.originalname);
    }
  }
});
var upload = multer({ storage: storage }).single("file");
//multer config end..

//serving the cra
app.use(express.static(path.join(__dirname, "../build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

//getting folder directory structure
app.get("/getFolderStructure", (req, res) => {
  fs.readFile("./fst.json", (err, data) => {
    if (err) throw err;
    let response = JSON.parse(data);
    res.send(response);
  });
});

//adding new folder/directory to the folder structure
app.post("/addNewFolder", (req, res) => {
  if (req.body.folderName === "") {
    res.status(403).send("Foldername can not be empty");
  } else {
    fs.readFile("./fst.json", (err, data) => {
      if (err) throw err;

      let tree = JSON.parse(data);

      let toAddDir = utilFn.getDir(req.body.dirToAdd, tree);
      let folderObj = createFolderObj(req.body, toAddDir);

      //append the folderObj to tree (in the desired dir)
      let appendedNewFolderTree = utilFn.addFolder(
        req.body.dirToAdd,
        tree,
        folderObj,
        req.body.parentId
      );
      //creating buffer to write to file
      let buf = Buffer.from(JSON.stringify(appendedNewFolderTree, null, 4));
      fs.writeFile("./fst.json", buf, err => {
        if (err) {
          throw err;
        }
        res.json({ success: true, newDirStruc: toAddDir });
      });
    });
  }
});

let createFolderObj = (body, toAddDir) => {
  let lastSubFolderId;
  if (toAddDir.folders.length === 0) {
    lastSubFolderId = `${body.dirToAdd}-0`;
  } else {
    let slicedValue = toAddDir.folders[
      toAddDir.folders.length - 1
    ].subFolder.id.slice(0, -2);
    if (slicedValue === "") {
      lastSubFolderId = slicedValue + `${toAddDir.folders.length - 1}`;
    } else {
      lastSubFolderId = slicedValue + `-${toAddDir.folders.length - 1}`;
    }
  }

  let newSubFolderId = lastSubFolderId.slice(0, -1) + toAddDir.folders.length;

  let newSubFolderParentId = toAddDir.id;

  let folderObj = utilFn.createEmptyFolderObj(
    body.folderName,
    newSubFolderId,
    newSubFolderParentId
  );

  return folderObj;
};

app.get("/delete/:type/:name/:format(*)/:dirId/:parentId", (req, res) => {
  let { name, type, format, dirId, parentId } = req.params;
  if (type === "file") {
    let filePath = utilFn.filePathInStroage(name, dirId, format);
    fs.unlink(filePath, err => {
      if (err) throw err;

      fs.readFile("./fst.json", (err, data) => {
        if (err) throw err;

        let tree = JSON.parse(data);

        let afterDeletionTree = utilFn.deleteFile(dirId, parentId, name, tree);

        let buf = Buffer.from(JSON.stringify(afterDeletionTree, null, 4));
        fs.writeFile("./fst.json", buf, err => {
          if (err) {
            throw err;
          }
          let dirStruc = utilFn.getDir(dirId, tree);
          res.send({ success: true, newDirStruc: dirStruc });
        });
      });
    });
  } else {
    fs.readFile("./fst.json", (err, data) => {
      if (err) throw err;

      let tree = JSON.parse(data);

      let afterDeletion = utilFn.deleteFolder(dirId, name, tree);
      let afterDeletionTree = afterDeletion[0];
      let deletionDirSubFolderId = afterDeletion[1];

      let allFilesPathInAdir = utilFn.getAllFilesPathInAdir(
        deletionDirSubFolderId
      );
      allFilesPathInAdir.forEach(filePathToDelete => {
        fs.unlink(filePathToDelete, err => {
          if (err) throw err;
        });
      });

      let buf = Buffer.from(JSON.stringify(afterDeletionTree, null, 4));
      fs.writeFile("./fst.json", buf, err => {
        if (err) {
          throw err;
        }
        let dirStruc = utilFn.getDir(dirId, tree);
        res.send({ success: true, newDirStruc: dirStruc });
      });
    });
  }
});

app.post("/renameItem", (req, res) => {
  let { currentDirId, selectedItem, renamedItem } = req.body;
  let { type, name, fileFormat } = selectedItem;
  if (type === "file") {
    let filePath = utilFn.filePathInStroage(name, currentDirId, fileFormat);
    let newFilePath = utilFn.createRenamedFilePath(
      name,
      currentDirId,
      fileFormat,
      renamedItem,
      filePath
    );
    let isFileNameExists = utilFn.sameNameFileNameCheckInAllFolders(
      `${currentDirId}:${renamedItem}`
    );

    if (isFileNameExists) {
      res.send({ success: false, err: "File name already exists" });
    } else {
      fs.rename(filePath, newFilePath, err => {
        if (err) throw err;

        fs.readFile("./fst.json", (err, data) => {
          if (err) throw err;
          let tree = JSON.parse(data);

          let afterRenameTree = utilFn.renameFileByUser(
            currentDirId,
            name,
            renamedItem,
            tree
          );

          let buf = Buffer.from(JSON.stringify(afterRenameTree, null, 4));
          fs.writeFile("./fst.json", buf, err => {
            if (err) {
              throw err;
            }
            let dirStruc = utilFn.getDir(currentDirId, tree);
            res.send({ success: true, newDirStruc: dirStruc });
          });
        });
      });
    }
  } else {
    fs.readFile("./fst.json", (err, data) => {
      if (err) throw err;
      let tree = JSON.parse(data);

      let renameDir = utilFn.getDir(currentDirId, tree);
      if (utilFn.isFolderNameExists(renamedItem, tree)) {
        res.send({
          success: false,
          err: "FolderName already exists in this directory"
        });
      } else {
        let afterRenameTree = utilFn.renameFolderByUser(
          currentDirId,
          name,
          renamedItem,
          tree
        );

        let buf = Buffer.from(JSON.stringify(afterRenameTree, null, 4));
        fs.writeFile("./fst.json", buf, err => {
          if (err) {
            throw err;
          }
          let dirStruc = utilFn.getDir(currentDirId, tree);
          res.send({ success: true, newDirStruc: dirStruc });
        });
      }
    });

    //folder
  }
});

app.post("/upload", function(req, res) {
  //stroing the actual file to local Storage
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    //modifying fst json according to the uploaded file and dir
    fs.readFile("./fst.json", (err, data) => {
      if (err) throw err;

      let tree = JSON.parse(data);
      let toAddDir = utilFn.getDir(req.body.dirToAdd, tree);

      let d = new Date();
      let currentTime = d.getTime();

      let fileName = req.body.fileName;
      if (newFileName && newFileName !== "") {
        fileName = newFileName;
        newFileName = ""; //clearing the newFileName global
      }

      let fileObj = {
        name: fileName,
        type: "file",
        format: req.body.fileType,
        created: currentTime,
        lastModified: Number(req.body.lastModified),
        size: Number(req.body.size)
      };

      //append the fileObj to tree (in the desired dir)
      let appendedNewFolderTree = utilFn.addFile(
        req.body.dirToAdd,
        tree,
        fileObj
      );
      //creating buffer to write to file
      let buf = Buffer.from(JSON.stringify(appendedNewFolderTree, null, 4));
      fs.writeFile("./fst.json", buf, err => {
        if (err) {
          throw err;
        }
        res.json({ success: true, newDirStruc: toAddDir });
      });
    });
  });
});

app.post("/getFileMetaData", (req, res) => {
  let path;
  switch (req.body.fileType.split("/")[0]) {
    case "image":
      path = `public/Images/${req.body.dirId}:${req.body.fileName}`;
      fs.readFile("./fst.json", (err, data) => {
        if (err) throw err;

        let tree = JSON.parse(data);
        let fileDir = utilFn.getDir(req.body.dirId, tree);
        let fileMeta = utilFn.getFileMetaData(req.body.fileName, fileDir);

        sizeOf(path, (err, dim) => {
          if (err) console.log(err);
          res.json({ success: true, fileMeta: fileMeta, dim: dim });
        });
      });
      break;

    case "video":
      path = `public/Videos/${req.body.dirId}:${req.body.fileName}`;
      fs.readFile("./fst.json", (err, data) => {
        if (err) throw err;

        let tree = JSON.parse(data);
        let fileDir = utilFn.getDir(req.body.dirId, tree);
        let fileMeta = utilFn.getFileMetaData(req.body.fileName, fileDir);
        res.json({ success: true, fileMeta: fileMeta });
      });
      break;

    case "audio":
      path = `public/Audios/${req.body.dirId}:${req.body.fileName}`;
      // console.log(path);
      fs.readFile("./fst.json", (err, data) => {
        if (err) console.log(err);

        let tree = JSON.parse(data);
        let fileDir = utilFn.getDir(req.body.dirId, tree);
        let fileMeta = utilFn.getFileMetaData(req.body.fileName, fileDir);

        res.json({ success: true, fileMeta: fileMeta });
      });
      break;

    default:
      path = `public/Others/${req.body.dirId}:${req.body.fileName}`;
      fs.readFile("./fst.json", (err, data) => {
        if (err) throw err;

        let tree = JSON.parse(data);
        let fileDir = utilFn.getDir(req.body.dirId, tree);
        let fileMeta = utilFn.getFileMetaData(req.body.fileName, fileDir);
        res.json({ success: true, fileMeta: fileMeta });
      });
  }
});

app.post("/getFolderMetaData", (req, res) => {
  let { currentDirId } = req.body;
  let folderName = req.body.name;
  fs.readFile("./fst.json", (err, data) => {
    if (err) throw err;

    let tree = JSON.parse(data);
    //creating a sub tree structure where the folder object will
    //only contain the selected folder
    let selectedFolderDir = utilFn.getDir(currentDirId, tree);
    let filteredDirBySelectedFolder = selectedFolderDir.folders.filter(
      folder => folder.name === folderName
    );
    selectedFolderDir.folders = filteredDirBySelectedFolder;
    selectedFolderDir.files = [];
    let selectedFolder = selectedFolderDir.folders[0];
    let { created, lastModified } = selectedFolder;
    let totalFolderSize = utilFn.calcTotalFolderSize(selectedFolderDir);
    res.send({ totalFolderSize, created, lastModified });
  });
});

app.get("/serveVid/:vidName", (req, res) => {
  const path = `public/Videos/${req.params.vidName}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    let headAndFile = utilFn.createHeadAndFile(range, fileSize, path);
    res.writeHead(206, headAndFile[0]);
    headAndFile[1].pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4"
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.get("/serveImg/:imgName", (req, res) => {
  res.sendFile(req.params.imgName, { root: "public/Images" });
});

app.get("/serveAud/:audName", (req, res) => {
  const path = `public/Audios/${req.params.audName}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    let headAndFile = utilFn.createHeadAndFile(range, fileSize, path);
    res.writeHead(206, headAndFile[0]);
    headAndFile[1].pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4"
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.get("/servePdf/:pdfName", (req, res) => {
  res.sendFile(req.params.pdfName, { root: "public/Others" });
});

app.get("/download/:type/:name/:format(*)/:dirId", (req, res) => {
  if (req.params.type === "file") {
    utilFn.downloadFile(req.params, res);
  } else {
    //download folder
  }
});

app.post("/getLink", (req, res) => {});

app.post("/cf", (req, res) => {
  res.send({
    success: utilFn.addFolderToStorage(req.body.folderName, req.body.dirPath)
  });
});

app.post("/search-item", (req, res) => {
  fs.readFile("./fst.json", (err, data) => {
    if (err) throw err;
    let tree = JSON.parse(data);

    let toSearchDir = utilFn.getDir(req.body.dirToSearch, tree);
    let filteredDir;
    switch (req.body.searchType) {
      case "name":
        filteredDir = utilFn.searchDirByName(req.body.searchStr, toSearchDir);
        break;

      case "type":
        filteredDir = utilFn.searchDirByType(req.body.searchStr, toSearchDir);
        break;

      default:
        filteredDir = toSearchDir;
    }

    res.json({ filteredDirStruc: filteredDir });
  });
});

app.post("/sort-dir", (req, res) => {
  fs.readFile("./fst.json", (err, data) => {
    if (err) throw err;
    let tree = JSON.parse(data);

    let toSortDir = utilFn.getDir(req.body.dirToSort, tree);

    let sortType = {
      sortByNameAscend: dir => sortUtilFn.sortDirByNameAscend(dir),
      sortByNameDescend: dir => sortUtilFn.sortDirByNameDescend(dir),
      sortBySizeAscend: dir => sortUtilFn.sortDirBySizeAscend(dir),
      sortBySizeDescend: dir => sortUtilFn.sortDirBySizeDescend(dir),
      sortByDateAscend: dir => sortUtilFn.sortDirByDateAscend(dir),
      sortByDateDescend: dir => sortUtilFn.sortDirByDateDescend(dir)
    };

    let sortedDirStruc = sortType[req.body.sortType](toSortDir);

    res.json({ sortedDirStruc: sortedDirStruc });
  });
});

//https://playcode.io/307978?tabs=console&script.js&output
// https://jsfiddle.net/himel023/sr25xq8L/14/
