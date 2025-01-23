import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateRangePickerProps) => {
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date || undefined);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date || undefined);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <div className="flex flex-col">
          <DatePicker
            className="w-[150px]"
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select start date"
            customInput={<Input placeholder="Start Date" />}
          />
        </div>

        {/* End Date Picker */}
        <div className="flex flex-col">
          <DatePicker
            className="w-[150px]"
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select end date"
            customInput={<Input placeholder="End Date" />}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
