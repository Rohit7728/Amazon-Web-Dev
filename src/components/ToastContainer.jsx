import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useCart();

  if (toasts.length === 0) return null;

  // Map icon component based on toast type
  const renderIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="toast-icon toast-icon-success" size={18} />;
      case 'warning':
        return <AlertTriangle className="toast-icon toast-icon-warning" size={18} />;
      case 'info':
        return <Info className="toast-icon toast-icon-info" size={18} />;
      default:
        return <AlertCircle className="toast-icon" size={18} />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`toast toast-${toast.type}`}
        >
          {renderIcon(toast.type)}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
export default ToastContainer;
