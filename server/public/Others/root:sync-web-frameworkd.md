## Table of Contents
[1. Introduction](##introduction)

[2. Data Client](##data-client)

[3. App Query Syntax](##app-query-syntax)

[4. Login Action](##login-action)

[5. Menu Tree](##menu-tree)

[6. Table Render](##table-render)

[7. Field Type](##field-type)

[8. Table Row Creation](##table-row-creation)

[9. Table Row Update](##table-row-update)

[10. Table Row Delete](##table-row-delete)

[11. LiveFeed](##livefeed)

 * [Local Action Webplay](##local-action-webplay)
 * [Local Action Selector](##local-action-selector)

[12. Data Dependency](##data-dependency)

[13. Default Click](##default-click)
[]()


## 

## 
## Introduction

## Data Client
In **data_client.js** we use a web socket address to connect with our framework.

## App Query Syntax
General app query structure: 
```
window.app_query(object, action, argument, client_id, callback_method)
```

## Login Action
In login action user provide their username and password to framework by an app query and the framework return a response to the user. If user is valid then, the user gets a response message containing user data according to user's permission set by parent user.

*Login App Query format:*
```
window.app_query(
      "user",
      "login",
      { name: username, secret: secret },
      cid,
      this.onMessage
    );
```

## Menu Tree
After logged in the framework provides a **tree** object and based on this tree object front end creates menu.

## Table Render
An app query is triggered when clicked on the menu item. The framework returns a response table according to the app query and front end renders this table.

*App Query Format:*
  ```
    window.app_query(
      this.props.tableName,
      "read",
      { limit: [startRow, pageSize] },
      cid,
      this.onMessage
    );
```

## Field Type
In a form there could be different types of input field. The framework provides field types. According to the field type we generate form. Framework currently sending following field types:
1. Hidden
2. Text
3. Password
4. Read Only
5. Number
6. Radio
7. Checkbox
8. List
9. Date
10. Time
11. Date Time
12. Checklist
13. Binary

## Table Row Creation
If we clicked on the create button that will open up a form. Whenever we submit that form it sends an app query to the framework and the framework adds that row to the database table. Then front end re-render table to show the updated table.

*App Query Format:*
```
window.app_query(tableName, "create", { set: payload }, cid, this.onMessage);
```

## Table Row Update
If we clicked on the edit button that will open up a form. Whenever we submit that form it sends an app query to the framework and the framework updates that row to the database table. Then front end re-render table to show the updated table.

*App Query Format:*
```
    window.app_query(
      tableName,
      "update",
      { set: payload, where: { [pk]: row[pk] } },
      cid,
      this.onMessage
    );
```

## Table Row Delete
If we clicked on the delete button that will open up a modal to check if we really want to delete that row. Whenever we confirm it sends an app query to the framework and the framework delete that row from the database table. Then front end re-render table to show the updated table.

*App Query Format:*
```
  window.app_query(
      tableName,
      "delete",
      { where: { [pk]: rowID } },
      cid,
      this.deleteResponse
    );
```

## LiveFeed
When we click on the menu item it checks if clicked item is a part of liveTables and if does then go to liveFeed. In liveFeed there are no CRUD  related action like create, read, update and delete. In liveFeed there are some actions like: 

1. Init Action
2. Remote Actions
    1. Play
    2. Pull
    3. Push
    4. Stop
    5. Release
    6. Reload
    7. Reboot
3. Location Actions
    1. Web Play
    2. Selector

*App Query for Init:*
```
window.app_query(tableName, "init", {}, cid, this.onMessage);
```

*App Query for Remote Actions:*
```
window.app_query(tableName, action, row, cid, this.onMessage);
```

*App Query for Location Actions:*
```
  window.app_query(
      this.props.tableName,
      "push",
      selectorRow,
      cid,
      this.onMessage
    );
```

## Local Action Webplay
The goal of *webplay* local action is to play a video according to *webplay_url*. 

Whenever we click on any *liveFeed* action we get *actionObject* and *Row*. From *actionObject* front end check if there is any property called *local_action* named *webplay*. If *webplay* local action exist then *Row* provides a *webplay_url*. Then front end pass the *webplay_url* to the local video player which implemented locally.

## Local Action Selector
The goal of *selector* local action is to select a particular stream from *datalist* array and push that stream to the framework via app query. 

Whenever we click on any *liveFeed* action we get *actionObject* and *Row*. From *actionObject* front end check if there is any property called *local_action* named *selector*. If *selector* local action exist then *Row* provides a *datalist*. Then front end generate a selector modal, from that modal you can select any *online stream* and push the selected stream via app query from local selector modal.

*The format of the appquery for selector:*
```
window.app_query(table_name, push, row_data, cid, callback_method)
```

## Data Dependency

## Default Click