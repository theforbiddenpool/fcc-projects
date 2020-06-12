/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  const inputUnits = ['gal','l','mi','km','lbs','kg'];
  
  this.getNum = function(input) {
    const validNumber = /^(\.?\d(\/.\d)?)*[a-z]*$/i

    if(!validNumber.test(input))
      return null

    let result = input.match(/(\.?\d\/?)+/);

    if(!result) {
      return 1
    }

    result = result[0]

    if(/\//.test(result))
      result = eval(result)
    
    return Number(result.toFixed(5))
  };
  
  this.getUnit = function(input) {
    const validUnit = /(gal|lbs|kg|mi|km|l)$/i
    if(!validUnit.test(input))
      return null

    const result = input.match(/[a-z]+/i)[0];

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const expectedUnits = ['l','gal','km','mi','kg','lbs'];

    const result = expectedUnits[inputUnits.indexOf(initUnit)];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    const spelledUnit = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']

    const result = spelledUnit[inputUnits.indexOf(unit)]
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL
        break;
      case 'l':
        result = initNum / galToL
        break;
      case 'lbs':
        result = initNum * lbsToKg
        break;
      case 'kg':
        result = initNum / lbsToKg
        break;
      case 'mi':
        result = initNum * miToKm
        break;
      case 'km':
        result = initNum / miToKm
        break;
    }
    
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
