export default (order: any) => {
  let sum = 0;
  let way = order.oblast ? (order.way * 50) : 0;
  let people = order.people ? (order.numPeople) : 0;
  let peopleSum = order.people ? ((order.material ? people * 350 : people * 300) * 2) : 0;
  let car = order.car ? ((order.boldCar ? 600 : 500) * 2) : 0;
  sum = (way + peopleSum + car);
  if (order.car) {
    // sum *= 0.95;
  }
  return sum;
};
