import React from 'react';
import { Link } from 'react-router';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">RT</span>
              </div>
              <span className="text-xl font-bold text-white">RentTech</span>
            </div>
            <p className="text-sm">
              Надежная платформа для аренды строительной и специальной техники по
              всей России.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-white transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition-colors">
                  Поиск
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Вход
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Экскаваторы
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Погрузчики
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Краны
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Генераторы
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+7 (917) 539-73-51</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>muhachevk@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Москва, проспект Вернадского 78</span>
              </li>
            </ul>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2026 RentTech. Курсовая работа по дисциплине Фронтенд-разработка.</p>
        </div>
      </div>
    </footer>
  );
};
