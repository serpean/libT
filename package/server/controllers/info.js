const { validationResult } = require('express-validator/check');

const List = require('../models/list');
const Info = require('../models/info');
const Post = require('../models/post');

exports.createOrModifyResource = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  try {
    const listId = req.body.listId;
    const newList = await List.findById(listId);
    if (!newList) {
      const error = new Error('List not exits.');
      error.statusCode = 422;
      throw error;
    }
    if (newList.creator.toString() !== req.userId) {
      const error = new Error('You cannot add to this list');
      error.statusCode = 403;
      throw error;
    }
    let info = await Info.findOne({
      searchId: req.body.id,
      creator: req.userId
    }).populate('lists');
    const unpopulatedInfo = await Info.findOne({
      searchId: req.body.id,
      creator: req.userId
    });

    // guardamos el action, la actualizamos y la usamos
    // para crear un post

    // si el usuario no tiene el recurso creado
    if (!info) {
      // cerar nueva lista
      info = new Info({
        type: req.body.type,
        searchId: req.body.id,
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        creator: req.userId
      });
      await info.save();
      if (newList.type == 0) {
        const doneList = await List.findOne({ creator: req.userId, type: 3 });
        await doneList.addResource(info._id);
        await info.addList(doneList._id);
      }
      await newList.addResource(info._id);
      await info.addList(newList._id);
    } else {
      // comprobar si está en la misma lista en caso de ser tipo exclusivo (1,2 o 3)
      const isList = info.lists.find(list => list.type > 0);
      if (isList && isList._id != listId) {
        if (newList.type != 0) {
          const oldList = await List.findById(isList._id);
          // cambio entre listas
          await oldList.removeResource(info._id);
          await unpopulatedInfo.removeList(oldList._id);
          await newList.addResource(info._id);
          await unpopulatedInfo.addList(newList._id);
        } else {
          // agregar/eliminar a la lista opcional
          if (newList.resources.indexOf(info._id) === -1) {
            await newList.addResource(info._id);
            await unpopulatedInfo.addList(newList._id);
          } else {
            await newList.removeResource(info._id);
            await unpopulatedInfo.removeList(newList._id);
          }
        }
      }
    }
    if (newList.type !== 0) {
      await info.setActualState(newList.type);
    }
    const post = new Post({
      action: newList.type,
      creator: req.userId,
      resource: info._id
    });
    await post.save();
    res.status(200).json({
      message: 'Info created!',
      info: info
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deteleItemList = (req, res, next) => {};

exports.getStatus = async (req, res, next) => {
  const resourceId = req.params.resourceId;

  try {
    const info = await Info.findOne({
      searchId: resourceId,
      creator: req.userId
    }).populate('lists');
    let status = 0;
    let lists = [];
    if (info && info !== null) {
      lists = info.lists.map(x => x._id);
      status = info.actualState;
    }

    res.status(200).json({ status: status, lists: lists });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
