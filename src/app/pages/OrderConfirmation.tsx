import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Phone, Mail, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: Partial<typeof form> = {};

    if (!form.name.trim()) {
      newErrors.name = 'Укажите ваше имя';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Укажите телефон';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Укажите email';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!form.address.trim()) {
      newErrors.address = 'Укажите адрес или город';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // В реальном приложении здесь будет отправка данных на сервер
    console.log('Order confirmation:', {
      contact: form,
      cart,
      total: getTotalPrice(),
    });

    clearCart();
    toast.success('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
    navigate('/catalog');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Подтверждение заказа
              </h1>
              <p className="text-gray-600">
                Укажите ваши контактные данные, чтобы мы могли связаться с вами
                для подтверждения аренды.
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Order summary */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Позиции в заказе: {cart.length}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                Итого: {getTotalPrice().toLocaleString()} ₽
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Детализацию заказа вы увидите в письме и при обратном звонке
              менеджера.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Имя и фамилия
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Иван Иванов"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Телефон
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Адрес доставки или город
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="address"
                  type="text"
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Санкт-Петербург, Невский проспект..."
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Комментарий к заказу (необязательно)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="comment"
                  rows={3}
                  value={form.comment}
                  onChange={(e) => handleChange('comment', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Удобное время звонка, особенности площадки, пожелания..."
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Подтвердить заказ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

