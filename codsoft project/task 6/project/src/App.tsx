import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import { Product } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={setCurrentPage}
            selectedProduct={selectedProduct}
            onProductSelect={setSelectedProduct}
          />
        );
      case 'products':
        return (
          <ProductsPage
            searchQuery={searchQuery}
            selectedProduct={selectedProduct}
            onProductSelect={setSelectedProduct}
          />
        );
      case 'cart':
        return <CartPage onNavigate={setCurrentPage} />;
      case 'checkout':
        return <CheckoutPage onNavigate={setCurrentPage} />;
      case 'login':
        return <AuthPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminPage onNavigate={setCurrentPage} />;
      case 'about':
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h2 className="text-2xl font-semibold mb-4">About ShopHub</h2>
              <p className="text-gray-600">Your one-stop shop for amazing products!</p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600">Get in touch with our support team!</p>
            </div>
          </div>
        );
      case 'profile':
      case 'orders':
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h2 className="text-2xl font-semibold mb-4">
                {currentPage === 'profile' ? 'User Profile' : 'Order History'}
              </h2>
              <p className="text-gray-600">This feature is coming soon!</p>
            </div>
          </div>
        );
      default:
        return (
          <HomePage
            onNavigate={setCurrentPage}
            selectedProduct={selectedProduct}
            onProductSelect={setSelectedProduct}
          />
        );
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50">
            {currentPage !== 'login' && (
              <Header
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}
            {renderPage()}
          </div>
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;