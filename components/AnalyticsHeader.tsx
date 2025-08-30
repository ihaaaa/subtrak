import { BarChart3, Download } from "lucide-react";

export function AnalyticsHeader() {
  const handleExportCSV = () => {
    // Mock CSV export functionality
    const csvData = [
      ['Month', 'Spent', 'Saved'],
      ['Jan', '2400', '200'],
      ['Feb', '2100', '300'],
      ['Mar', '2800', '150'],
      ['Apr', '2600', '400'],
      ['May', '2900', '250'],
      ['Jun', '3200', '180'],
      ['Jul', '2800', '320'],
      ['Aug', '2500', '450'],
      ['Sep', '2700', '380'],
      ['Oct', '2400', '520'],
      ['Nov', '2900', '290'],
      ['Dec', '2847', '640'],
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subtrak-analytics.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <header className="h-16 bg-[#1E293B] border-b border-[#334155] flex items-center justify-between px-6">
      {/* Left side - Analytics title with icon */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-lg flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-white text-xl font-semibold flex items-center space-x-2">
            <span>Analytics</span>
            <span className="text-lg">📈</span>
          </h1>
          <p className="text-gray-400 text-sm">Insights into your subscription spending patterns</p>
        </div>
      </div>

      {/* Right side - Export CSV button */}
      <button
        onClick={handleExportCSV}
        className="flex items-center space-x-2 px-4 py-2 border border-[#3B82F6] text-[#3B82F6] rounded-lg hover:bg-[#3B82F6]/10 transition-colors duration-200"
      >
        <Download className="w-4 h-4" />
        <span>Export CSV</span>
      </button>
    </header>
  );
}