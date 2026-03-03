import React, { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Trash2, Plus, Minus, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    updateRentalDays,
    clearCart,
    getTotalPrice,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} удален из корзины`);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
      toast.success('Количество обновлено');
    }
  };

  const handleRentalDaysChange = (id: string, newDays: number) => {
    if (newDays > 0) {
      updateRentalDays(id, newDays);
      toast.success('Срок аренды обновлен');
    }
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    toast.success('Заявка на аренду оформлена!');
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Корзина пуста
          </h2>
          <p className="text-gray-600 mb-8">
            Добавьте технику в корзину для оформления аренды
          </p>
          <Link
            to="/catalog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
          <p className="text-gray-600 mt-2">
            {cart.length} {cart.length === 1 ? 'товар' : 'товара'} в корзине
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Image */}
                  <div className="w-full sm:w-40 h-40 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Удалить"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Quantity Control */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Количество
                        </label>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Rental Days Control */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Срок аренды (суток)
                        </label>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            min="1"
                            value={item.rentalDays}
                            onChange={(e) =>
                              handleRentalDaysChange(
                                item.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <span className="text-sm text-gray-600">
                            {item.price.toLocaleString()} ₽ × {item.quantity} ×{' '}
                            {item.rentalDays} = {' '}
                            <span className="font-semibold text-gray-900">
                              {(
                                item.price *
                                item.quantity *
                                item.rentalDays
                              ).toLocaleString()}{' '}
                              ₽
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Итого
              </h2>

              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {item.name.length > 20
                        ? item.name.substring(0, 20) + '...'
                        : item.name}{' '}
                      × {item.quantity}
                    </span>
                    <span>
                      {(
                        item.price *
                        item.quantity *
                        item.rentalDays
                      ).toLocaleString()}{' '}
                      ₽
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Всего к оплате:</span>
                  <span>{getTotalPrice().toLocaleString()} ₽</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={showCheckout}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {showCheckout ? 'Оформляется...' : 'Оформить аренду'}
              </button>

              <button
                onClick={() => {
                  clearCart();
                  toast.success('Корзина очищена');
                }}
                className="w-full bg-white text-gray-700 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Очистить корзину
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Бесплатная доставка</span> при
                  заказе от 10 000 ₽
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
