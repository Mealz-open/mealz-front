import CardMenu from '../asset/card-menu.js';

const products = [
    {
        key: 1,
        image: '',
        name: '바게트',
        quantity: 3,
        expirationDate: new Date(2025, 8, 1),
        availableTimeRange: { start: '12:30', end: '16:50'},
    },
    {
        key: 2,
        image: '',
        name: '바게트',
        quantity: 3,
        expirationDate: new Date(2025, 8, 1),
        availableTimeRange: { start: '12:30', end: '16:50'},
    },
];

function Today() {
  return(
      <div class="article">
          <div class="box-col gap10">
            {products.map(product => (
            <CardMenu
                key={product.key}
                image={product.image}
                name={product.name}
                quantity={product.quantity}
                expirationDate={product.expirationDate}
                availableTimeRange={product.availableTimeRange}
            />
            ))}
          </div>
      </div>
  );
}

export default Today;