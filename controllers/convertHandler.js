/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  const CONVERTER_OBJECT = {
    'gal': {
      imperialUnit: 'gal',
      metricUnit: 'L',
      value: 3.78541
    },
    'lbs': {
      imperialUnit: 'lbs',
      metricUnit: 'kg',
      value: 0.453592
    },
    'mi': {
      imperialUnit: 'mi',
      metricUnit: 'km',
      value: 1.60934
    },
  }

  const UNITS = {
    metric: ['L', 'kg', 'km'],
    imperial: ['gal', 'lbs', 'mi'],
    metricSpell: ['liters', 'kilograms', 'kilometers'],
    imperialSpell: ['gallons', 'pounds', 'miles'],
  }

  const unitRegex = /((?:\d|\W)*)([a-zA-Z]*)/i

  function parse(str) {
    return Function(`'use strict'; return (${str})`)()
  }

  this.getNum = function (input) {
    let result = unitRegex.exec(input);
    result = result[1] ? parse(result[1]) : 1
    return result;
  };

  this.getUnit = function (input) {
    let result = unitRegex.exec(input);
    result = result[2]
    result = result == 'L' ? result : result.toLowerCase()
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    const converterObject = getConverterObject(initUnit)
    if (converterObject.isMetric) {
      return converterObject.imperialUnit
    } else {
      return converterObject.metricUnit
    }
  };

  this.spellOutUnit = function (unit) {
    if (UNITS.metric.includes(unit)) {
      const unitIndex = UNITS.metric.indexOf(unit)
      return UNITS.metricSpell[unitIndex]
    } else {
      const unitIndex = UNITS.imperial.indexOf(unit)
      return UNITS.imperialSpell[unitIndex]
    }
  };

  this.convert = function (initNum, initUnit) {
    const converterObject = getConverterObject(initUnit)
    if (converterObject.isMetric) {
      return initNum * (1 / converterObject.value)
    } else {
      return initNum * converterObject.value
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };

  function getConverterObject(initUnit) {
    if (UNITS.metric.includes(initUnit)) {
      const unitIndex = UNITS.metric.indexOf(initUnit)
      const imperialUnit = UNITS.imperial[unitIndex]
      return { isMetric: true, ...CONVERTER_OBJECT[imperialUnit] }
    }

    return { isMetric: false, ...CONVERTER_OBJECT[initUnit] }
  }


}

module.exports = ConvertHandler;
