const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Post model
class Post extends Model {
  // this is where the 0 out of ten will be located at
  // will move this to the comments model
  static upvote(body, models) {
    return models.Vote.findOrCreate({
      where: {
        user_id: body.user_id,
        post_id: body.post_id,
      },
      defaults: {
        vote_status: 1,
      },
    }).then((data) => {
      const [result, created] = data;
      var currentVoteStatus = result.dataValues.vote_status;
      if (!created) {
        if(currentVoteStatus === 1) {
          currentVoteStatus = 0;
        }
        else{
          currentVoteStatus = 1;
        }
        models.Vote.update(
          { vote_status: `${currentVoteStatus}`},
          { where: { user_id: body.user_id, post_id: body.post_id } }
        );
      }
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          "id",
          "post_url",
          "title",
          "created_at",
          [
            sequelize.literal(
              "(SELECT SUM(vote.vote_status) FROM vote WHERE post.id = vote.post_id)"
            ),
            "vote_count",
          ],
        ],
        include: [
          {
            model: models.Comment,
            attributes: [
              "id",
              "comment_text",
              "post_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: models.User,
              attributes: ["username"],
            },
          },
        ],
      });
    });
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
      validate: {
        isURL: true,
      },
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
