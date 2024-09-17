import React from 'react';
import storelinesImage from '../../../uploads/customerManagement/JS Footer Logo.png'; // Ensure this path is correct

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="font-bold text-lg mb-2">About Us</h3>
          <p className="text-sm">
            JAYASINGHE STORLINES is your one-stop shop for all your electronic and furniture needs.
            We pride ourselves on offering high-quality products at competitive prices.
          </p>
        </div>
        
        {/* Quick Links Section */}
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">Store</a></li>
            <li><a href="#" className="hover:text-yellow-400">Catalog</a></li>
            <li><a href="#" className="hover:text-yellow-400">Payment</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
          </ul>
        </div>
        
        {/* Contact Us Section */}
        <div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Phone: +94 123 456 789</li>
            <li>Email: info@jayasinghestorlines.com</li>
            <li>Address: 123 Main Street, Colombo, Sri Lanka</li>
          </ul>
        </div>
        
        {/* Follow Us Section */}
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400">Facebook</a></li>
              <li><a href="#" className="hover:text-yellow-400">Twitter</a></li>
              <li><a href="#" className="hover:text-yellow-400">Instagram</a></li>
              <li><a href="#" className="hover:text-yellow-400">LinkedIn</a></li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="mt-4 md:mt-0">
          <img src={storelinesImage} alt="Jayasinghe Storelines" className="w-40 h-auto rounded-3xl" />
          </div>
        </div>

      </div>
      
      {/* Copyright Section */}
      <div className="mt-8 text-center text-sm">
        &copy; 2024 JAYASINGHE STORLINES. All rights reserved.
      </div>
    </footer>
  );
}
