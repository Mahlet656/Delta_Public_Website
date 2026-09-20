// src/data/airlines.ts
// Single source of truth for airline partner data.
// Used by FlightBookingModal (dropdown) and Home (partner grid).

export interface AirlinePartner {
  id: string;
  name: string;
  flag: string;
  code: string;          // IATA code, e.g. "ET"
  alliance: string;      // e.g. "Star Alliance" / "Low-Cost Carrier"
  image: string;
  hub: string;
  baggage: string;
  inflight: string;
  frequency: string;
  badge: string;
}

export const AIRLINE_PARTNERS: AirlinePartner[] = [
  {
    id: 'ethiopian',
    name: 'Ethiopian Airlines',
    flag: '🇪🇹',
    code: 'ET',
    alliance: 'Star Alliance',
    image: '/airlines/ethiopian.jpg',
    hub: 'Addis Ababa Bole Intl (ADD)',
    baggage: '30kg + 7kg carry-on',
    inflight: 'Hot meals, beverages, and special meals',
    frequency: '10 weekly flights to JED',
    badge: 'National Carrier'
  },
  {
    id: 'turkish',
    name: 'Turkish Airlines',
    flag: '🇹🇷',
    code: 'TK',
    alliance: 'Star Alliance',
    image: '/airlines/turkish.jpg',
    hub: 'Istanbul Airport (IST)',
    baggage: '30kg + 8kg carry-on',
    inflight: 'Hot meals, beverages, and special meals',
    frequency: '7 weekly flights',
    badge: 'Global Network'
  },
  {
    id: 'flynas',
    name: 'Flynas',
    flag: '🇸🇦',
    code: 'XY',
    alliance: 'Low-Cost Carrier',
    image: '/airlines/flynas.jpg',
    hub: 'King Khalid Intl (RUH)',
    baggage: '25kg + 7kg carry-on',
    inflight: 'Snacks and beverages (buy on board)',
    frequency: '10 weekly flights',
    badge: 'Affordable Option'
  },
  {
    id: 'emirates',
    name: 'Emirates',
    flag: '🇦🇪',
    code: 'EK',
    alliance: 'Skytrax 5-Star',
    image: '/airlines/emirates.jpg',
    hub: 'Dubai Intl (DXB)',
    baggage: '30kg + 7kg carry-on',
    inflight: 'Gourmet meals, beverages, and special meals',
    frequency: '14 weekly flights',
    badge: 'Premium Experience'
  },
  {
    id: 'etihad',
    name: 'Etihad Airways',
    flag: '🇦🇪',
    code: 'EY',
    alliance: 'Skytrax 4-Star',
    image: '/airlines/etihad.jpg',
    hub: 'Abu Dhabi Intl (AUH)',
    baggage: '30kg + 7kg carry-on',
    inflight: 'Premium meals, beverages, and special meals',
    frequency: '7 weekly flights',
    badge: 'Luxury Travel'
  },
  {
    id: 'flydubai',
    name: 'Flydubai',
    flag: '🇦🇪',
    code: 'FZ',
    alliance: 'Low-Cost Carrier',
    image: '/airlines/flydubai.jpg',
    hub: 'Dubai Intl (DXB)',
    baggage: '20kg + 7kg carry-on',
    inflight: 'Snacks and beverages (buy on board)',
    frequency: '7 weekly flights',
    badge: 'Budget Friendly'
  },
  {
    id: 'qatar',
    name: 'Qatar Airways',
    flag: '🇶🇦',
    code: 'QR',
    alliance: 'Skytrax 5-Star',
    image: '/airlines/qatar.jpg',
    hub: 'Hamad Intl (DOH)',
    baggage: '30kg + 7kg carry-on',
    inflight: 'Gourmet meals, beverages, and special meals',
    frequency: '7 weekly flights',
    badge: '5-Star Airline'
  }
];
