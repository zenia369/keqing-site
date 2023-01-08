const Path = require("path");
const { filter } = require("../data/pictures_data.json");
const { filterPictures } = require("../service/localData.service");

const pictures = (req, res) => {
  const params = req.query;
  const { items: filtredPictures } = filterPictures(params);

  const getFilter = [];
  for (const key in filter) {
    const data = {};
    const element = filter[key];

    data.name = element.name;
    data.nameID = key;
    data.items = element.items.map((el) => ({ value: el, checked: false }));

    if (Object.hasOwnProperty.call(params, key)) {
      const queryValues = params[key];
      data.items = data.items.map((el) => {
        if (queryValues.includes(el.value)) return { ...el, checked: true };

        return el;
      });
    }

    getFilter.push(data);
  }

  res.render(Path.resolve(__dirname, "../client/views/pictures.hbs"), {
    layout: "layout-pictures",
    pictures: filtredPictures,
    filter: getFilter,
    rangeValue: params.limit ?? 20,
  });
};

module.exports = pictures;
