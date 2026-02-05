import React from 'react';

export default function Footer({ onDonateClick }) {
  return (
    <div className="footer">
      <div style={{ opacity: 0.8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 32 }}>
        <button 
          onClick={onDonateClick}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '6px 12px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            color: 'var(--muted)',
            fontSize: '16px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--primary)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.querySelector('svg').style.transform = 'scale(1.1) rotate(5deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--muted)';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.querySelector('svg').style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ transition: 'transform 0.2s ease' }}
          >
            <path d="M20.216 6.41544C19.3002 6.13636 18.2217 6.01257 17.1353 6.01257C17.1353 6.01257 17.1353 6.01257 17.1344 6.01257C17.0673 6.01257 17.0003 6.01356 16.9333 6.01455L16.9244 3.73133C16.9244 3.73133 16.9065 2.50285 15.6599 2.50285H11.5161C10.2694 2.50285 10.2516 3.73133 10.2516 3.73133L10.2426 6.16013C9.44499 6.22351 8.64645 6.36809 7.87606 6.60278C4.54228 7.61882 2.37021 11.2335 3.02476 15.6749C3.72979 20.4571 8.70984 21.3653 9.47167 21.4981V21.4991H17.7052V21.4981C18.467 21.3653 23.4462 20.4571 24.1521 15.6749C24.8057 11.2335 22.6346 7.61882 19.3008 6.60278H20.216ZM20.4793 15.1322C19.9577 18.6706 16.2764 19.3411 15.7144 19.4391H11.4624C10.9004 19.3411 7.2192 18.6706 6.69761 15.1322C6.21376 11.8484 7.81803 9.17793 10.2838 8.42629C12.448 7.76674 14.7289 7.76674 16.8921 8.42629C19.3588 9.17793 20.9631 11.8484 20.4793 15.1322Z" fill="#FFDD00"/>
            <path d="M11.667 17.0366C11.667 17.0366 14.6358 16.9831 15.1953 14.1231C15.1953 14.1231 15.3444 13.5685 14.5424 13.626C14.5424 13.626 12.3387 13.9112 11.4244 12.1643C11.4244 12.1643 11.107 11.4583 11.9654 11.1394C11.9654 11.1394 13.4391 10.6353 14.5056 11.7761C14.5056 11.7761 14.8601 12.2148 15.5507 11.8227C15.5507 11.8227 16.0363 11.5375 15.682 10.7532C15.682 10.7532 14.562 8.41638 10.453 9.61068C10.453 9.61068 7.36297 10.5907 8.46399 15.2253C8.46399 15.2253 8.76254 17.0722 11.667 17.0366Z" fill="#0D0C22"/>
          </svg> 
          <span style={{ fontWeight: 500 }}>请作者喝杯咖啡</span>
        </button>
      </div>
      <div style={{ marginBottom: 0 }}>
        <p style={{ margin: 0, lineHeight: 1.6 }}>注：估算数据与真实结算数据会有1%左右误差，非股票型基金误差较大</p>
      </div>
    </div>
  );
}
