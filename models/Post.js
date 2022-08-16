const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Post model
class Post extends Model {
  // this is where the 0 out of ten will be located at
  static updateRating(body, models) {
    return models.Rating.findOrCreate({
      where: {
        user_id: body.user_id,
        post_id: body.post_id,
      },
      defaults: {
        rating_value: body.rating_value,
      },
    }).then((data)=> {
      const [result, created] = data;
      if(!created) {
        models.Rating.update({rating_value: body.rating_value},
          {where: {user_id: body.user_id, post_id: body.post_id}}
          );
      }
    })
  }
  
}

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // may need to delete this field
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
