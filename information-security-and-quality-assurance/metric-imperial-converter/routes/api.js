/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      const input = req.query.input;
      const initNum = convertHandler.getNum(input)
      const initUnit = convertHandler.getUnit(input);

      if(!initNum && !initUnit) {
        res.json({ error : 'invalid number and unit' })
      } else if(!initNum) {
        res.json({ error: 'invalid number' })
      } else if(!initUnit) {
        res.json({ error: 'invalid unit' })
      }

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: toString
      })
    });
    
};
