'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const INDICES = [
  { name: '上证指数', code: 's_sh000001', type: 'A' },
  { name: '深证成指', code: 's_sz399001', type: 'A' },
  { name: '创业板指', code: 's_sz399006', type: 'A' },
  { name: '沪深300', code: 's_sh000300', type: 'A' },
  { name: '科创50', code: 's_sh000688', type: 'A' },
  { name: '恒生指数', code: 'r_hkHSI', type: 'HK' },
  { name: '恒生科技', code: 'r_hkHSTECH', type: 'HK' },
  { name: '道琼斯', code: 'us.DJI', type: 'US' },
  { name: '纳斯达克', code: 'us.IXIC', type: 'US' },
  { name: '标普500', code: 'us.INX', type: 'US' },
];

export default function MarketIndices() {
  const [indicesData, setIndicesData] = useState([]);

  const fetchIndices = () => {
    // 1. Fetch Tencent Data (A-Share & HK)
    const tencentCodes = INDICES.filter(i => i.type !== 'US').map(i => i.code).join(',');
    const scriptTencent = document.createElement('script');
    scriptTencent.src = `https://qt.gtimg.cn/q=${tencentCodes}`;
    scriptTencent.async = true;

    // 2. Fetch Sina Data (US Stocks) - Using gb_ prefix for global market
    const sinaCodes = 'gb_dji,gb_ixic,gb_inx';
    const scriptSina = document.createElement('script');
    scriptSina.src = `https://hq.sinajs.cn/list=${sinaCodes}`;
    // Sina API requires Referer header usually, but script tag injection bypasses CORS. 
    // However, Sina might check referer. If script fails, we might need proxy.
    // Let's try direct script injection first as it often works for hq.sinajs.cn
    scriptSina.async = true;

    // Helper to process data after both scripts load (or fail)
    // We'll use a simple counter or just update state independently if possible.
    // But since we want to maintain order, let's wait for both or just update state incrementally.
    // To keep it simple, we'll update state in one go if possible, or merge.
    // Let's use a temporary map to store results.

    const tempResults = {};

    const updateState = () => {
      const data = INDICES.map(index => {
        if (tempResults[index.code]) return tempResults[index.code];
        return null;
      }).filter(Boolean);
      
      if (data.length > 0) {
        setIndicesData(prev => {
           // Merge with previous data to avoid flickering if one request fails/slows
           const newMap = new Map(prev.map(i => [i.code, i]));
           data.forEach(i => newMap.set(i.code, i));
           
           // Restore original order
           return INDICES.map(i => newMap.get(i.code)).filter(Boolean);
        });
      }
    };

    scriptTencent.onload = () => {
      INDICES.filter(i => i.type !== 'US').forEach(index => {
        const varName = `v_${index.code.replace(/\./g, '_')}`; // Tencent var name format
        const dataStr = window[varName];
        if (!dataStr) return;

        const params = dataStr.split('~');
        let price, change, changePercent;

        if (index.type === 'A') {
          price = params[3];
          change = params[4];
          changePercent = params[5];
        } else {
          // HK
          price = params[3];
          change = params[31];
          changePercent = params[32];
        }

        tempResults[index.code] = {
          ...index,
          price: parseFloat(price).toFixed(2),
          change: parseFloat(change).toFixed(2),
          changePercent: parseFloat(changePercent).toFixed(2),
        };
        
        // Cleanup
        delete window[varName];
      });
      updateState();
    };

    scriptSina.onload = () => {
        // Mapping Sina vars to our codes
        const sinaMap = {
            'gb_dji': 'us.DJI',
            'gb_ixic': 'us.IXIC',
            'gb_inx': 'us.INX'
        };

        Object.keys(sinaMap).forEach(sinaVar => {
            const dataStr = window[`hq_str_${sinaVar}`];
            if (!dataStr) return;
            
            // Format: name,price,change_percent,date,diff,open,high,low,last_close...
            // e.g. "道琼斯,49501.3008,0.53,2026-02-05 05:40:07,260.3100,..."
            const params = dataStr.split(',');
            const price = parseFloat(params[1]);
            const change = parseFloat(params[4]);
            const changePercent = parseFloat(params[2]);
            
            const myCode = sinaMap[sinaVar];
            const originalIndex = INDICES.find(i => i.code === myCode);
            
            if (originalIndex) {
                tempResults[myCode] = {
                    ...originalIndex,
                    price: price.toFixed(2),
                    change: change.toFixed(2),
                    changePercent: changePercent.toFixed(2)
                };
            }
            
            // Cleanup
            delete window[`hq_str_${sinaVar}`];
        });
        updateState();
    };

    document.body.appendChild(scriptTencent);
    document.body.appendChild(scriptSina);
    
    return () => {
        if (document.body.contains(scriptTencent)) document.body.removeChild(scriptTencent);
        if (document.body.contains(scriptSina)) document.body.removeChild(scriptSina);
    }
  };

  useEffect(() => {
    fetchIndices();
    const timer = setInterval(fetchIndices, 10000); // Refresh every 10 seconds
    return () => clearInterval(timer);
  }, []);

  if (indicesData.length === 0) return null;

  return (
    <div className="indices-grid" style={{ marginBottom: '24px' }}>
      {indicesData.map((item) => {
        const isUp = parseFloat(item.change) >= 0;
        const color = isUp ? 'var(--danger)' : 'var(--success)';
        const marketCode = item.code.startsWith('s_') || item.code.startsWith('r_') 
          ? item.code.substring(2) 
          : item.code;
        
        return (
          <Link 
            href={`/market/${marketCode}?name=${encodeURIComponent(item.name)}`}
            key={item.code} 
            className="glass" 
            target="_blank"
            style={{ 
              padding: '12px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <div className="muted" style={{ fontSize: '12px', marginBottom: '4px' }}>{item.name}</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color }}>
              {item.price}
            </div>
            <div style={{ fontSize: '12px', display: 'flex', gap: '8px', color }}>
              <span>{isUp ? '+' : ''}{item.change}</span>
              <span>{isUp ? '+' : ''}{item.changePercent}%</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
