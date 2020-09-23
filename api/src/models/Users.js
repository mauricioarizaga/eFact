const crypto = require("crypto-js");

const Users = (sequelize, S) => {
  const U = sequelize.define(
    "users",
    {
      fullName: {
        type: S.STRING,
        allowNull: true,
      },
      password: {
        type: S.STRING,
        allowNull: true,
        validate: {
          min: 6,
        },
      },
      email: {
        type: S.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      idNumber: {
        type: S.STRING,
        allowNull: true,
        unique: true,
      },
      phone: {
        type: S.STRING,
        allowNull: true,
        unique: true,
      },
      email_hash: {
        type: S.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("email_hash");
        },
        set(value) {
          const hashedEmail = crypto
            .SHA3(value, { outputLength: 224 })
            .toString(crypto.enc.Hex);
          this.setDataValue("email_hash", hashedEmail);
        },
      },
    },
    {
      timestamps: false,
    }
  );

  return U;
};

module.exports = Users;
