module.exports = function (sequelize, DataTypes) {
    const Posts = sequelize.define(
        "Posts",
        {
            ChatRoom: {
                type: DataTypes.STRING
            },
            Author: {
                type: DataTypes.STRING
            },
            Message: {
                type: DataTypes.text
            }

        }


    );
    return Posts;

}
