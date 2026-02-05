'use client';

import React, { useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Stats Grid Component
function StatsGrid({ stats }) {
  if (!stats) return null;
  const isUp = parseFloat(stats.change) >= 0;
  const color = isUp ? 'var(--danger)' : 'var(--success)';

  return (
    <div className="glass" style={{ padding: '20px', marginBottom: '16px', borderRadius: '12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left: Main Price */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '40px', fontWeight: 'bold', color, lineHeight: 1 }}>{stats.price}</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '18px', color, marginTop: '12px', fontWeight: '500' }}>
            <span>{isUp ? '+' : ''}{stats.change}</span>
            <span>{isUp ? '+' : ''}{stats.changePercent}%</span>
          </div>
        </div>

        {/* Right: Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'x 24px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="muted">高</span>
            <span style={{ color: stats.high >= stats.open ? 'var(--danger)' : 'var(--success)', fontWeight: '500' }}>{stats.high}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="muted">开</span>
            <span style={{ color: stats.open >= stats.prevClose ? 'var(--danger)' : 'var(--success)', fontWeight: '500' }}>{stats.open}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="muted">低</span>
            <span style={{ color: stats.low >= stats.open ? 'var(--danger)' : 'var(--success)', fontWeight: '500' }}>{stats.low}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="muted">昨</span>
            <span style={{ fontWeight: '500' }}>{stats.prevClose}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="muted">量</span>
            <span style={{ fontWeight: '500' }}>{stats.volume}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="muted">额</span>
            <span style={{ fontWeight: '500' }}>{stats.amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to format numbers
const formatNumber = (num) => {
  if (!num) return '--';
  const n = parseFloat(num);
  if (isNaN(n)) return '--';
  if (n > 100000000) return (n / 100000000).toFixed(2) + '亿';
  if (n > 10000) return (n / 10000).toFixed(2) + '万';
  return n.toFixed(0);
};

export default function MarketPage({ params }) {
  const { code } = params;
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || code;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [tab, setTab] = useState('day'); // min, day, week, month

  // Fetch Real-time Stats
  useEffect(() => {
    const fetchStats = () => {
      const isUS = code.startsWith('us');
      const script = document.createElement('script');
      
      if (isUS) {
        // Sina API for US
        const sinaCode = code.replace('us.', 'gb_').toLowerCase();
        script.src = `https://hq.sinajs.cn/list=${sinaCode}`;
      } else {
        // Tencent API for A/HK
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
             statsObj = {
               price: parseFloat(p[1]).toFixed(2),
               change: parseFloat(p[4]).toFixed(2),
               changePercent: parseFloat(p[2]).toFixed(2),
               open: parseFloat(p[5]).toFixed(2),
               prevClose: parseFloat(p[26]).toFixed(2), // Sina US prev close index might differ, let's double check index 26 is correct from previous logs
               high: parseFloat(p[6]).toFixed(2),
               low: parseFloat(p[7]).toFixed(2),
               volume: formatNumber(p[10]),
               amount: '--' // Sina doesn't always provide amount for US indices
             };
             // Correction: Sina US string "道琼斯,49501.3008,0.53,2026-02-05 05:40:07,260.3100,49323.5898,49649.8594,49112.4297,..."
             // 1: Cur, 2: %, 4: Chg, 5: Open, 6: High, 7: Low, 26: PrevClose (Verified from log: 49240.9883 at end)
             delete window[`hq_str_${sinaCode}`];
          }
        } else {
          // Tencent
          const varName = `v_${code.replace(/\./g, '_')}`;
          const dataStr = window[varName];
          if (dataStr) {
            const p = dataStr.split('~');
            // 3: Cur, 4: Prev, 5: Open, 6: Vol, 31: Chg, 32: %, 33: High, 34: Low, 37: Amount
            statsObj = {
              price: parseFloat(p[3]).toFixed(2),
              change: parseFloat(p[31]).toFixed(2),
              changePercent: parseFloat(p[32]).toFixed(2),
              open: parseFloat(p[5]).toFixed(2),
              prevClose: parseFloat(p[4]).toFixed(2),
              high: parseFloat(p[33]).toFixed(2),
              low: parseFloat(p[34]).toFixed(2),
              volume: formatNumber(p[6]), // Tencent Vol is raw
              amount: formatNumber(parseFloat(p[37]) * 10000) // Tencent Amount is in Wan
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
  }, [code]);

  // Fetch Chart Data
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (tab === 'min') {
           // Min Chart
           if (code.startsWith('us')) {
             // Fallback for US min chart (not supported by this free API)
             // We could just load day chart or show empty
             setData(null); // Or keep previous?
           } else {
             const res = await fetch(`https://web.ifzq.gtimg.cn/appstock/app/minute/query?code=${code}`);
             const json = await res.json();
             const minData = json?.data?.[code]?.data?.data || [];
             // Format: "HHMM Price Vol ..."
             // We need to process volume to be per minute
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
             
             setData({ type: 'min', times, prices, volumes, prevClose: stats?.prevClose });
           }
        } else {
           // K-Line
           const klineParam = tab === 'week' ? 'week' : (tab === 'month' ? 'month' : 'day');
           const res = await fetch(`https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${code},${klineParam},,,320,qfq`);
           const json = await res.json();
           const rawData = json.data[code]?.[klineParam] || [];
           
           const dates = rawData.map(item => item[0]);
           const values = rawData.map(item => [
              parseFloat(item[1]), // Open
              parseFloat(item[2]), // Close
              parseFloat(item[4]), // Low
              parseFloat(item[3]), // High
           ]);
           const volumes = rawData.map((item, index) => [
              index, 
              parseFloat(item[5]), 
              parseFloat(item[1]) > parseFloat(item[2]) ? -1 : 1 
           ]);
           setData({ type: 'kline', dates, values, volumes });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [code, tab]); // Removed stats dependency to avoid re-fetching chart on every tick

  const getOption = () => {
     if (!data) return {};
     
     if (data.type === 'min') {
        return {
           backgroundColor: 'transparent',
           tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
           grid: [{ left: '3%', right: '3%', height: '60%', top: '10%' }, { left: '3%', right: '3%', top: '75%', height: '15%' }],
           xAxis: [
              { type: 'category', data: data.times, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { interval: 30 } },
              { type: 'category', gridIndex: 1, data: data.times, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { show: false } }
           ],
           yAxis: [
              { scale: true, splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#9ca3af' } },
              { scale: true, gridIndex: 1, splitNumber: 2, axisLabel: { show: false }, axisLine: { show: false }, splitLine: { show: false } }
           ],
           series: [
              { name: 'Price', type: 'line', data: data.prices, showSymbol: false, itemStyle: { color: '#3b82f6' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(59,130,246,0.3)' }, { offset: 1, color: 'rgba(59,130,246,0)' }] } } },
              { name: 'Volume', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: data.volumes, itemStyle: { color: '#9ca3af' } }
           ]
        };
     }
     
     // Kline Option
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
            { type: 'category', data: data.dates, scale: true, boundaryGap: false, axisLine: { onZero: false, lineStyle: { color: '#6b7280' } }, splitLine: { show: false }, min: 'dataMin', max: 'dataMax' },
            { type: 'category', gridIndex: 1, data: data.dates, scale: true, boundaryGap: false, axisLine: { onZero: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false }, min: 'dataMin', max: 'dataMax' }
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
            name: name,
            type: 'candlestick',
            data: data.values,
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
              data: data.volumes,
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
          <Link href="/market" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
             </svg>
             <span>{name}</span>
          </Link>
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: '20px', marginLeft: 'auto' }}>
            <span className="badge">{code}</span>
        </div>
      </div>

      <StatsGrid stats={stats} />

      <div className="glass card" style={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
          <div className="tabs" style={{ justifyContent: 'flex-start', borderBottom: '1px solid var(--border)', padding: '0 16px' }}>
             {['min', 'day', 'week', 'month'].map(t => (
               <button 
                 key={t} 
                 className={`tab ${tab === t ? 'active' : ''}`}
                 onClick={() => setTab(t)}
                 disabled={t === 'min' && code.startsWith('us')} // Disable Min for US
               >
                 {t === 'min' ? '分时' : t === 'day' ? '日K' : t === 'week' ? '周K' : '月K'}
               </button>
             ))}
          </div>
          <div style={{ flex: 1, minHeight: 0, padding: '16px' }}>
            {loading ? (
               <div className="loading-bar" style={{ width: '100px', margin: '40px auto' }}></div>
            ) : data ? (
               <ReactECharts option={getOption()} style={{ height: '100%', width: '100%' }} />
            ) : (
               <div style={{ textAlign: 'center', marginTop: 40 }} className="muted">暂无数据</div>
            )}
          </div>
      </div>
    </div>
  );
}
