import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // a11y: ใช้กฎ recommended ของ jsx-a11y ทั้งชุด (Next เปิดไว้แค่บางข้อ) กันปัญหาการเข้าถึงกลับมาอีก
  // plugin ถูกลงทะเบียนโดย eslint-config-next แล้ว จึงเพิ่มแค่ rules
  {
    files: ["app/**/*.{ts,tsx}"],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      // กรอบตารางที่เลื่อนได้ (role="region") ต้อง Tab ถึงเพื่อเลื่อนด้วยคีย์บอร์ด
      "jsx-a11y/no-noninteractive-tabindex": ["error", { tags: [], roles: ["tabpanel", "region"] }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
