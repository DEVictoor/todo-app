const adaptObject = object => ({ ...object, id: object._id });
const adaptArray = array => array.map(object => adaptObject(object));

export { adaptObject, adaptArray };
