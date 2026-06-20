export type VaccineItem = {
  name: string;
  price: string;
  // "core" = วัคซีนหลัก, "optional" = วัคซีนเสริม
  type: "core" | "optional";
};

export type VaccineAgeGroup = {
  age: string;
  items: VaccineItem[];
};

export const vaccineSchedule: VaccineAgeGroup[] = [
  {
    age: "2 เดือน",
    items: [
      { name: "วัคซีนรวม 6 โรค (คอตีบ ไอกรน บาดทะยัก โปลิโอ ตับอักเสบบี ฮิบ)", price: "2,300", type: "core" },
      { name: "วัคซีนป้องกันไวรัสโรต้า (Rotarix / Rotateq)", price: "1,400 / 1,100", type: "optional" },
      { name: "วัคซีนป้องกันปอดอักเสบ IPD เข็มที่ 1 (15 / 20 สายพันธุ์)", price: "3,200 / 3,600", type: "optional" },
      { name: "วัคซีนป้องกันไข้กาฬหลังแอ่น 4CMenB เข็มที่ 1", price: "4,000", type: "optional" },
    ],
  },
  {
    age: "4 เดือน",
    items: [
      { name: "วัคซีนรวม 5 โรค (คอตีบ ไอกรน บาดทะยัก โปลิโอ ฮิบ)", price: "1,900", type: "core" },
      { name: "วัคซีนป้องกันไวรัสโรต้า (Rotarix / Rotateq)", price: "1,400 / 1,100", type: "optional" },
      { name: "วัคซีนป้องกันปอดอักเสบ IPD เข็มที่ 2 (15 / 20 สายพันธุ์)", price: "3,200 / 3,600", type: "optional" },
      { name: "วัคซีนป้องกันไข้กาฬหลังแอ่น 4CMenB เข็มที่ 2", price: "4,000", type: "optional" },
    ],
  },
  {
    age: "6 เดือน",
    items: [
      { name: "วัคซีนรวม 6 โรค (คอตีบ ไอกรน บาดทะยัก โปลิโอ ตับอักเสบบี ฮิบ)", price: "2,300", type: "core" },
      { name: "วัคซีนป้องกันไวรัสโรต้า (Rotateq)", price: "1,100", type: "optional" },
      { name: "วัคซีนป้องกันปอดอักเสบ IPD เข็มที่ 3 (15 / 20 สายพันธุ์)", price: "3,200 / 3,600", type: "optional" },
    ],
  },
  {
    age: "7 เดือน",
    items: [
      { name: "วัคซีนป้องกันไข้หวัดใหญ่ เข็มที่ 1", price: "700", type: "optional" },
      { name: "วัคซีนป้องกันมือ เท้า ปาก (EV71) เข็มที่ 1", price: "3,200", type: "optional" },
    ],
  },
  {
    age: "8 เดือน",
    items: [
      { name: "วัคซีนป้องกันไข้หวัดใหญ่ เข็มที่ 2", price: "700", type: "optional" },
      { name: "วัคซีนป้องกันมือ เท้า ปาก (EV71) เข็มที่ 2", price: "3,200", type: "optional" },
    ],
  },
  {
    age: "9 เดือน",
    items: [
      { name: "วัคซีนป้องกันไข้สมองอักเสบเจอี เข็มที่ 1", price: "1,000", type: "core" },
    ],
  },
  {
    age: "12 เดือน",
    items: [
      { name: "วัคซีนป้องกันหัด หัดเยอรมัน คางทูม (MMR) เข็มที่ 1", price: "1,000", type: "core" },
      { name: "วัคซีนป้องกันปอดอักเสบ IPD เข็มที่ 4 (15 / 20 สายพันธุ์)", price: "3,200 / 3,600", type: "optional" },
      { name: "วัคซีนป้องกันไข้กาฬหลังแอ่น 4CMenB เข็มที่ 3", price: "4,000", type: "optional" },
    ],
  },
  {
    age: "13 เดือน",
    items: [
      { name: "วัคซีนป้องกันโรคสุกใส เข็มที่ 1", price: "1,800", type: "optional" },
      { name: "วัคซีนป้องกันโรคตับอักเสบเอ เข็มที่ 1", price: "1,400", type: "optional" },
      { name: "วัคซีนรวมหัด หัดเยอรมัน คางทูม สุกใส (MMRV)", price: "3,000", type: "optional" },
    ],
  },
  {
    age: "18 เดือน",
    items: [
      { name: "วัคซีนรวม 5 โรค (คอตีบ ไอกรน บาดทะยัก โปลิโอ ฮิบ) เข็มกระตุ้น", price: "1,900", type: "core" },
      { name: "วัคซีนป้องกันหัด หัดเยอรมัน คางทูม (MMR) เข็มที่ 2", price: "1,000", type: "core" },
    ],
  },
  {
    age: "19 เดือน",
    items: [
      { name: "วัคซีนป้องกันโรคสุกใส เข็มที่ 2", price: "1,800", type: "optional" },
      { name: "วัคซีนป้องกันโรคตับอักเสบเอ เข็มที่ 2", price: "1,400", type: "optional" },
    ],
  },
  {
    age: "24 เดือน",
    items: [
      { name: "วัคซีนป้องกันไข้สมองอักเสบเจอี เข็มที่ 2", price: "1,000", type: "core" },
      { name: "วัคซีนป้องกันไข้เลือดออก (อายุ 2-49 ปี)", price: "1,500", type: "optional" },
    ],
  },
  {
    age: "4 ปี",
    items: [
      { name: "วัคซีนรวม 4 โรค (คอตีบ ไอกรน บาดทะยัก โปลิโอ)", price: "1,500", type: "core" },
      { name: "วัคซีนป้องกันไข้เลือดออกชนิดใหม่ (ฉีด 2 เข็ม ห่างกัน 3 เดือน)", price: "2,500 / เข็ม", type: "optional" },
    ],
  },
  {
    age: "9 ปี",
    items: [
      { name: "วัคซีนป้องกันมะเร็งปากมดลูก HPV ชนิด 9 สายพันธุ์ (อายุ 9-15 ปี ฉีด 2 เข็ม ห่างกัน 6-12 เดือน)", price: "6,900 / เข็ม", type: "optional" },
    ],
  },
  {
    age: "11-12 ปี",
    items: [
      { name: "วัคซีนกระตุ้น คอตีบ ไอกรน บาดทะยัก", price: "1,000", type: "core" },
    ],
  },
  {
    age: "ทุกอายุ",
    items: [
      { name: "วัคซีนป้องกันพิษสุนัขบ้า ก่อนสัมผัสโรค (ฉีด 2 เข็ม ห่างกัน 7 วัน)", price: "950 / เข็ม", type: "optional" },
    ],
  },
];
