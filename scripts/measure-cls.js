// CLS Measurement Script
// Add this to your pages to monitor layout shifts

(function() {
  let clsValue = 0;
  let clsEntries = [];

  // Create a PerformanceObserver to monitor layout shifts
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Only count layout shifts without recent user input
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
        
        console.log('Layout Shift detected:', {
          value: entry.value,
          sources: entry.sources,
          startTime: entry.startTime
        });
      }
    }
  });

  // Start observing layout shifts
  observer.observe({ entryTypes: ['layout-shift'] });

  // Report CLS value after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.log('Final CLS Score:', clsValue);
      console.log('Total Layout Shifts:', clsEntries.length);
      
      // Send to analytics (optional)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'CLS', {
          event_category: 'Web Vitals',
          value: Math.round(clsValue * 1000),
          non_interaction: true,
        });
      }
    }, 5000); // Wait 5 seconds after load
  });

  // Expose CLS data globally for debugging
  window.getCLSData = () => ({
    value: clsValue,
    entries: clsEntries
  });
})();

// Usage: Add this script to your layout.tsx or individual pages
// Then check console for CLS measurements or call window.getCLSData()
