'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import zhifubaoImg from '../assets/zhifubao.png';
import weixinImg from '../assets/weixin.png';
import { AnimatePresence, motion } from 'framer-motion';

function DonateModal({ onClose }) {
  const [method, setMethod] = useState('alipay'); // alipay, wechat

  return (
    <div 
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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="glass card modal"
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

function StatsGrid({ stats }) {
  if (!stats) return null;
  const isUp = parseFloat(stats.change) >= 0;
  const color = isUp ? 'var(--danger)' : 'var(--success)';
  const Arrow = isUp ? '↑' : '↓';

  return (
    <div className="glass" style={{ padding: '20px 32px', marginBottom: '16px', borderRadius: '12px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px' }}>
      {/* Left: Main Price & Change */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 auto' }}>
        <div style={{ fontSize: '56px', fontWeight: 'bold', color, lineHeight: 1.1, textShadow: 'none', display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '4px' }}>
          {stats.price}
          <span style={{ fontSize: '40px' }}>{Arrow}</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '24px', color, fontWeight: '600' }}>
          <span>{isUp ? '+' : ''}{stats.change}</span>
          <span>{isUp ? '+' : ''}{stats.changePercent}%</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '80px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}></div>

      {/* Right: Details Grid (5 cols x 2 rows) */}
      <div style={{ flex: '2 1 400px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px 16px', fontSize: '14px' }}>
        {/* Row 1 */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span className="muted">今开:</span>
          <span style={{ color: stats.open >= stats.prevClose ? 'var(--danger)' : 'var(--success)', fontWeight: '500' }}>{stats.open}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span className="muted">最高:</span>
          <span style={{ color: stats.high >= stats.prevClose ? 'var(--danger)' : 'var(--success)', fontWeight: '500' }}>{stats.high}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span className="muted">涨跌幅:</span>
          <span style={{ fontWeight: '500' }}>{stats.changePercent}%</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span className="muted">换手:</span>
          <span style={{ fontWeight: '500' }}>{stats.turnover || '--'}%</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span className="muted">成交量:</span>
          <span style={{ fontWeight: '500', fontSize: '13px' }}>{stats.volume}</span>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span className="muted">昨收:</span>
          <span style={{ fontWeight: '500' }}>{stats.prevClose}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span className="muted">最低:</span>
          <span style={{ color: stats.low >= stats.prevClose ? 'var(--danger)' : 'var(--success)', fontWeight: '500' }}>{stats.low}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span className="muted">涨跌额:</span>
          <span style={{ fontWeight: '500' }}>{stats.change}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span className="muted">振幅:</span>
          <span style={{ fontWeight: '500' }}>{stats.amplitude || '--'}%</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span className="muted">成交额:</span>
          <span style={{ fontWeight: '500', fontSize: '13px' }}>{stats.amount}</span>
        </div>
      </div>
    </div>
  );
}

const formatNumber = (num) => {
  if (!num) return '--';
  const n = parseFloat(num);
  if (isNaN(n)) return '--';
  if (n > 100000000) return (n / 100000000).toFixed(2) + '亿';
  if (n > 10000) return (n / 10000).toFixed(2) + '万';
  return n.toFixed(0);
};

export default function MarketPage() {
  const [indicesData, setIndicesData] = useState([]);
  const [activeCode, setActiveCode] = useState('sh000001'); // Default to SH Index (without prefix s_)
  const [activeName, setActiveName] = useState('上证指数');
  
  // Chart related state
  const [chartData, setChartData] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [tab, setTab] = useState('day'); // min, day, week, month
  const [donateOpen, setDonateOpen] = useState(false);

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
    scriptSina.async = true;

    const tempResults = {};

    const updateState = () => {
      const data = INDICES.map(index => {
        if (tempResults[index.code]) return tempResults[index.code];
        return null;
      }).filter(Boolean);
      
      if (data.length > 0) {
        setIndicesData(prev => {
           const newMap = new Map(prev.map(i => [i.code, i]));
           data.forEach(i => newMap.set(i.code, i));
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
        
        delete window[varName];
      });
      updateState();
    };

    scriptSina.onload = () => {
        const sinaMap = {
            'gb_dji': 'us.DJI',
            'gb_ixic': 'us.IXIC',
            'gb_inx': 'us.INX'
        };

        Object.keys(sinaMap).forEach(sinaVar => {
            const dataStr = window[`hq_str_${sinaVar}`];
            if (!dataStr) return;
            
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

  // --- Active Index Logic ---
  
  // Fetch Real-time Stats for Active Code
  useEffect(() => {
    const fetchStats = () => {
      const code = activeCode;
      const isUS = code.startsWith('us');
      const script = document.createElement('script');
      
      if (isUS) {
        const sinaCode = code.replace('us.', 'gb_').toLowerCase();
        script.src = `https://hq.sinajs.cn/list=${sinaCode}`;
      } else {
        script.src = `https://qt.gtimg.cn/q=${code}`;
      }
      script.async = true;

      script.onload = () => {
        let statsObj = null;
        if (isUS) {
          const sinaCode = code.replace('us.', 'gb_').toLowerCase();
          const dataStr = window[`hq_str_${sinaCode}`];
          if (dataStr) {
             const p = dataStr.split(',');
             const prevClose = parseFloat(p[26]);
             const high = parseFloat(p[6]);
             const low = parseFloat(p[7]);
             const amplitude = prevClose ? ((high - low) / prevClose * 100).toFixed(2) : '--';
             
             statsObj = {
               price: parseFloat(p[1]).toFixed(2),
               change: parseFloat(p[4]).toFixed(2),
               changePercent: parseFloat(p[2]).toFixed(2),
               open: parseFloat(p[5]).toFixed(2),
               prevClose: prevClose.toFixed(2),
               high: high.toFixed(2),
               low: low.toFixed(2),
               volume: formatNumber(p[10]),
               amount: '--',
               turnover: '--',
               amplitude: amplitude
             };
             delete window[`hq_str_${sinaCode}`];
          }
        } else {
          const varName = `v_${code.replace(/\./g, '_')}`;
          const dataStr = window[varName];
          if (dataStr) {
            const p = dataStr.split('~');
            statsObj = {
              price: parseFloat(p[3]).toFixed(2),
              change: parseFloat(p[31]).toFixed(2),
              changePercent: parseFloat(p[32]).toFixed(2),
              open: parseFloat(p[5]).toFixed(2),
              prevClose: parseFloat(p[4]).toFixed(2),
              high: parseFloat(p[33]).toFixed(2),
              low: parseFloat(p[34]).toFixed(2),
              volume: formatNumber(p[6]),
              amount: formatNumber(parseFloat(p[37]) * 10000),
              turnover: p[38],
              amplitude: p[43]
            };
            delete window[varName];
          }
        }
        if (statsObj) setStats(statsObj);
      };
      document.body.appendChild(script);
      return () => {
         if (document.body.contains(script)) document.body.removeChild(script);
      }
    };

    fetchStats();
    const timer = setInterval(fetchStats, 3000);
    return () => clearInterval(timer);
  }, [activeCode]);

  // Fetch Chart Data for Active Code
  useEffect(() => {
    setChartLoading(true);
    const fetchData = async () => {
      try {
        if (tab === 'min') {
           if (activeCode.startsWith('us')) {
             setChartData(null);
           } else {
             const res = await fetch(`https://web.ifzq.gtimg.cn/appstock/app/minute/query?code=${activeCode}`);
             const json = await res.json();
             const minData = json?.data?.[activeCode]?.data?.data || [];
             const times = [];
             const prices = [];
             const volumes = [];
             let prevVol = 0;
             
             minData.forEach((str, i) => {
                const [time, price, cumVol] = str.split(' ');
                times.push(time.slice(0, 2) + ':' + time.slice(2));
                prices.push(parseFloat(price));
                const v = parseFloat(cumVol);
                volumes.push(i === 0 ? v : Math.max(0, v - prevVol));
                prevVol = v;
             });
             
             setChartData({ type: 'min', times, prices, volumes, prevClose: stats?.prevClose });
           }
        } else {
           const klineParam = tab === 'week' ? 'week' : (tab === 'month' ? 'month' : 'day');
           const res = await fetch(`https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${activeCode},${klineParam},,,320,qfq`);
           const json = await res.json();
           const rawData = json.data[activeCode]?.[klineParam] || [];
           
           const dates = rawData.map(item => item[0]);
           const values = rawData.map(item => [
              parseFloat(item[1]),
              parseFloat(item[2]),
              parseFloat(item[4]),
              parseFloat(item[3]),
           ]);
           const volumes = rawData.map((item, index) => [
              index, 
              parseFloat(item[5]), 
              parseFloat(item[1]) > parseFloat(item[2]) ? -1 : 1 
           ]);
           setChartData({ type: 'kline', dates, values, volumes });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setChartLoading(false);
      }
    };
    fetchData();
  }, [activeCode, tab]);

  const getOption = () => {
     if (!chartData) return {};
     
     if (chartData.type === 'min') {
        return {
           backgroundColor: 'transparent',
           tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
           grid: [{ left: '3%', right: '3%', height: '60%', top: '10%' }, { left: '3%', right: '3%', top: '75%', height: '15%' }],
           xAxis: [
              { type: 'category', data: chartData.times, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { interval: 30 } },
              { type: 'category', gridIndex: 1, data: chartData.times, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { show: false } }
           ],
           yAxis: [
              { scale: true, splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#9ca3af' } },
              { scale: true, gridIndex: 1, splitNumber: 2, axisLabel: { show: false }, axisLine: { show: false }, splitLine: { show: false } }
           ],
           series: [
              { name: 'Price', type: 'line', data: chartData.prices, showSymbol: false, itemStyle: { color: '#3b82f6' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(59,130,246,0.3)' }, { offset: 1, color: 'rgba(59,130,246,0)' }] } } },
              { name: 'Volume', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: chartData.volumes, itemStyle: { color: '#9ca3af' } }
           ]
        };
     }
     
     return {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' },
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          borderColor: '#1f2937',
          textStyle: { color: '#e5e7eb' }
        },
        grid: [
            { left: '3%', right: '3%', height: '60%', top: '10%' },
            { left: '3%', right: '3%', top: '75%', height: '15%' }
        ],
        xAxis: [
            { type: 'category', data: chartData.dates, scale: true, boundaryGap: false, axisLine: { onZero: false, lineStyle: { color: '#6b7280' } }, splitLine: { show: false }, min: 'dataMin', max: 'dataMax' },
            { type: 'category', gridIndex: 1, data: chartData.dates, scale: true, boundaryGap: false, axisLine: { onZero: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false }, min: 'dataMin', max: 'dataMax' }
        ],
        yAxis: [
            { scale: true, splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#9ca3af' } },
            { scale: true, gridIndex: 1, splitNumber: 2, axisLabel: { show: false }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false } }
        ],
        dataZoom: [
            { type: 'inside', xAxisIndex: [0, 1], start: 70, end: 100 },
            { show: true, xAxisIndex: [0, 1], type: 'slider', bottom: 10, start: 70, end: 100, borderColor: '#1f2937', textStyle: { color: '#9ca3af' }, handleStyle: { color: '#22d3ee' } }
        ],
        series: [
          {
            name: activeName,
            type: 'candlestick',
            data: chartData.values,
            itemStyle: {
              color: '#ef4444',
              color0: '#22c55e',
              borderColor: '#ef4444',
              borderColor0: '#22c55e'
            }
          },
          {
              name: 'Volume',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: chartData.volumes,
              itemStyle: {
                  color: (params) => params.value[2] === 1 ? '#ef4444' : '#22c55e'
              }
          }
        ]
      };
  };

  return (
    <div className="container content">
      <div className="navbar glass">
        <div className="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="var(--accent)" strokeWidth="2" />
            <path d="M5 14c2-4 7-6 14-5" stroke="var(--primary)" strokeWidth="2" />
          </svg>
          <span>基估宝</span>
        </div>
        <div className="nav-links" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>基金</a>
            <a href="/market" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>行情</a>
        </div>
      </div>

      <h1 className="title" style={{ marginBottom: 24, fontSize: 24 }}>全球行情</h1>
      
      {/* Indices Grid */}
      <div className="indices-grid" style={{ marginBottom: 32 }}>
      {indicesData.map((item) => {
        const isUp = parseFloat(item.change) >= 0;
        const color = isUp ? 'var(--danger)' : 'var(--success)';
        const marketCode = item.code.startsWith('s_') || item.code.startsWith('r_') 
          ? item.code.substring(2) 
          : item.code;
        const isActive = activeCode === marketCode;
        
        return (
          <div 
            key={item.code} 
            className={`glass ${isActive ? 'active-card' : ''}`}
            onClick={() => {
               setActiveCode(marketCode);
               setActiveName(item.name);
               // Reset tab if switching from US (no min chart) to A-share, or vice versa if needed
               // But usually keeping 'day' is safe.
               if (marketCode.startsWith('us') && tab === 'min') setTab('day');
            }}
            style={{ 
              padding: '16px 12px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              minHeight: '100px',
              border: isActive ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s ease'
            }}
          >
            <div className="muted" style={{ fontSize: '12px', marginBottom: '4px' }}>{item.name}</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color, marginBottom: '4px' }}>
              {item.price}
            </div>
            <div style={{ fontSize: '12px', display: 'flex', gap: '8px', color }}>
              <span>{isUp ? '+' : ''}{item.change}</span>
              <span>{isUp ? '+' : ''}{item.changePercent}%</span>
            </div>
          </div>
        );
      })}
      </div>

      {/* Detail Section (Chart + Stats) */}
      <div id="market-detail">
          <div className="title" style={{ marginBottom: 16 }}>
             <span style={{ fontSize: 20, fontWeight: 'bold' }}>{activeName}</span>
             <span className="badge" style={{ marginLeft: 12 }}>{activeCode}</span>
          </div>
          
          <StatsGrid stats={stats} />

          <div className="glass card" style={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
              <div className="tabs" style={{ justifyContent: 'flex-start', borderBottom: '1px solid var(--border)', padding: '0 16px' }}>
                 {['min', 'day', 'week', 'month'].map(t => (
                   <button 
                     key={t} 
                     className={`tab ${tab === t ? 'active' : ''}`}
                     onClick={() => setTab(t)}
                     disabled={t === 'min' && activeCode.startsWith('us')}
                   >
                     {t === 'min' ? '分时' : t === 'day' ? '日K' : t === 'week' ? '周K' : '月K'}
                   </button>
                 ))}
              </div>
              <div style={{ flex: 1, minHeight: 0, padding: '16px' }}>
                {chartLoading ? (
                   <div className="loading-bar" style={{ width: '100px', margin: '40px auto' }}></div>
                ) : chartData ? (
                   <ReactECharts option={getOption()} style={{ height: '100%', width: '100%' }} />
                ) : (
                   <div style={{ textAlign: 'center', marginTop: 40 }} className="muted">暂无数据</div>
                )}
              </div>
          </div>
      </div>

      <div className="footer">
        <div style={{ opacity: 0.8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <button 
            onClick={() => setDonateOpen(true)}
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

      <AnimatePresence>
        {donateOpen && <DonateModal onClose={() => setDonateOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
