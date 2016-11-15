var GameObjectFactory = require('../../core/objects/gameObjectFactory');
var Day = require();
var Night = require();
var MafiaStateFactory = function(){

}

MafiaStateFactory.prototype.constructor = MafiaStateFactory;
MafiaStateFactory.prototype = Object.create(GameObjectFactory.prototype);

MafiaStateFactory.prototype.day = function(){}
MafiaStateFactory.prototype.night = function(){}