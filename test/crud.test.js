const sequelize = require('../config/dbconn.js');
const User = require('../models/User.js');

test('insert and select', async () => {

  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  expect(jane.username).toBe('janedoe');

  const result = await User.findOne({
    where: {
      username: 'janedoe'
    }
  });
  expect(result.username).toBe('janedoe');
});

test('update and delete', async () => {
  await sequelize.sync();
  await User.update({
    username: 'kelly'
  }, {
    where: {
      username: 'janedoe'
    }
  });
  const result = await User.findOne({
    where: {
      username: 'janedoe'
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
