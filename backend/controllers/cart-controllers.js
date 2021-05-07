require('dotenv').config();

const get_all = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: 'Received all titles',
      // collection: collection__,
      // placeholder_name: placeholder_name,
      // titles: titles,
    });
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  }
};

module.exports = {
  get_all,
};
