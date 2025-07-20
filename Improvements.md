# Timezone Update: UTC to IST

Convert application timestamps from UTC to Indian Standard Time (IST/UTC+5:30)

### Option 1: Manual Offset

```javascript
const indianTime = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
```

### Option 2: Using date-fns-tz

```bash
npm install date-fns-tz --save
```

```javascript
import { utcToZonedTime } from "date-fns-tz";
const indianTime = utcToZonedTime(new Date(), "Asia/Kolkata");
```

---
