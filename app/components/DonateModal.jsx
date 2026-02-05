import React, { useState } from 'react';
import zhifubaoImg from '../assets/zhifubao.png';
import weixinImg from '../assets/weixin.png';

export default function DonateModal({ onClose }) {
  const [method, setMethod] = useState('alipay');

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
    >
      <div 
        className="glass card modal"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: 360, 
          width: '100%',
          opacity: 1, 
          transform: 'none' 
        }}
      >
        <div className="title" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>☕</span>
            <span style={{ fontSize: 18, fontWeight: 'bold' }}>请我喝杯咖啡</span>
          </div>
          <button 
            className="icon-button" 
            onClick={onClose} 
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }}
          >
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div className="tabs glass" style={{ padding: 4, borderRadius: 12, width: '100%', display: 'flex' }}>
              <button
                onClick={() => setMethod('alipay')}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  border: 'none',
                  background: method === 'alipay' ? 'rgba(34, 211, 238, 0.15)' : 'transparent',
                  color: method === 'alipay' ? 'var(--primary)' : 'var(--muted)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                支付宝
              </button>
              <button
                onClick={() => setMethod('wechat')}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  border: 'none',
                  background: method === 'wechat' ? 'rgba(34, 211, 238, 0.15)' : 'transparent',
                  color: method === 'wechat' ? 'var(--primary)' : 'var(--muted)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                微信支付
              </button>
            </div>

            <div 
              style={{ 
                width: 200, 
                height: 200, 
                background: 'white', 
                borderRadius: 12, 
                padding: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {method === 'alipay' ? (
                <img 
                  src={zhifubaoImg.src} 
                  alt="支付宝收款码" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              ) : (
                <img 
                  src={weixinImg.src} 
                  alt="微信收款码" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              )}
            </div>
          </div>
        </div>

        <div className="muted" style={{ fontSize: 12, textAlign: 'center', lineHeight: 1.5 }}>
          感谢您的支持！您的鼓励是我持续维护和更新的动力。
        </div>
      </div>
    </div>
  );
}
