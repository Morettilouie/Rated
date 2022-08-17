const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {
  // will need to refactor this if have time
  static downvote(body, models) {
    return models.Vote.findOrCreate({
      where: {
        user_id: body.user_id,
        comment_id: body.comment_id,
      },
      defaults: {
        vote_status: 1,
      },
    }).then((data) => {
      const [result, created] = data;
      var currentVoteStatus = result.dataValues.vote_status;
      if (!created) {
        if (currentVoteStatus === -1) {
          currentVoteStatus = 0;
        } else {
          currentVoteStatus = -1;
        }
        models.Vote.update(
          { vote_status: `${currentVoteStatus}` },
          { where: { user_id: body.user_id, comment_id: body.comment_id } }
        );
      }
      return Comment.findOne({
        where: {
          id: body.comment_id,
        },
        attributes: [
          "id",
              "comment_text",
              "post_id",
              "user_id",
              "created_at",
          [
            sequelize.literal(
              "(SELECT SUM(vote.vote_status) FROM vote WHERE comment.id = vote.comment_id)"
            ),
            "vote_count",
          ],
        ],
      });
    });
    
  }
  static upvote(body, models) {
    return models.Vote.findOrCreate({
      where: {
        user_id: body.user_id,
        comment_id: body.comment_id,
      },
      defaults: {
        vote_status: 1,
      },
    }).then((data) => {
      const [result, created] = data;
      var currentVoteStatus = result.dataValues.vote_status;
      if (!created) {
        if (currentVoteStatus === 1) {
          currentVoteStatus = 0;
        } else {
          currentVoteStatus = 1;
        }
        models.Vote.update(
          { vote_status: `${currentVoteStatus}` },
          { where: { user_id: body.user_id, comment_id: body.comment_id } }
        );
      }
      return Comment.findOne({
        where: {
          id: body.comment_id,
        },
        attributes: [
          "id",
              "comment_text",
              "post_id",
              "user_id",
              "created_at",
          [
            sequelize.literal(
              "(SELECT SUM(vote.vote_status) FROM vote WHERE comment.id = vote.comment_id)"
            ),
            "vote_count",
          ],
        ],
      });
    });
    
  }
  
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;
