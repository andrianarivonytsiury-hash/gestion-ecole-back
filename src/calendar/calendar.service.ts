import { Injectable } from '@nestjs/common';

export interface HolidayRecord {
  id: number;
  label: string;
  startDate: string;
  endDate: string;
  type: string;
}

@Injectable()
export class CalendarService {
  private holidays: HolidayRecord[] = [
    { id: 1, label: 'Vacances de Noel', startDate: '2024-12-20', endDate: '2025-01-05', type: 'holiday' },
    { id: 2, label: 'Journee pedagogique', startDate: '2025-02-14', endDate: '2025-02-14', type: 'pause' },
  ];

  list() {
    return this.holidays;
  }

  add(payload: { label: string; startDate: string; endDate: string; type: string }) {
    const id = (this.holidays[this.holidays.length - 1]?.id || 0) + 1;
    const record: HolidayRecord = { id, ...payload };
    this.holidays.push(record);
    return record;
  }

  remove(id: number) {
    const before = this.holidays.length;
    this.holidays = this.holidays.filter((h) => h.id !== id);
    return { removed: before - this.holidays.length };
  }
}
