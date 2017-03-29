/* eslint no-magic-numbers: "off", no-console: "off", require-jsdoc: "off" */

const customer = {name: 'Foo'};
const card = {amount: 7, product: 'Bar', unitprice: 42};
const message = `Hello ${customer.name}, want to buy ${card.amount} ${card.product} for
a total of ${card.amount * card.unitprice} bucks?`;

console.log(message);

const list = [1, 2, 3];
let [a, , b] = list;

[b, a] = [a, b];
console.log(b + ' : ' + a);

const {amount, unitprice} = card;

console.log(amount + ' : ' + unitprice);

class Shape {
  constructor(id, x, y) {
    this.id = id;
    this.move(x, y);
  }
  move(x, y) {
    this.x = x;
    this.y = y;
  }
  position() {
    return this.x + ' : ' + this.y;
  }
}

class Rectangle extends Shape {
  constructor(id, x, y, width, height) {
    super(id, x, y);
    this.width = width;
    this.height = height;
  }
  position() {
    return 'Rect => ' + super.position();
  }
  static defaultRectangle() {
    return new Rectangle('default', 302, 402, 20, 10);
  }
}
class Circle extends Shape {
  constructor(id, x, y, radius) {
    super(id, x, y);
    this.radius = radius;
  }
  position() {
    return 'Circ => ' + super.position();
  }
  static defaultCircle() {
    return new Circle('default', 102, 202, 20);
  }
}
const rect = new Rectangle(1001, 400, 600, 10, 5);
const circ = new Circle(1001, 200, 300, 10);

console.log(rect.position());
console.log(circ.position());
console.log(Rectangle.defaultRectangle().position());
console.log(Circle.defaultCircle().position());
