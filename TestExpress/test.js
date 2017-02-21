let monk = require('monk');
// let shop = require('./ShopModel')(); let school = require('./SchoolModel')();
let user = require('./UserModel')();

let url = 'localhost:27017/test';
let db = null;

monk(url).then((db1) => {
  db = db1;
  console.log('Connected to database...');
  dbReq();
}).catch((err) => {
  console.log(err);
});

function dbReq() {
  // shop.findAll(db).then((docs) => {   console.log('************** SHOPS **************...');
  // console.log(JSON.stringify(docs));   console.log('************** DONE SHOPS **************...'); });
  // shop.findCostco(db).then((docs) => {   console.log('************** COSTO **************...');
  // console.log(JSON.stringify(docs));   console.log('************** COSTCO **************...'); });
  // school.findAll(db).then((docs) => {   console.log('************** SCHOOLS **************...');
  // console.log(JSON.stringify(docs));   console.log('************** DONE SCHOOLS **************...'); });
  // school.findTHRogers(db).then((docs) => {   console.log('************** findTHRogers **************...');
  // console.log(JSON.stringify(docs));   console.log('************** DONE findTHRogers **************...'); });

  user.insert(db, [
    {
      uid: 'Bala',
      pwd: 'bala',
    }, {
      uid: 'Senthan',
      pwd: 'senthan',
    },
  ]).then((docs) => {
    console.log('************** USERS **************...');
    console.log(JSON.stringify(docs));
    console.log('************** DONE USERS **************...');
  });
}
