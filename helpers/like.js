function like(field)
{
    return new RegExp('.*' + field + '.*', "i");
}

module.exports = like;