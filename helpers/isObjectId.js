const ObjectId = require('mongoose').Types.ObjectId;


function isObjectId(oid)
{
    if( ObjectId.isValid(oid) )
    {
        const object = new ObjectId(oid);

        if( object === new ObjectId(object) ){
            return true
        }else{
            return false
        }
    }
    else
    {
        return false
    }
};


module.exports = isObjectId;