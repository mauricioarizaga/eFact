const Facturas = (sequelize, S) => {
  const F = sequelize.define(
    "facturas",
    {
      usuarioId: {
        type: S.INTEGER,
        allowNull: false,
      },
      cliente: {
        type: S.STRING,
        allowNull: false,
      },

      productos: {
        type: S.STRING,
        allowNull: false,
      },
      cantidad: {
        type: S.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      subtotal: {
        type: S.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      descuento: {
        type: S.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      total: {
        type: S.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      cuit: {
        type: S.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false }
  );

  return F;
};

module.exports = Facturas;
