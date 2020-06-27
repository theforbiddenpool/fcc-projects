const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
let collection

MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  .then(client => {
    collection = client.db('message-board').collection('threads')
  })
  .catch(err => console.error(err))


async function newThread({text, delete_password, board}) {
  const doc = await collection.insertOne({
    board,
    text,
    delete_password,
    created_on: new Date(),
    bumped_on: new Date(),
    reported: false,
    replies: []
  })

  return doc.ops[0]
}

async function getAllTheards(board) {
  const doc = await collection.find({ board })
    .sort({ bumped_on: -1 })
    .limit(10).toArray()

    doc.forEach(thread => {
      delete thread.reported
      delete thread.delete_password

      thread.replies.sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
      thread.replies.splice(3, thread.replies.length - 1)
    })

  return doc
}

async function newReply({ text, delete_password, thread_id }) {
  const doc = await collection.updateOne({ _id: new ObjectId(thread_id) },
    { $push: {
      replies: {
        _id: new ObjectId(),
        text,
        delete_password,
        created_on: new Date(),
        reported: false
      }
    },
      $set: { bumped_on: new Date() }
    },
    { new: true })
    
  return doc
}

async function getThread(thread_id) {
  const doc = await collection.findOne({ _id: new ObjectId(thread_id) })

  if(doc) {
    delete doc.reported
    delete doc.delete_password
  }

  return doc
}

async function deleteThread({thread_id, delete_password}) {
  const thread = await collection.findOne({ _id: new ObjectId(thread_id) })

  if(thread && thread.delete_password == delete_password) {
    const doc = await collection.deleteOne({ _id: new ObjectId(thread_id) })
    return doc.deletedCount
  } else {
    return null
  }
}

async function deleteReply({thread_id, reply_id, delete_password}) {
  const thread = await collection.findOne({ _id: new ObjectId(thread_id)})

  const reply = thread.replies.find((reply, index) => reply._id == reply_id)

  if(reply.delete_password == delete_password) {
    const doc = await collection.updateOne({
        _id: new ObjectId(thread_id),
        'replies._id': new ObjectId(reply_id)
      },
      {
        $set: {'replies.$.text': '[deleted]'}
      })
    return doc.modifiedCount
  } else {
    return null
  }
}

async function reportThread(thread_id) {
  const doc = await collection.updateOne({ _id: new ObjectId(thread_id) },
    {
      $set: { reported: true }
    })
  
  return doc.modifiedCount
}

async function reportReply({thread_id, reply_id}) {
  const doc = await collection.updateOne(
    { 
      _id: new ObjectId(thread_id),
      'replies._id': new ObjectId(reply_id)
    },
    {
      $set: { 'replies.$.reported': true }
    })

    return doc.modifiedCount
}

module.exports = {
  newThread, getAllTheards, newReply, getThread, deleteThread, deleteReply, reportThread, reportReply
}