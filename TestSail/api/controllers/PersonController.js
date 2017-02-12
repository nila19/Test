/*global Person*/

module.exports = {
  findOne: function(req, resp) {
    Person.find(req.params.id).populate('contacts').exec(function(error, persons) {
      var person = persons[0];
      person.fullName = person.firstName + ' ' + person.lastName;
      resp.json(person);
    });
  }
};
