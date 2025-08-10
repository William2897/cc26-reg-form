import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-08-09T23:59:59+08:00');

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-600 dark:to-blue-700 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <Clock className="w-6 h-6 mr-2" />
        <h3 className="text-lg font-semibold">Registration Deadline</h3>
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <Calendar className="w-5 h-5 mr-2" />
        <span className="text-sm opacity-90">August 9, 2026</span>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
          <div className="text-xs opacity-80">Days</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className="text-xs opacity-80">Hours</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-xs opacity-80">Minutes</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <div className="text-xs opacity-80">Seconds</div>
        </div>
      </div>
    </div>
  );
};