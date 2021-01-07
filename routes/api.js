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

  function validateInput(res, initNum, initUnit) {
    if (initNum == null && initUnit == null) {
      return 'invalid number and unit'
    }
    if (initNum == null) {
      return 'invalid number'
    }
    if (initUnit == null) {
      return 'invalid unit'
    }

    return null;
  }

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      const isInvalid = validateInput(res, initNum, initUnit)
      if (isInvalid) {
        res.send(isInvalid)
        return
      }
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      const result = { initNum: initNum, initUnit: initUnit, returnNum: parseFloat(returnNum.toFixed(5)), returnUnit: returnUnit, string: toString }
      res.json(result)
    });

};
