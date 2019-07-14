let fst = {
  folders: [
    {
      name: "video",
      type: "folder",
      hasChild: true,
      subFolder: {
        folders: [
          {
            name: "Synopi-Videos",
            type: "folder",
            hasChild: true,
            subFolder: {
              folders: [
                {
                  name: "Empty Folder",
                  type: "folder",
                  hasChild: false,
                  subFolder: {
                    folders: [],
                    files: [],
                    id: "0-0-0",
                    parentId: "0-0"
                  }
                },
                {
                  name: "Other videos",
                  type: "folder",
                  hasChild: true,
                  subFolder: {
                    folders: [
                      {
                        name: "Urgent folder",
                        type: "folder",
                        hasChild: false,
                        subFolder: {
                          folders: [],
                          files: [],
                          id: "0-0-1-0",
                          parentId: "0-0-1"
                        }
                      }
                    ],
                    files: [
                      {
                        name: "Other video1",
                        type: "file",
                        format: "avi"
                      }
                    ],
                    id: "0-0-1",
                    parentId: "0-0"
                  }
                }
              ],
              files: [
                {
                  name: "Synopi-Vid1",
                  type: "file",
                  format: "mov"
                },
                {
                  name: "Synopi-Vid2",
                  type: "file",
                  format: "mp4"
                }
              ],
              id: "0-0",
              parentId: "0"
            }
          },
          {
            name: "Streamed Videos",
            type: "folder",
            hasChild: false,
            subFolder: {
              folders: [],
              files: [],
              id: "0-1",
              parentId: "0"
            }
          }
        ],
        files: [
          {
            name: "videoFile1",
            type: "file",
            format: "mp4"
          },
          {
            name: "videoFile2",
            type: "file",
            format: "mpeg"
          }
        ],
        id: "0",
        parentId: "root"
      }
    },
    {
      name: "audio",
      type: "folder",
      hasChild: true,
      subFolder: {
        folders: [
          {
            name: "Synopi-audios",
            type: "folder",
            hasChild: true,
            subFolder: {
              folders: [
                {
                  name: "Empty Folder",
                  type: "folder",
                  hasChild: false,
                  subFolder: {
                    folders: [],
                    files: [],
                    id: "1-0-0",
                    parentId: "1-0"
                  }
                }
              ],
              files: [
                {
                  name: "Synopi-audio1",
                  type: "file",
                  format: "ogg"
                },
                {
                  name: "Synopi-audio2",
                  type: "file",
                  format: "mp3"
                }
              ],
              id: "1-0",
              parentId: "1"
            }
          }
        ],
        files: [
          {
            name: "audioFile1",
            type: "file",
            format: "mp3"
          },
          {
            name: "audioFile2",
            type: "file",
            format: "wav"
          }
        ],
        id: "1",
        parentId: "root"
      }
    },
    {
      name: "docs",
      type: "folder",
      hasChild: false,
      subFolder: {
        folders: [],
        files: [
          {
            name: "Algorithms",
            type: "file",
            format: "pdf"
          }
        ],
        id: "2",
        parentId: "root"
      }
    }
  ],
  files: [
    {
      name: "Icon Synopi",
      type: "file",
      format: "jpeg"
    },
    {
      name: "task list",
      type: "file",
      format: "xls"
    },
    {
      name: "documentation",
      type: "file",
      format: "word"
    }
  ],
  id: "root",
  parentId: null
};

let crDirList = tree => {
  for (let i = 0; i < tree.length; i++) {
    let tempSingleDir = crSingleDir(tree[i]);
    console.log(tempSingleDir);
    let curDir = tree[i];

    while (curDir.hasChild) {
      curDir = curDir.subFolder.folders;
      crDirList(curDir);
    }
  }
};

let dirArr = [];

function crSingleDir(tree) {
  let dirToBuildArr = [];
  console.log("in");
  let subf = tree.subFolder.folders;
  while (tree.hasChild) {
    for (let i = 0; i < subf.length; i++) {
      dirToBuildArr[i] = `/${tree.name}/${subf[i].name}`;
      console.log(tree);
      tree = tree.subFolder.folders;
    }
  }
  dirToBuildArr[0] = 0;

  return dirToBuildArr;
}

crDirList(fst.folders);