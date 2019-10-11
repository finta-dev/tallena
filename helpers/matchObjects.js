function matchObjects(requestObject, compareObject){
    if( typeof requestObject !== 'object' || typeof compareObject !== 'object' ){ return {} }

    const newObject = {};

    for( let key in requestObject ){
        if( typeof requestObject[key] === 'object' )
        {
            if( !matchObjects(requestObject[key], compareObject[key]) )
            {
                newObject[key] = matchObjects(requestObject[key], compareObject[key]);
            }
        }
        else
        {
            if( compareObject[key] !== undefined )
            {
                newObject[key] = requestObject[key];
            }
        }
    }
    return newObject;
}

module.exports = matchObjects