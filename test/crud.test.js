const sequelize = require('../config/dbconn.js');
const User = require('../models/User.js');

const JANE_DOE = 'janedoe';
test('insert and select', async () => {

  await sequelize.sync();
  const jane = await create(JANE_DOE, new Date(1980, 6, 20));
  expect(jane.username).toBe(JANE_DOE);

  const result = await User.findOne({
    where: {
      username: JANE_DOE
    }
  });
  expect(result.username).toBe(JANE_DOE);
});

test('update and delete', async () => {
  await sequelize.sync();
  await User.update({
    username: 'kelly'
  }, {
    where: {
      username: JANE_DOE
    }
  });
  const result = await User.findOne({
    where: {
      username: JANE_DOE
    }
  });
  expect(result?.username).toBe(undefined);

  const updated = await User.findOne({
    where: {
      username: 'kelly'
    }
  });
  expect(updated?.username).toBe('kelly');

  await User.destroy({
    where: {
      username: 'kelly'
    }
  });

  const deleted = await User.findOne({
    where: {
      username: 'kelly'
    }
  });
  expect(deleted).toBe(null);

});
async function create(username, date) {
  return await User.create({
    username: username,
    birthday: date
  });
}

