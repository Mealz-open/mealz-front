import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as CalendarIcon } from "./icon/icon-callender.svg";
import { ReactComponent as ChevronIcon } from "./icon/icon-chevron.svg";

export default function CustomCalendar({
  placeholder = "날짜를 선택하세요",
  date,
  setDate
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const wrapperRef = useRef(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 날짜+시간 포맷
  const formatDateTime = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  // 날짜만 포맷
  const formatDateOnly = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (dateObj) => {
    const fullDateTime = formatDateTime(dateObj);
    setDate(fullDateTime);
    setIsOpen(false);
  };

  // 이전 달
  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  // 다음 달
  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // 해당 달의 날짜 데이터 생성
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentYear, currentMonth, i));
  }

  return (
    <div
      ref={wrapperRef}
      style={{ width: "100%", position: "relative", display: "inline-block" }}
    >
      {/* 인풋 영역 */}
      <div className="input-callender" onClick={() => setIsOpen(!isOpen)}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1 }}>
          <CalendarIcon width={16} height={16} />
          <input
            type="text"
            placeholder={placeholder}
            value={date ? date.split("T")[0] : ""}
            readOnly
          />
        </div>
        <ChevronIcon
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(270deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>

      {/* 달력 영역 */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            marginTop: "5px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            zIndex: 10,
            width: "100%",
            height: "288px",
          }}
        >
          {/* 헤더 */}
          <div
            className="box-row group-align-std"
            style={{ padding: "8px 6px 22px 6px" }}
          >
            <div style={{ width: "100%", fontSize: 15, fontWeight: 500 }}>
              {currentYear}년 {currentMonth + 1}월
            </div>
            <div className="btn-group" style={{ display: "flex", gap: 20 }}>
              <button
                onClick={prevMonth}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <ChevronIcon style={{ transform: "rotate(0deg)", height: 14 }} />
              </button>
              <button
                onClick={nextMonth}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <ChevronIcon style={{ transform: "rotate(180deg)", height: 14 }} />
              </button>
            </div>
          </div>

          {/* 날짜 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "12px 24px",
            }}
          >
            {days.map((dateObj, idx) => {
              const thisDateOnly = dateObj && formatDateOnly(dateObj);
              const selectedDateOnly = date ? date.split("T")[0] : "";
              return (
                <div
                  key={idx}
                  style={{
                    width: "27px",
                    height: "27px",
                    borderRadius: "50%",
                    background:
                      dateObj && selectedDateOnly === thisDateOnly
                        ? "var(--color-primary-1)"
                        : "transparent",
                    color:
                      dateObj && selectedDateOnly === thisDateOnly ? "#fff" : "#000",
                    textAlign: "center",
                    lineHeight: "28px",
                    cursor: dateObj ? "pointer" : "default",
                  }}
                  onClick={() => dateObj && handleDateClick(dateObj)}
                >
                  {dateObj ? dateObj.getDate() : ""}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}