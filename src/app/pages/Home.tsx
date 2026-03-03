import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle, Clock, Shield, Headphones } from 'lucide-react';
import { equipment, categories } from '../data/equipment';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const { addToCart } = useCart();
  const popularEquipment = equipment.filter((e) => e.popular).slice(0, 6);

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: 'Проверенная техника',
      description: 'Все единицы проходят технический осмотр перед сдачей в аренду',
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: 'Быстрая доставка',
      description: 'Доставим технику на объект в течение 24 часов',
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Страхование',
      description: 'Полная страховка техники и ответственности включена',
    },
    {
      icon: <Headphones className="w-8 h-8 text-blue-600" />,
      title: 'Поддержка 24/7',
      description: 'Техническая поддержка доступна круглосуточно',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Аренда строительной техники просто и надежно
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Более 500 единиц техники доступны для аренды. Экскаваторы, погрузчики,
                краны и многое другое с доставкой по всей России.
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors active:scale-95"
              >
                <span>Арендовать технику</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1759950345011-ee5a96640e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBleGNhdmF0b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzcyNDY5NDExfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Строительная техника"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Популярные категории
            </h2>
            <p className="text-lg text-gray-600">
              Выберите нужную категорию техники
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                to={`/catalog?category=${category.id}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-blue-200 group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Equipment Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Популярная техника
            </h2>
            <p className="text-lg text-gray-600">
              Самые востребованные предложения
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularEquipment.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.available && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Доступно
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        {item.price.toLocaleString()} ₽
                      </span>
                      <span className="text-sm text-gray-500">/сутки</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Арендовать
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/catalog"
              className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              <span>Смотреть весь каталог</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Наши преимущества
            </h2>
            <p className="text-lg text-gray-600">
              Почему выбирают RentTech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
