const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {
  // will need to refactor this if have time
  static downvote(body, models) {
    return models.Vote.findOrCreate({
      where: {
        user_id: body.user_id,
        comment_id: body.comment_id,
      },
      default: {
        user_id: body.user_id,
        comment_id: body.comment_id,
        vote_status: -1
      }
    })
      .then((data) => {
        const [result, created] = data;
        var currentVoteStatus = result.dataValues.vote_status;
        if (!created) {
          if (currentVoteStatus === -1) {
            currentVoteStatus = 0;
          }
          else {
            currentVoteStatus = -1;
          }
           models.Vote.update(
            {
              user_id: body.user_id,
              comment_id: body.comment_id,
              vote_status: `${currentVoteStatus}`,
            },
            { where: { user_id: body.user_id, comment_id: body.comment_id } }
          );
        }
      })
      .then(() => {
        return sequelize.query(
          `SELECT SUM(vote.vote_status) as sum from vote WHERE ${body.comment_id} = vote.comment_id`,
          { type: sequelize.QueryTypes.SELECT }
        );
      })
      .then((data) => {
        const newSum = data[0].sum //+ currentVoteStatus;
        return sequelize.query(
          `UPDATE comment set comment.vote_count = ${data[0].sum} WHERE comment.id = ${body.comment_id}`
        )
      })
    }
  static upvote(body, models) {
    return models.Vote.findOrCreate({
      where: {
        user_id: body.user_id,
        comment_id: body.comment_id,
      },
      default: {
        user_id: body.user_id,
        comment_id: body.comment_id,
        vote_status: 1
      }
    })
      .then((data) => {
        console.log(data);
        const [result, created] = data;
        var currentVoteStatus = result.dataValues.vote_status;
        console.log(currentVoteStatus);
        if (!created) {
          if (currentVoteStatus === 1) {
            currentVoteStatus = 0;
          } else {
            currentVoteStatus = 1;
          }
           models.Vote.update(
            {
              user_id: body.user_id,
              comment_id: body.comment_id,
              vote_status: `${currentVoteStatus}`,
            },
            { where: { user_id: body.user_id, comment_id: body.comment_id } }
          );
        }
      })
      .then(() => {
        return sequelize.query(
          `SELECT SUM(vote.vote_status) as sum from vote WHERE ${body.comment_id} = vote.comment_id`,
          { type: sequelize.QueryTypes.SELECT }
        );
      })
      .then((data) => {
        return sequelize.query(
          `UPDATE comment set comment.vote_count = ${data[0].sum} WHERE comment.id = ${body.comment_id}`
        );
      })
    }
  }

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    vote_count: {
      type: DataTypes.INTEGER,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
