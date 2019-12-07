module.exports = function(sequelize, DataTypes) {
  const Chats = sequelize.define(
    "Chats",
    {
      category: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );
  return Chats;
};
