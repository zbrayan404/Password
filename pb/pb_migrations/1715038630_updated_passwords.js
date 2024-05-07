/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("26kwzqy9inc9e9o");

    collection.listRule = "user.id = @request.auth.id";
    collection.createRule = "user.id = @request.auth.id";
    collection.deleteRule = "user.id = @request.auth.id";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("26kwzqy9inc9e9o");

    collection.listRule = null;
    collection.createRule = null;
    collection.deleteRule = null;

    return dao.saveCollection(collection);
  }
);
