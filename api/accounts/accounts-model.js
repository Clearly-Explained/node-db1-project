const db = require('../../data/db-config')


const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

async function create(account) {
  const [id] = await db('accounts')
    .insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

// async function deleteById(id) {
//   const toDelete = await getById(id)
//   await db('accounts')
//     .where({ id })
//     .del()
//   return toDelete
// }

const deleteById = id => {
  return db('accounts').where('id', id).del()
}


module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}