from pymongo import MongoClient
from bson.objectid import ObjectId


def transformObjectId(func):
    def wrapped_func(*args, **kwargs):
        if '_id' in kwargs.get('query', {}):
            _id = kwargs['query']['_id']
            kwargs['query']['_id'] = ObjectId(_id)
        return func(*args, **kwargs)
    return wrapped_func


class MongoCollection:
    def __init__(self, collection):
        client = MongoClient('mongodb://yzu_digiedu:yzu_digiedu_2017@140.138.77.91/authMechanism=SCRAM-SHA-1')
        db = client['digiedu']
        self.collection = db[collection]

    def insert(self, data=None):
        isList = isinstance(data, list)
        if isList:
            return self.collection.insert_many(data)
        else:
            return self.collection.insert_one(data)

    @transformObjectId
    def search(self, query={}, field=None):
        cursor = self.collection.find(query, field)
        result = list(cursor)
        return result

    @transformObjectId
    def count(self, query={}):
        return self.collection.count(query)

    @transformObjectId
    def update(self, query={}, newDict={}):
        return self.collection.update(query, {'$set': newDict}, multi=True)
