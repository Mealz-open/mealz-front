import React, { useState, useRef, useEffect } from 'react';

// SVG 임포트 경로
import ChevronIcon from './icon/icon-chevron.svg';
import ClockIcon from './icon/icon-clock.svg';

function Timeselector({ index, time, setTime }) {
  const [open, setOpen] = useState(false);
  const selectorRef = useRef(null);

  // 안전한 기본값 설정
  const safeTime = {
    ampm: time?.ampm || '오전',
    hour: time?.hour || 1,
    minute: time?.minute || 0,
  };
  const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1~12
  const minutes = Array.from({ length: 60 }, (_, i) => i);   // 0~59
  const ampmList = ['오전', '오후'];

  const handleChange = (field, value) => {
    setTime({ ...safeTime, [field]: value });
  };

  // 입력창 밖 클릭 처리
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      // ref 내 영역(X) 외 클릭 시 닫기
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={selectorRef} style={{ position: 'relative', width: 200 }}>
      <div className='input-callender' onClick={() => setOpen(!open)}>
        <img src={ClockIcon} alt='clock' style={{ width: 20, height: 20, marginRight: 8 }} />
        <div style={{ flex: 1 }}>
          <div style={{ color: 'var(--color-primary-1)', fontSize: 12, marginBottom: 2 }}>{index}</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>
            {String(safeTime.hour).padStart(2, '0')}:{String(safeTime.minute).padStart(2, '0')}
            {safeTime.ampm === '오전' ? ' AM' : ' PM'}
          </div>
        </div>
        <img
          src={ChevronIcon}
          style={{
            height: 14,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(90deg)' : 'rotate(270deg)',
          }}
          alt='chevron'
        />
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            width: '100%',
            background: '#fff',
            border: '1px solid var(--color-monotone-3)',
            borderRadius: 5,
            boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.30)',
            padding: 12,
            zIndex: 100
          }}
        >
          <div style={{ height: 143, display: 'flex', justifyContent: 'center', gap: 12 }}>
            {/* 오전/오후 선택 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {ampmList.map(a => (
                <div
                  key={a}
                  style={{
                    padding: '6px 6px',
                    fontWeight: a === safeTime.ampm ? '600' : '500',
                    color: a === safeTime.ampm ? 'var(--color-primary-1)' : 'var(--color-monotone-3)',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleChange('ampm', a)}
                >
                  {a}
                </div>
              ))}
            </div>
            {/* 시 선택 */}
            <div style={{ overflow: 'scroll', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {hours.map(h => (
                <div
                  key={h}
                  style={{
                    padding: '6px 8px',
                    fontWeight: h === safeTime.hour ? '600' : '500',
                    color: h === safeTime.hour ? 'var(--color-primary-1)' : 'var(--color-monotone-3)',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleChange('hour', h)}
                >
                  {h}
                </div>
              ))}
            </div>
            {/* 분 선택 (5분 단위로 표시) */}
            <div style={{ overflow: 'scroll', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {minutes.filter(m => m % 5 === 0).map(m => (
                <div
                  key={m}
                  style={{
                    padding: '6px 8px',
                    fontWeight: m === safeTime.minute ? 'bold' : 'normal',
                    color: m === safeTime.minute ? 'var(--color-primary-1)' : 'var(--color-monotone-3)',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleChange('minute', m)}
                >
                  {String(m).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Timeselector;