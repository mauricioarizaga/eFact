const Productos = (sequelize, S) => {
  const Prod = sequelize.define(
    "productos",
    {
      nombreproducto: {
        type: S.STRING,
        allowNull: false,
      },
      descripcion: {
        type: S.ARRAY(S.INTEGER),
        defaultValue: [],
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Prod;
};

module.exports = Productos;
