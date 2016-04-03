import Brew from '../models/Brew';

const brews = (app) => {
  app.route('/api/brews')
    .get((req, res) => {
      Brew.find(function(error, items) {
        res.send(items);
      });
    })
    .post((req, res) => {
      console.log('Adding brew:', brew);
      const brew = req.body;
      const brewItem = new Brew(brew);
      brewItem.save(function(err, data) {
        res.status(300).send();
      });
    });

  app.route('/api/b/:brewId')
    .get((req, res) => {
      Brew.find({
        brewId: req.params.brewId
      }, function(err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    })
};

export default brews;
