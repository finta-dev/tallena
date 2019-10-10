
function cleanObjects(object){
    let newObject = object;
    Object.keys(newObject).forEach((key) => (newObject[key] == null) && delete newObject[key]);
    return newObject;
}

module.exports = cleanObjects;